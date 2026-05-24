// ============================================================
// CN PORTAL MARISTA — QUESTAO-RENDERER.JS
// Motor que renderiza Tipo A e Tipo C com MathJax + steps
// ============================================================

const QuestaoRenderer = {
  _syncTimer: null,
  _visibilityHandler: null,

  // Estado da sessão de revisão
  estado: {
    disciplina: null,
    questoes: [],
    respostas: {},      // questaoId → { correta, resposta, pontos }
    streakAtual: 0,
    streakMaximo: 0,
    pontosTotal: 0,
    userId: null,
    iniciado: null,
  },

  // ── INICIALIZAR ──────────────────────────────────────────
  async init(disciplina, userId) {
    this.estado.disciplina  = disciplina;
    this.estado.userId      = userId;
    this.estado.iniciado    = Date.now();

    const mapQuestoes = { bio: QUESTOES_BIO, quim: QUESTOES_QUIM, fis: QUESTOES_FIS };
    this.estado.questoes = [...(mapQuestoes[disciplina] || [])];

    const questoesBanco = await this.carregarQuestoesBanco(disciplina);
    this.estado.questoes.push(...questoesBanco);

    // Carregar respostas já dadas (para retomar) e streak persistido
    await Promise.all([
      this.carregarRespostasExistentes(),
      this.carregarStreakPersistido(),
    ]);
    this.renderizarNavbar();
    this.renderizarTodasQuestoes();
    this.atualizarProgresso();
    this.iniciarSincronizacaoBanco();

    // MathJax: renderizar após inserir no DOM
    await VisualRenderer.renderMath(document.getElementById('questoesContainer'));
  },

  // ── CARREGAR ITENS DO BANCO ──────────────────────────────
  async carregarQuestoesBanco(disciplina) {
    if (!this.estado.userId || typeof sb === 'undefined') return [];

    try {
      const campos = 'id, origem, gerada_para, disciplina, tema, subtema, tipo, nivel, interdisciplinar_com, enunciado, texto_base, alternativas, gabarito, explicacao, steps, elementos_visuais, status, created_at';
      const [diretas, interdisciplinares] = await Promise.all([
        sb
          .from('questoes_banco')
          .select(campos)
          .eq('disciplina', disciplina)
          .in('status', ['aprovada', 'editada', 'pendente'])
          .order('created_at', { ascending: true }),
        sb
          .from('questoes_banco')
          .select(campos)
          .eq('disciplina', 'inter')
          .contains('interdisciplinar_com', [disciplina])
          .in('status', ['aprovada', 'editada', 'pendente'])
          .order('created_at', { ascending: true }),
      ]);

      if (diretas.error) throw diretas.error;
      if (interdisciplinares.error) throw interdisciplinares.error;

      const porId = new Map();
      [...(diretas.data || []), ...(interdisciplinares.data || [])].forEach(q => porId.set(q.id, q));
      const data = Array.from(porId.values()).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      return (data || []).map(q => ({
        id: `banco_${q.id}`,
        banco_id: q.id,
        origem: q.origem,
        gerada_para: q.gerada_para,
        disciplina: q.disciplina,
        tema: q.tema,
        subtema: q.subtema,
        tipo: q.tipo,
        nivel: q.nivel,
        interdisciplinar_com: q.interdisciplinar_com || [],
        enunciado: q.enunciado,
        texto_base: q.texto_base,
        alternativas: q.alternativas || {},
        gabarito: q.gabarito,
        explicacao: q.explicacao || '',
        steps: q.steps || [],
        elementos_visuais: q.elementos_visuais || q.texto_base?.elementos_visuais || [],
        status: q.status,
      })).filter(q => q.enunciado && q.gabarito && (q.tipo === 'A' || q.tipo === 'C'));
    } catch (e) {
      console.warn('Erro ao carregar questões do banco:', e);
      return [];
    }
  },

  iniciarSincronizacaoBanco() {
    if (this._syncTimer) clearInterval(this._syncTimer);
    this._syncTimer = setInterval(() => this.sincronizarQuestoesBanco(), 30000);

    if (!this._visibilityHandler) {
      this._visibilityHandler = () => {
        if (document.visibilityState === 'visible') this.sincronizarQuestoesBanco();
      };
      document.addEventListener('visibilitychange', this._visibilityHandler);
    }
  },

  async sincronizarQuestoesBanco() {
    if (!this.estado.userId || !this.estado.disciplina || typeof sb === 'undefined') return;

    const questoesBanco = this.estado.questoes.filter(q => q.banco_id);
    if (questoesBanco.length === 0) return;

    try {
      const idsBanco = questoesBanco.map(q => q.banco_id);
      const { data, error } = await sb
        .from('questoes_banco')
        .select('id, status')
        .in('id', idsBanco)
        .in('status', ['aprovada', 'editada', 'pendente']);

      if (error) throw error;

      const idsVisiveis = new Set((data || []).map(q => String(q.id)));
      const idsRemovidos = questoesBanco
        .filter(q => !idsVisiveis.has(String(q.banco_id)))
        .map(q => q.id);

      if (idsRemovidos.length === 0) return;

      const removidosSet = new Set(idsRemovidos);
      this.estado.questoes = this.estado.questoes.filter(q => !removidosSet.has(q.id));
      idsRemovidos.forEach(id => delete this.estado.respostas[id]);

      const extras = document.getElementById('questoesExtras');
      if (extras) {
        const contemRemovido = Array.from(extras.querySelectorAll('.questao-card'))
          .some(card => removidosSet.has(card.dataset.id));
        if (contemRemovido) {
          extras.innerHTML = '<div class="ia-erro">Esta questão foi recusada pelo professor e removida da sua revisão.</div>';
        }
      }

      this.renderizarNavbar();
      this.renderizarTodasQuestoes();
      this.atualizarProgresso();
      await VisualRenderer.renderMath(document.getElementById('questoesContainer'));
    } catch (e) {
      console.warn('Erro ao sincronizar questões do banco:', e);
    }
  },

  // ── CARREGAR RESPOSTAS EXISTENTES ────────────────────────
  async carregarStreakPersistido() {
    if (!this.estado.userId || typeof sb === 'undefined') return;
    try {
      const { data } = await sb
        .from('pontuacao')
        .select('streak_atual, streak_maximo')
        .eq('aluno_id', this.estado.userId)
        .single();
      if (data) {
        this.estado.streakAtual  = data.streak_atual  || 0;
        this.estado.streakMaximo = data.streak_maximo || 0;
      }
    } catch(e) { console.warn('Erro ao carregar streak:', e); }
  },

  async carregarRespostasExistentes() {
    if (!this.estado.userId || typeof sb === 'undefined') return;
    try {
      const { data } = await sb
        .from('respostas')
        .select('questao_id, correta, pontos_ganhos')
        .eq('aluno_id', this.estado.userId)
        .eq('disciplina', this.estado.disciplina);

      if (data) {
        // Guard against duplicate rows: count each questao_id only once
        data.forEach(r => {
          if (this.estado.respostas[r.questao_id]) return;
          this.estado.respostas[r.questao_id] = {
            correta: r.correta,
            pontos: r.pontos_ganhos,
          };
          if (r.correta) {
            this.estado.pontosTotal += r.pontos_ganhos;
          }
        });
      }
    } catch (e) { console.warn('Erro ao carregar respostas:', e); }
  },

  // ── NAVBAR DE QUESTÕES ───────────────────────────────────
  renderizarNavbar() {
    const nav = document.getElementById('questoesNavbar');
    if (!nav) return;

    nav.innerHTML = this.estado.questoes.map((q, i) => {
      const respondida = this.estado.respostas[q.id];
      let classe = 'nav-q';
      if (respondida) classe += respondida.correta ? ' correta' : ' errada';
      return `<button class="${classe}" onclick="QuestaoRenderer.irPara(${i+1})" title="Questão ${i+1}">${i+1}</button>`;
    }).join('');
  },

  irPara(num) {
    const el = document.getElementById(`q-${num}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // ── EMBARALHAR ALTERNATIVAS (por sessão) ─────────────────
  // Cada carregamento sorteia uma ordem diferente para as alternativas
  // evitando que o estudante memorize posições em vez de raciocinar.
  // Os campos _altExibicao e _gabExibicao armazenam o mapeamento desta sessão.
  _embaralharAlts(q) {
    if (q.tipo !== 'C' || !q.alternativas) return;
    const posicoes = ['A','B','C','D','E'].filter(l => q.alternativas[l] != null);
    // Fisher-Yates
    const shuffled = [...posicoes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Display A → conteúdo de shuffled[0], etc.
    q._altExibicao = {};
    shuffled.forEach((origLetra, i) => {
      q._altExibicao[posicoes[i]] = q.alternativas[origLetra];
    });
    // Posição de exibição da resposta correta
    q._gabExibicao = posicoes[shuffled.indexOf(q.gabarito)];
  },

  // ── RENDERIZAR TODAS AS QUESTÕES ─────────────────────────
  renderizarTodasQuestoes() {
    const container = document.getElementById('questoesContainer');
    if (!container) return;

    // Embaralhar alternativas desta sessão ANTES de gerar o HTML
    this.estado.questoes.forEach(q => this._embaralharAlts(q));

    container.innerHTML = this.estado.questoes.map((q, i) =>
      q.tipo === 'C'
        ? this.htmlTipoC(q, i + 1)
        : this.htmlTipoA(q, i + 1)
    ).join('');

    // Marcar questões já respondidas
    Object.entries(this.estado.respostas).forEach(([qId, resp]) => {
      this.marcarRespondida(qId, resp.correta, resp.resposta || null);
    });
  },

  // ── HTML TIPO C (Múltipla Escolha) ───────────────────────
  htmlTipoC(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const alts = ['A','B','C','D','E'];

    const altSource = q._altExibicao || q.alternativas;
    const alternativasHtml = alts
      .filter(letra => altSource[letra] != null)
      .map(letra => `
        <button
          class="alt-btn"
          id="alt-${q.id}-${letra}"
          onclick="QuestaoRenderer.responderC('${q.id}', '${letra}')"
        >
          <span class="alt-letra">${letra}</span>
          <span class="alt-texto">${altSource[letra]}</span>
        </button>
      `).join('');

    const stepsHtml = q.steps ? this.htmlSteps(q.steps) : '';
    const elementosVisuaisHtml = this.htmlElementosVisuais(q);

    return `
      <div class="questao-card" id="q-${num}" data-id="${q.id}" data-tipo="C">
        <div class="questao-header">
          <div class="questao-meta">
            <span class="q-num">Questão ${num}</span>
            <span class="q-tipo tipo-c">Múltipla Escolha</span>
            <span class="q-nivel">${nivelEmoji[q.nivel]} ${q.nivel.charAt(0).toUpperCase()+q.nivel.slice(1)}</span>
            <span class="q-tema" id="tema-${q.id}" style="display:none">${q.tema}</span>
          </div>
          <div class="questao-pts" id="pts-${q.id}"></div>
        </div>

        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${q.enunciado}</p>

        <div class="alternativas" id="alts-${q.id}">
          ${alternativasHtml}
        </div>

        <div class="questao-feedback" id="fb-${q.id}" style="display:none">
          <div class="feedback-msg" id="fb-msg-${q.id}"></div>
          ${q.steps ? `
            <button class="btn-steps" onclick="QuestaoRenderer.toggleSteps('${q.id}')">
              📖 Ver resolução passo a passo
            </button>
          ` : ''}
          <div class="steps-container" id="steps-${q.id}" style="display:none">
            ${stepsHtml}
          </div>
          <div class="explicacao-box" id="exp-${q.id}" style="display:none">
            <p>${q.explicacao}</p>
          </div>
          <button class="btn-ia-tutor" onclick="QuestaoRenderer.chamarTutor('${q.id}')" style="display:none" id="ia-${q.id}">
            🤖 Não entendi — explicar diferente
          </button>
          <div class="ia-resposta" id="ia-resp-${q.id}" style="display:none"></div>
        </div>
      </div>
    `;
  },

  // ── HTML TIPO A (Certo/Errado) ───────────────────────────
  htmlTipoA(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const elementosVisuaisHtml = this.htmlElementosVisuais(q);

    return `
      <div class="questao-card" id="q-${num}" data-id="${q.id}" data-tipo="A">
        <div class="questao-header">
          <div class="questao-meta">
            <span class="q-num">Questão ${num}</span>
            <span class="q-tipo tipo-a">Certo / Errado</span>
            <span class="q-nivel">${nivelEmoji[q.nivel]} ${q.nivel.charAt(0).toUpperCase()+q.nivel.slice(1)}</span>
            <span class="q-tema" id="tema-${q.id}" style="display:none">${q.tema}</span>
          </div>
          <div class="questao-pts" id="pts-${q.id}"></div>
        </div>

        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${q.enunciado}</p>

        <div class="ce-btns" id="alts-${q.id}">
          <button class="ce-btn certo" onclick="QuestaoRenderer.responderA('${q.id}', 'CERTO')">
            ✅ CERTO
          </button>
          <button class="ce-btn errado" onclick="QuestaoRenderer.responderA('${q.id}', 'ERRADO')">
            ❌ ERRADO
          </button>
        </div>

        <div class="questao-feedback" id="fb-${q.id}" style="display:none">
          <div class="feedback-msg" id="fb-msg-${q.id}"></div>
          <div class="explicacao-box">
            <p id="exp-${q.id}">${q.explicacao}</p>
          </div>
          <button class="btn-ia-tutor" onclick="QuestaoRenderer.chamarTutor('${q.id}')" style="display:none" id="ia-${q.id}">
            🤖 Não entendi — explicar diferente
          </button>
          <div class="ia-resposta" id="ia-resp-${q.id}" style="display:none"></div>
        </div>
      </div>
    `;
  },

  htmlElementosVisuais(q) {
    const elementos = [
      ...(Array.isArray(q.elementos_visuais) ? q.elementos_visuais : []),
      ...(Array.isArray(q.texto_base?.elementos_visuais) ? q.texto_base.elementos_visuais : []),
    ];
    const vistos = new Set();

    return elementos
      .filter(el => {
        if (!this.elementoVisualValido(el)) return false;
        const assinatura = JSON.stringify(el);
        if (vistos.has(assinatura)) return false;
        vistos.add(assinatura);
        return true;
      })
      .map(el => VisualRenderer.renderElementoVisual(el))
      .filter(Boolean)
      .join('');
  },

  elementoVisualValido(el) {
    if (!el || !el.tipo) return false;
    if (el.tipo === 'equacao_quimica' && !String(el.equacao || '').trim()) return false;
    if (el.tipo === 'tabela' && !Array.isArray(el.linhas)) return false;
    if (el.tipo === 'grafico_xy' && !Array.isArray(el.series)) return false;
    if (el.tipo === 'circuito_serie' && !Array.isArray(el.componentes)) return false;
    if (el.tipo === 'heredograma' && !Array.isArray(el.geracoes)) return false;
    return true;
  },

  // ── HTML STEPS ───────────────────────────────────────────
  htmlSteps(steps) {
    // Gera HTML dos steps com equações em align*/equation* para renderização profissional
    return steps.map((s, i) => {
      // Limpa e prepara linhas_latex
      const latexLines = (s.linhas_latex || [])
        .map(l => {
          let clean = l.trim();
          // Remove delimitadores residuais se a IA os enviou por engano
          clean = clean.replace(/^\\\[|\\\]$/g, '').replace(/^\$\$|\$\$$/g, '').trim();
          // Se já contém um display block que não aceita ser envolvido em \[, deixamos sem.
          // Atenção: \begin{aligned} PRECISA do \[ \], mas \begin{align} e \begin{align*} NÃO!
          if (
            clean.startsWith('\\begin{align}') && !clean.startsWith('\\begin{aligned}') ||
            clean.startsWith('\\begin{equation}')
          ) {
            return `<div class="step-latex-line">${clean}</div>`;
          }
          return `<div class="step-latex-line">\\[${clean}\\]</div>`;
        })
        .join('');

      let destaque = '';
      if (s.destaque_latex) {
        let cleanDestaque = s.destaque_latex.trim();
        cleanDestaque = cleanDestaque.replace(/^\\\[|\\\]$/g, '').replace(/^\$\$|\$\$$/g, '').trim();
        destaque = `<div class="step-latex-destaque">\\[${cleanDestaque}\\]</div>`;
      }
      return `
        <div class="step-item" id="step-item-${i}">
          <div class="step-header" onclick="QuestaoRenderer.toggleStep(this)">
            <span class="step-num">${i+1}</span>
            <div class="step-info">
              <span class="step-titulo">${s.titulo || ''}</span>
              <span class="step-hint">${s.hint || ''}</span>
            </div>
            <span class="step-arrow">▶</span>
          </div>
          <div class="step-body">
            ${s.explicacao ? `<p class="step-exp">${s.explicacao}</p>` : ''}
            ${latexLines}
            ${destaque}
          </div>
        </div>
      `;
    }).join('');
  },

  // ── RESPONDER TIPO C ─────────────────────────────────────
  async responderC(qId, letraSelecionada) {
    if (this.estado.respostas[qId]) return; // já respondida

    const q = this.estado.questoes.find(q => q.id === qId);
    if (!q) return;

    // Usar gabarito da sessão (posição embaralhada) para avaliar a resposta
    const gabExibicao = q._gabExibicao || q.gabarito;
    const correta = letraSelecionada === gabExibicao;
    const pontos  = this.calcularPontos('C', correta);

    // Feedback visual nas alternativas
    const alts = ['A','B','C','D','E'];
    alts.forEach(letra => {
      const btn = document.getElementById(`alt-${qId}-${letra}`);
      if (!btn) return;
      btn.disabled = true;
      if (letra === gabExibicao) btn.classList.add('correta');
      else if (letra === letraSelecionada) btn.classList.add('errada');
    });

    this.mostrarFeedback(qId, correta, pontos, letraSelecionada);
    await this.salvarResposta(qId, 'C', correta, pontos, letraSelecionada);
    this.atualizarNavbar(qId, correta);
    this.atualizarProgresso();
  },

  // ── RESPONDER TIPO A ─────────────────────────────────────
  async responderA(qId, resposta) {
    if (this.estado.respostas[qId]) return;

    const q = this.estado.questoes.find(q => q.id === qId);
    if (!q) return;

    const correta = resposta === q.gabarito;
    const pontos  = this.calcularPontos('A', correta);

    // Feedback visual
    const btnCerto  = document.querySelector(`#alts-${qId} .ce-btn.certo`);
    const btnErrado = document.querySelector(`#alts-${qId} .ce-btn.errado`);
    if (btnCerto)  { btnCerto.disabled  = true; }
    if (btnErrado) { btnErrado.disabled = true; }

    const btnSelecionado = resposta === 'CERTO' ? btnCerto : btnErrado;
    const btnCorreto     = q.gabarito === 'CERTO' ? btnCerto : btnErrado;
    if (btnCorreto)    btnCorreto.classList.add('correta');
    if (!correta && btnSelecionado) btnSelecionado.classList.add('errada');

    this.mostrarFeedback(qId, correta, pontos, resposta);
    await this.salvarResposta(qId, 'A', correta, pontos, resposta);
    this.atualizarNavbar(qId, correta);
    this.atualizarProgresso();
  },

  // ── CALCULAR PONTOS ──────────────────────────────────────
  calcularPontos(tipo, correta) {
    if (!correta) { this.estado.streakAtual = 0; return 0; }

    const base = tipo === 'C' ? 20 : 10;
    this.estado.streakAtual++;
    if (this.estado.streakAtual > this.estado.streakMaximo) {
      this.estado.streakMaximo = this.estado.streakAtual;
    }

    let mult = 1;
    if (this.estado.streakAtual >= 10) mult = 2.0;
    else if (this.estado.streakAtual >= 5)  mult = 1.5;

    return Math.round(base * mult);
  },

  // ── MOSTRAR FEEDBACK ─────────────────────────────────────
  mostrarFeedback(qId, correta, pontos, resposta) {
    const fb    = document.getElementById(`fb-${qId}`);
    const msg   = document.getElementById(`fb-msg-${qId}`);
    const ptsEl = document.getElementById(`pts-${qId}`);
    const iaBtn = document.getElementById(`ia-${qId}`);

    if (!fb || !msg) return;
    fb.style.display = 'block';

    // Revelar o tema após responder
    const temaEl = document.getElementById(`tema-${qId}`);
    if (temaEl) temaEl.style.display = '';

    if (correta) {
      msg.className = 'feedback-msg acerto';
      msg.innerHTML = `✅ <strong>Correto!</strong> +${pontos} pontos${this.estado.streakAtual >= 5 ? ` 🔥 Streak ×${this.estado.streakAtual}` : ''}`;
      if (ptsEl) {
        ptsEl.innerHTML = `<span class="pts-badge">+${pontos}</span>`;
      }
    } else {
      msg.className = 'feedback-msg erro';
      msg.innerHTML = `❌ <strong>Incorreto.</strong> A resposta correta foi destacada acima.`;
      if (iaBtn) iaBtn.style.display = 'inline-flex';
    }

    // MathJax: re-renderizar área de feedback (opcional, pois pode não ter LaTeX)
    if (window.MathJax?.typesetPromise) {
      MathJax.typesetPromise([fb]).catch(e => console.warn('MathJax feedback:', e));
    }
  },

  // ── TOGGLE STEPS ─────────────────────────────────────────
  toggleSteps(qId) {
    const el  = document.getElementById(`steps-${qId}`);
    const btn = el?.previousElementSibling;
    if (!el) return;
    const aberto = el.style.display !== 'none';
    el.style.display = aberto ? 'none' : 'block';
    if (btn) btn.textContent = aberto ? '📖 Ver resolução passo a passo' : '📕 Fechar resolução';
    // MathJax roda APÓS o elemento estar visível
    if (!aberto) {
      requestAnimationFrame(() => {
        if (window.MathJax?.typesetPromise) {
          MathJax.typesetPromise([el])
            .then(() => {
              // Sucesso: todas as equações renderizadas
            })
            .catch(e => console.warn('MathJax steps container erro:', e));
        }
      });
    }
  },

  // ── TOGGLE DE STEP INDIVIDUAL ──────────────────────────
  toggleStep(header) {
    const item = header.closest('.step-item');
    const body = item.querySelector('.step-body');
    const arrow = header.querySelector('.step-arrow');
    const aberto = body.style.display === 'block';

    body.style.display = aberto ? 'none' : 'block';
    arrow.style.transform = aberto ? '' : 'rotate(90deg)';

    // MathJax: renderizar APÓS o elemento estar visível
    if (!aberto) {
      // Aguardar múltiplos frames para garantir que o DOM foi atualizado
      setTimeout(() => {
        if (window.MathJax?.typesetPromise) {
          console.log('Renderizando MathJax no step individual');
          MathJax.typesetPromise([body])
            .then(() => {
              console.log('✓ Step MathJax renderizado');
            })
            .catch(e => console.warn('MathJax step erro:', e));
        } else {
          console.warn('MathJax não disponível no toggleStep');
        }
      }, 50);
    }
  },

  // ── MARCAR RESPONDIDA (ao carregar) ──────────────────────
  marcarRespondida(qId, correta, resposta) {
    const fb  = document.getElementById(`fb-${qId}`);
    const msg = document.getElementById(`fb-msg-${qId}`);
    if (!fb || !msg) return;

    const q = this.estado.questoes.find(q => q.id === qId);
    if (!q) return;

    fb.style.display = 'block';

    // Revelar o tema (questão já respondida em sessão anterior)
    const temaEl = document.getElementById(`tema-${qId}`);
    if (temaEl) temaEl.style.display = '';

    if (q.tipo === 'C') {
      const gabExibicao = q._gabExibicao || q.gabarito;
      ['A','B','C','D','E'].forEach(l => {
        const btn = document.getElementById(`alt-${qId}-${l}`);
        if (btn) {
          btn.disabled = true;
          if (l === gabExibicao) btn.classList.add('correta');
          // Não destacar o erro no reload pois o shuffle mudou
        }
      });
    } else {
      const btnCerto  = document.querySelector(`#alts-${qId} .ce-btn.certo`);
      const btnErrado = document.querySelector(`#alts-${qId} .ce-btn.errado`);
      if (btnCerto)  btnCerto.disabled  = true;
      if (btnErrado) btnErrado.disabled = true;
      const btnCorreto = q.gabarito === 'CERTO' ? btnCerto : btnErrado;
      if (btnCorreto) btnCorreto.classList.add('correta');
    }

    if (correta) {
      msg.className = 'feedback-msg acerto';
      msg.innerHTML = `✅ <strong>Correto!</strong>`;
    } else {
      msg.className = 'feedback-msg erro';
      msg.innerHTML = `❌ <strong>Incorreto.</strong>`;
      const iaBtn = document.getElementById(`ia-${qId}`);
      if (iaBtn) iaBtn.style.display = 'inline-flex';
    }
  },

  // ── SALVAR RESPOSTA NO SUPABASE ──────────────────────────
  async salvarResposta(qId, tipo, correta, pontos, resposta) {
    this.estado.respostas[qId] = { correta, pontos, resposta };
    if (correta) this.estado.pontosTotal += pontos;

    if (!this.estado.userId || typeof sb === 'undefined') return;

    try {
      // 1. Salvar resposta individual — retorna vazio se já existia (ignoreDuplicates)
      const { data: novaResposta } = await sb.from('respostas').upsert({
        aluno_id:       this.estado.userId,
        questao_id:     qId,
        disciplina:     this.estado.disciplina,
        tipo,
        correta,
        pontos_ganhos:  pontos,
        streak_momento: this.estado.streakAtual,
      }, { onConflict: 'aluno_id,questao_id', ignoreDuplicates: true }).select('questao_id');

      // Questão já foi respondida antes — não recontabilizar pontos
      if (!novaResposta || novaResposta.length === 0) return;

      // 2. Atualizar progresso da disciplina
      // "concluida" usa apenas questões nativas (banco_id ausente);
      // questões de IA são bônus e não bloqueiam o simulado.
      const questoesNativas = this.estado.questoes.filter(q => !q.banco_id);
      const nativasRespondidas = questoesNativas.filter(q => !!this.estado.respostas[q.id]).length;
      const concluida   = questoesNativas.length > 0 && nativasRespondidas >= questoesNativas.length;

      const total       = this.estado.questoes.length;
      const acertos     = Object.values(this.estado.respostas).filter(r => r.correta).length;
      const respondidas = Object.keys(this.estado.respostas).length;
      const percentual  = questoesNativas.length > 0
        ? Math.round((nativasRespondidas / questoesNativas.length) * 100) : 0;

      await sb.from('progresso_revisao')
        .update({ total_questoes: respondidas, acertos, concluida, percentual, ultima_atividade: new Date().toISOString() })
        .eq('aluno_id', this.estado.userId)
        .eq('disciplina', this.estado.disciplina);

      // 3. Atualizar pontuação
      const campo = `pontos_${this.estado.disciplina}`;
      const { data: pts } = await sb
        .from('pontuacao')
        .select('pontos_total, streak_maximo')
        .eq('aluno_id', this.estado.userId)
        .single();

      const novoTotal   = (pts?.pontos_total || 0) + pontos;
      const novoStreak  = Math.max(pts?.streak_maximo || 0, this.estado.streakMaximo);

      await sb.from('pontuacao')
        .update({
          [campo]: this.estado.pontosTotal,
          pontos_total: novoTotal,
          streak_atual: this.estado.streakAtual,
          streak_maximo: novoStreak,
          questoes_respondidas: respondidas,
          questoes_corretas: acertos,
        })
        .eq('aluno_id', this.estado.userId);

      // 4. Verificar badges
      await this.verificarBadges(concluida, acertos, total);

    } catch (e) { console.warn('Erro ao salvar resposta:', e); }
  },

  // ── VERIFICAR BADGES ─────────────────────────────────────
  async verificarBadges(concluida, acertos, total) {
    const badgeMap = { bio: 'dna_ativo', quim: 'reacao_em_cadeia', fis: 'forca_total' };

    // Badge de disciplina concluída
    if (concluida) {
      await this.desbloquearBadge(badgeMap[this.estado.disciplina]);

      // Verificar se as 3 disciplinas estão concluídas
      const { data: progs } = await sb
        .from('progresso_revisao')
        .select('concluida')
        .eq('aluno_id', this.estado.userId);

      if (progs && progs.every(p => p.concluida)) {
        await this.desbloquearBadge('triforce');
      }
    }

    // Badge de 100% de acerto
    if (acertos === total && total > 0) {
      await this.desbloquearBadge('perfeccionista');
      const pctBadge = { bio: 'mestre_genetica', quim: 'expert_eletroquimica', fis: 'senhor_joule' };
      await this.desbloquearBadge(pctBadge[this.estado.disciplina]);
    }

    // Badge de streak
    if (this.estado.streakMaximo >= 10) {
      await this.desbloquearBadge('streak_fogo');
    }
  },

  async desbloquearBadge(badgeId) {
    try {
      await sb.from('badges_conquistados')
        .insert({ aluno_id: this.estado.userId, badge_id: badgeId });
    } catch (e) { /* ignora duplicata */ }
  },

  // ── ATUALIZAR NAVBAR ─────────────────────────────────────
  atualizarNavbar(qId, correta) {
    const idx = this.estado.questoes.findIndex(q => q.id === qId);
    if (idx < 0) return;
    const btn = document.querySelector(`#questoesNavbar button:nth-child(${idx + 1})`);
    if (btn) {
      btn.classList.remove('correta','errada');
      btn.classList.add(correta ? 'correta' : 'errada');
      // Centraliza o botão respondido na barra (mobile)
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  },

  // ── SCROLL DO NAVBAR (setas) ──────────────────────────────
  scrollNavbar(direction) {
    const nav = document.getElementById('questoesNavbar');
    if (!nav) return;
    const btnWidth = 36; // 32px botão + 4px gap
    const visiveis = Math.max(1, Math.floor(nav.clientWidth / btnWidth));
    nav.scrollBy({ left: direction * (btnWidth * visiveis), behavior: 'smooth' });
  },

  // ── ATUALIZAR PROGRESSO ──────────────────────────────────
  atualizarProgresso() {
    const total       = this.estado.questoes.length;
    const respondidas = Object.keys(this.estado.respostas).length;
    const acertos     = Object.values(this.estado.respostas).filter(r => r.correta).length;
    const pct         = total > 0 ? Math.round((respondidas / total) * 100) : 0;

    const elPct   = document.getElementById('progPct');
    const elFill  = document.getElementById('progFill');
    const elAcert = document.getElementById('progAcertos');
    const elPts   = document.getElementById('progPontos');

    if (elPct)   elPct.textContent   = `${respondidas}/${total} questões (${pct}%)`;
    if (elFill)  elFill.style.width  = pct + '%';
    if (elAcert) elAcert.textContent = `${acertos} acertos (${respondidas > 0 ? Math.round(acertos/respondidas*100) : 0}%)`;
    if (elPts)   elPts.textContent   = `${this.estado.pontosTotal} pts`;
  },

  // ── TUTOR IA ─────────────────────────────────────────────
  async chamarTutor(qId) {
    const q   = this.estado.questoes.find(q => q.id === qId);
    const btn = document.getElementById(`ia-${qId}`);
    const div = document.getElementById(`ia-resp-${qId}`);
    if (!q || !btn || !div) return;

    btn.disabled = true;
    btn.textContent = '⏳ Consultando tutor IA...';
    div.style.display = 'block';
    div.innerHTML = '<div class="ia-loading">🤖 Analisando seu erro...</div>';

    try {
      const resp = await sb.functions.invoke('gemini', {
        body: {
          funcao: 'tutor_erro',
          dados: {
            enunciado:           q.enunciado,
            resposta_aluno:      this.estado.respostas[qId]?.resposta || '?',
            gabarito:            q.gabarito,
            explicacao_original: q.explicacao,
            disciplina:          this.estado.disciplina,
          }
        }
      });

      if (resp.error) {
        throw resp.error;
      }
      if (resp.data?.error) {
        throw new Error(resp.data.detalhe || resp.data.error);
      }

      const explicacao = resp.data?.explicacao;
      if (!explicacao) {
        throw new Error('Edge Function não retornou o campo explicacao.');
      }

      div.innerHTML = `
        <div class="ia-card">
          <div class="ia-header">🤖 Tutor IA</div>
          <div class="ia-texto">${explicacao.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
        </div>
      `;
      if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([div]).catch(e => console.warn('MathJax Tutor IA:', e));
      }
    } catch (e) {
      console.error('Erro Tutor IA:', e);
      div.innerHTML = '<div class="ia-erro">❌ Tutor indisponível no momento. Consulte a explicação acima.</div>';
    }

    btn.disabled = false;
    btn.textContent = '🤖 Pedir nova explicação';
  },

  // ── GERAR QUESTÃO EXTRA (IA) ─────────────────────────────
  async gerarQuestaoExtra(disciplina, tema, tipo, nivel) {
    const container = document.getElementById('questoesExtras');
    if (!container) return;

    container.innerHTML = '<div class="loading-ia">🤖 Gerando questão com IA...</div>';

    try {
      const resp = await sb.functions.invoke('gemini', {
        body: {
          funcao: 'gerar_questao',
          dados: { disciplina, tema, tipo, nivel, disciplinas_integradas: [] }
        }
      });

      if (resp.error) {
        throw resp.error;
      }
      if (resp.data?.error) {
        throw new Error(resp.data.detalhe || resp.data.error);
      }

      const q = resp.data?.questao;
      if (!q) throw new Error('Sem questão');
      q.elementos_visuais = q.elementos_visuais || q.texto_base?.elementos_visuais || [];

      const questaoBanco = {
        origem: 'ia_gerada',
        gerada_para: this.estado.userId,
        disciplina,
        tema: q.tema || tema,
        subtema: q.subtema || null,
        tipo: q.tipo || tipo,
        nivel: q.nivel || nivel,
        interdisciplinar_com: q.interdisciplinar_com || [],
        enunciado: q.enunciado,
        texto_base: q.texto_base || null,
        alternativas: q.alternativas || null,
        gabarito: q.gabarito,
        explicacao: q.explicacao || '',
        steps: q.steps || null,
        elementos_visuais: q.elementos_visuais || q.texto_base?.elementos_visuais || null,
        status: 'pendente',
      };

      const { data: salvo, error: bancoError } = await sb
        .from('questoes_banco')
        .insert(questaoBanco)
        .select('id, status')
        .single();

      if (bancoError) {
        console.warn('Questão IA gerada, mas não salva no banco de revisão:', bancoError);
      }

      // Adicionar à lista da sessão com ID persistente quando o banco confirmar.
      q.id = salvo?.id ? `banco_${salvo.id}` : `ia_${Date.now()}`;
      q.status = salvo?.status || 'pendente';
      this.estado.questoes.push(q);

      const num = this.estado.questoes.length;
      const html = q.tipo === 'C'
        ? this.htmlTipoC(q, num)
        : this.htmlTipoA(q, num);

      container.innerHTML = html;

      // Renderizar MathJax na questão gerada
      await VisualRenderer.renderMath(container);
      this.renderizarNavbar();

    } catch(e) {
      console.error('Erro ao gerar questão IA:', e);
      container.innerHTML = '<div class="ia-erro">❌ Não foi possível gerar a questão. Tente novamente.</div>';
    }
  },

};
