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
    // Retroativo: concede badges que possam ter sido perdidos por bugs anteriores
    await this.verificarBadgesRetroativo();
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

    // ── Cache local: 10 min TTL — reduz queries simultâneas no Free tier ──
    const CACHE_TTL = 10 * 60 * 1000;
    const cacheKey  = `qbanco_${disciplina}_${this.estado.userId}`;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const { ts, data } = JSON.parse(raw);
        if (Date.now() - ts < CACHE_TTL) return data; // cache fresco — sem query
      }
    } catch (_) {}

    try {
      const campos = 'id, origem, gerada_para, disciplina, tema, subtema, tipo, nivel, interdisciplinar_com, enunciado, texto_base, alternativas, gabarito, explicacao, steps, elementos_visuais, status, created_at, avaliacao_aluno';
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

      const resultado = (data || []).map(q => ({
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
        avaliacao_aluno: q.avaliacao_aluno || null,
      })).filter(q => q.enunciado && q.gabarito && (q.tipo === 'A' || q.tipo === 'C'));

      // Salvar no cache para próximas visitas nos próximos 10 min
      try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: resultado })); } catch (_) {}

      return resultado;
    } catch (e) {
      // Supabase offline? Usar cache expirado como fallback (degradação graciosa)
      try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          console.warn('⚠️ Supabase offline — usando cache local de questões');
          return JSON.parse(raw).data || [];
        }
      } catch (_) {}
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
      this._htmlPorTipo(q, i + 1)
    ).join('');

    // Marcar questões já respondidas
    Object.entries(this.estado.respostas).forEach(([qId, resp]) => {
      this.marcarRespondida(qId, resp.correta, resp.resposta || null);
    });
  },

  // ── AVALIAÇÃO DE QUESTÃO DO BANCO ────────────────────────
  _htmlAvaliacaoQuestao(q) {
    if (!q.banco_id || q.gerada_para !== this.estado.userId) return '';
    if (q.avaliacao_aluno) {
      const labels = { joinha: '👍 Boa e calibrada', alerta: '⚠️ Confusa mas resolúvel', errado: '❌ Mal formulada' };
      return `<div class="av-questao"><span class="av-feita ${q.avaliacao_aluno}">${labels[q.avaliacao_aluno]}</span></div>`;
    }
    return `
      <div class="av-questao" id="av-${q.id}">
        <span class="av-label">Como você avalia esta questão?</span>
        <div class="av-btns">
          <button class="av-btn joinha" onclick="QuestaoRenderer.avaliarQuestao('${q.id}','joinha')">👍 Boa</button>
          <button class="av-btn alerta" onclick="QuestaoRenderer.avaliarQuestao('${q.id}','alerta')">⚠️ Confusa</button>
          <button class="av-btn errado" onclick="QuestaoRenderer.avaliarQuestao('${q.id}','errado')">❌ Incorreta</button>
        </div>
      </div>`;
  },

  async avaliarQuestao(qId, avaliacao) {
    const q = this.estado.questoes.find(q => q.id === qId);
    if (!q || !q.banco_id) return;
    q.avaliacao_aluno = avaliacao;
    const avDiv = document.getElementById(`av-${qId}`);
    if (avDiv) {
      const labels = { joinha: '👍 Boa e calibrada', alerta: '⚠️ Confusa mas resolúvel', errado: '❌ Mal formulada' };
      avDiv.innerHTML = `<span class="av-feita ${avaliacao}">${labels[avaliacao]}</span>`;
    }
    try {
      await sb.from('questoes_banco')
        .update({ avaliacao_aluno: avaliacao })
        .eq('id', q.banco_id);
    } catch (e) { console.warn('Erro ao salvar avaliação:', e); }
  },

  // ── NORMALIZAÇÃO LaTeX ────────────────────────────────────
  // Corrige LaTeX sem delimitadores e artefatos comuns (\ frac → \frac etc.)
  _fmtTxt(txt) {
    if (!txt) return '';
    let s = String(txt);
    // Corrige "\ frac" e similares (backslash + espaço + letras) → "\frac"
    s = s.replace(/\\ ([a-zA-Z])/g, '\\$1');
    // Corrige letras circuladas do ENEM dentro de comandos LaTeX (\Ⓐrac → \frac)
    s = s.replace(/\\Ⓐrac/g, '\\frac');
    s = s.replace(/\\([Ⓐ-Ⓩⓐ-ⓩ])([a-z]*)/g, (_, _c, r) => r ? '\\' + r : '');
    // Sem nenhum comando LaTeX → retornar como está
    if (!/\\[a-zA-Z]{2,}/.test(s)) return s;
    // Sem nenhum delimitador → envolver tudo como bloco inline $...$
    if (!/[$]|\\[\(\[]/.test(s)) return '$' + s.trim() + '$';
    // Conteúdo misto: separar seções já delimitadas e envolver LaTeX solto
    const mathRx = /(\$\$[\s\S]*?\$\$|\$[^\n$]*?\$|\\\((?:[^\\]|\\.)*?\\\)|\\\[(?:[^\\]|\\.)*?\\\])/g;
    const partes = []; let ult = 0, mc;
    while ((mc = mathRx.exec(s)) !== null) {
      if (mc.index > ult) partes.push([false, s.slice(ult, mc.index)]);
      partes.push([true, mc[0]]);
      ult = mc.index + mc[0].length;
    }
    if (ult < s.length) partes.push([false, s.slice(ult)]);
    return partes.map(([eMath, parte]) => {
      if (eMath) return parte;
      return parte
        .replace(/(\\[a-zA-Z]{2,}(?:\{(?:[^{}]|\{[^{}]*\})*\}|[_^]\w+|\s)*)+/g,
          m => '$' + m.trim() + '$')
        .replace(/\\ /g, ' ');
    }).join('');
  },

  // ── TEXTO-BASE ────────────────────────────────────────────
  htmlTextoBase(q) {
    const tb = q.texto_base;
    if (!tb) return '';
    // Suporte a objeto com titulo + paragrafos
    const titulo  = tb.titulo  || tb.title  || '';
    const paras   = Array.isArray(tb.paragrafos) ? tb.paragrafos
                  : tb.texto   ? [tb.texto]
                  : tb.text    ? [tb.text]
                  : typeof tb === 'string' ? [tb] : [];
    if (!titulo && paras.length === 0) return '';
    return `
      <div class="questao-texto-base">
        ${titulo ? `<div class="texto-base-titulo">${titulo}</div>` : ''}
        ${paras.map(p => `<p class="texto-base-para">${this._fmtTxt(String(p))}</p>`).join('')}
      </div>`;
  },

  htmlComando(q) {
    if (!q.comando) return '';
    return `<p class="questao-comando">${this._fmtTxt(q.comando)}</p>`;
  },

  // ── DISPATCH POR TIPO ────────────────────────────────────
  _htmlPorTipo(q, num) {
    switch (q.tipo) {
      case 'B': return this.htmlTipoB(q, num);
      case 'C': return this.htmlTipoC(q, num);
      case 'D': return this.htmlTipoD(q, num);
      default:  return this.htmlTipoA(q, num);
    }
  },

  // ── HTML TIPO C (Múltipla Escolha) ───────────────────────
  htmlTipoC(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const alts = ['A','B','C','D','E'];

    const altSource = q._altExibicao || q.alternativas;
    // PAS: 4 alternatives (no E); ENEM: 5 alternatives
    const nAlts = Object.keys(altSource || {}).filter(k => altSource[k] != null).length;
    const tipoLabel = nAlts <= 4 ? 'Múltipla Escolha (PAS — 4 opções)' : 'Múltipla Escolha';
    const alternativasHtml = alts
      .filter(letra => altSource[letra] != null)
      .map(letra => `
        <button
          class="alt-btn"
          id="alt-${q.id}-${letra}"
          onclick="QuestaoRenderer.responderC('${q.id}', '${letra}')"
        >
          <span class="alt-letra">${letra}</span>
          <span class="alt-texto">${this._fmtTxt(altSource[letra])}</span>
        </button>
      `).join('');

    const stepsHtml = q.steps ? this.htmlSteps(q.steps) : '';
    const textoBaseHtml     = this.htmlTextoBase(q);
    const elementosVisuaisHtml = this.htmlElementosVisuais(q);

    return `
      <div class="questao-card" id="q-${num}" data-id="${q.id}" data-tipo="C">
        <div class="questao-header">
          <div class="questao-meta">
            <span class="q-num">Questão ${num}</span>
            <span class="q-tipo tipo-c">${tipoLabel}</span>
            <span class="q-nivel">${nivelEmoji[q.nivel]} ${q.nivel.charAt(0).toUpperCase()+q.nivel.slice(1)}</span>
            <span class="q-tema" id="tema-${q.id}" style="display:none">${q.tema}</span>
          </div>
          <div class="questao-pts" id="pts-${q.id}"></div>
        </div>

        ${textoBaseHtml}
        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${this._fmtTxt(q.enunciado)}</p>
        ${this.htmlComando(q)}

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
            <p>${this._fmtTxt(q.explicacao)}</p>
          </div>
          <button class="btn-ia-tutor" onclick="QuestaoRenderer.chamarTutor('${q.id}')" style="display:none" id="ia-${q.id}">
            🤖 Não entendi — explicar diferente
          </button>
          <div class="ia-resposta" id="ia-resp-${q.id}" style="display:none"></div>
          ${this._htmlAvaliacaoQuestao(q)}
        </div>
      </div>
    `;
  },

  // ── HTML TIPO A (Certo/Errado) ───────────────────────────
  htmlTipoA(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const textoBaseHtml      = this.htmlTextoBase(q);
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

        ${textoBaseHtml}
        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${this._fmtTxt(q.enunciado)}</p>
        ${this.htmlComando(q)}

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
            <p id="exp-${q.id}">${this._fmtTxt(q.explicacao)}</p>
          </div>
          <button class="btn-ia-tutor" onclick="QuestaoRenderer.chamarTutor('${q.id}')" style="display:none" id="ia-${q.id}">
            🤖 Não entendi — explicar diferente
          </button>
          <div class="ia-resposta" id="ia-resp-${q.id}" style="display:none"></div>
          ${this._htmlAvaliacaoQuestao(q)}
        </div>
      </div>
    `;
  },

  // ── HTML TIPO B (Cálculo · Múltipla Escolha) ─────────────
  htmlTipoB(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const stepsHtml = q.steps ? this.htmlSteps(q.steps) : '';
    const textoBaseHtml        = this.htmlTextoBase(q);
    const elementosVisuaisHtml = this.htmlElementosVisuais(q);

    return `
      <div class="questao-card" id="q-${num}" data-id="${q.id}" data-tipo="B">
        <div class="questao-header">
          <div class="questao-meta">
            <span class="q-num">Questão ${num}</span>
            <span class="q-tipo tipo-b">Cálculo · CDU</span>
            <span class="q-nivel">${nivelEmoji[q.nivel]} ${q.nivel.charAt(0).toUpperCase()+q.nivel.slice(1)}</span>
            <span class="q-tema" id="tema-${q.id}" style="display:none">${q.tema}</span>
          </div>
          <div class="questao-pts" id="pts-${q.id}"></div>
        </div>

        ${textoBaseHtml}
        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${this._fmtTxt(q.enunciado)}</p>
        ${this.htmlComando(q)}

        <div class="cdu-container" id="alts-${q.id}">
          <div class="cdu-hint">Escreva o resultado nos quadros abaixo (Centena · Dezena · Unidade)</div>
          <div class="cdu-boxes">
            <div class="cdu-box-wrap">
              <input class="cdu-input" id="cdu-c-${q.id}" type="text" inputmode="numeric"
                maxlength="1" placeholder="0"
                onkeydown="QuestaoRenderer._cduKey(event,'${q.id}','c')"
                oninput="QuestaoRenderer._cduInput(event,'${q.id}','c')">
              <span class="cdu-label">C</span>
            </div>
            <div class="cdu-box-wrap">
              <input class="cdu-input" id="cdu-d-${q.id}" type="text" inputmode="numeric"
                maxlength="1" placeholder="0"
                onkeydown="QuestaoRenderer._cduKey(event,'${q.id}','d')"
                oninput="QuestaoRenderer._cduInput(event,'${q.id}','d')">
              <span class="cdu-label">D</span>
            </div>
            <div class="cdu-box-wrap">
              <input class="cdu-input" id="cdu-u-${q.id}" type="text" inputmode="numeric"
                maxlength="1" placeholder="0"
                onkeydown="QuestaoRenderer._cduKey(event,'${q.id}','u')"
                oninput="QuestaoRenderer._cduInput(event,'${q.id}','u')">
              <span class="cdu-label">U</span>
            </div>
          </div>
          <button class="btn-cdu-confirmar" id="btn-cdu-${q.id}" onclick="QuestaoRenderer.responderB('${q.id}')">
            Confirmar resposta
          </button>
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
            <p>${this._fmtTxt(q.explicacao)}</p>
          </div>
          <button class="btn-ia-tutor" onclick="QuestaoRenderer.chamarTutor('${q.id}')" style="display:none" id="ia-${q.id}">
            🤖 Não entendi — explicar diferente
          </button>
          <div class="ia-resposta" id="ia-resp-${q.id}" style="display:none"></div>
          ${this._htmlAvaliacaoQuestao(q)}
        </div>
      </div>
    `;
  },

  // ── HTML TIPO D (Dissertativa) ───────────────────────────
  htmlTipoD(q, num) {
    const nivelEmoji = { basico: '🟢', intermediario: '🟡', avancado: '🔴' };
    const textoBaseHtml        = this.htmlTextoBase(q);
    const elementosVisuaisHtml = this.htmlElementosVisuais(q);

    return `
      <div class="questao-card" id="q-${num}" data-id="${q.id}" data-tipo="D">
        <div class="questao-header">
          <div class="questao-meta">
            <span class="q-num">Questão ${num}</span>
            <span class="q-tipo tipo-d">Dissertativa</span>
            <span class="q-nivel">${nivelEmoji[q.nivel]} ${q.nivel.charAt(0).toUpperCase()+q.nivel.slice(1)}</span>
            <span class="q-tema" id="tema-${q.id}" style="display:none">${q.tema}</span>
          </div>
          <div class="questao-pts" id="pts-${q.id}"></div>
        </div>

        ${textoBaseHtml}
        ${elementosVisuaisHtml}
        <p class="questao-enunciado">${this._fmtTxt(q.enunciado)}</p>
        ${this.htmlComando(q)}

        <textarea
          class="tipo-d-resposta"
          id="resp-${q.id}"
          placeholder="Escreva sua resposta aqui. Esta questão é estritamente teórica — use seus próprios argumentos e conceitos."
        ></textarea>

        <button class="btn-corrigir" id="btn-corrigir-${q.id}" onclick="QuestaoRenderer.corrigirTipoD('${q.id}')">
          ✏️ Enviar para correção pela IA
        </button>

        <div class="tipo-d-feedback" id="fb-${q.id}" style="display:none">
          <div class="ia-resposta" id="ia-resp-${q.id}"></div>
        </div>
        ${this._htmlAvaliacaoQuestao(q)}
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

      // ── Pré-processo: reagrupa linhas_latex que formam um único bloco aligned ──
      // A IA às vezes fragmenta \begin{aligned} ... \end{aligned} em entradas separadas.
      // Se renderizadas individualmente em \[...\], geram "Missing \end{aligned}" e "Misplaced &".
      const rawLines = (s.linhas_latex || []).map(l =>
        l.trim().replace(/^\\\[|\\\]$/g, '').replace(/^\$\$|\$\$$/g, '').trim()
      ).filter(Boolean);

      const blocosConsolidados = [];
      let buffer = [];
      let dentroAligned = false;

      for (const linha of rawLines) {
        if (!dentroAligned && linha.includes('\\begin{aligned}')) {
          // Verifica se a mesma entrada também fecha o bloco
          if (linha.includes('\\end{aligned}')) {
            blocosConsolidados.push(linha); // bloco completo numa linha só
          } else {
            dentroAligned = true;
            buffer = [linha];
          }
        } else if (dentroAligned) {
          buffer.push(linha);
          if (linha.includes('\\end{aligned}')) {
            dentroAligned = false;
            blocosConsolidados.push(buffer.join('\n'));
            buffer = [];
          }
        } else if (!dentroAligned && linha.includes('&')) {
          // Linha solta com & (alinhamento): envolve em aligned automaticamente
          blocosConsolidados.push(`\\begin{aligned}\n${linha}\n\\end{aligned}`);
        } else {
          blocosConsolidados.push(linha);
        }
      }
      // Flush: bloco aligned incompleto (IA esqueceu \end{aligned})
      if (buffer.length > 0) {
        buffer.push('\\end{aligned}');
        blocosConsolidados.push(buffer.join('\n'));
      }

      // ── Renderiza cada bloco consolidado ──
      const latexLines = blocosConsolidados.map(clean => {
          // \begin{align} e \begin{equation} NÃO devem ser envolvidos em \[...\]
          if (
            (clean.startsWith('\\begin{align}') && !clean.startsWith('\\begin{aligned}')) ||
            clean.startsWith('\\begin{align*}') ||
            clean.startsWith('\\begin{equation}')
          ) {
            return `<div class="step-latex-line">${clean}</div>`;
          }
          // Tudo o mais (incluindo \begin{aligned}) entra em \[...\]
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
  // ── AUXILIARES CDU ──────────────────────────────────────────
  _cduInput(ev, qId, casa) {
    // Aceitar só dígito 0-9; avançar automaticamente para próxima casa
    const val = ev.target.value.replace(/\D/g, '').slice(-1);
    ev.target.value = val;
    if (val) {
      const ordem = { c: 'd', d: 'u', u: null };
      const prox  = ordem[casa];
      if (prox) document.getElementById(`cdu-${prox}-${qId}`)?.focus();
    }
  },

  _cduKey(ev, qId, casa) {
    // Backspace em campo vazio → volta para casa anterior
    if (ev.key === 'Backspace' && !ev.target.value) {
      const ordem = { c: null, d: 'c', u: 'd' };
      const ant   = ordem[casa];
      if (ant) document.getElementById(`cdu-${ant}-${qId}`)?.focus();
    }
    // Enter confirma
    if (ev.key === 'Enter') this.responderB(qId);
  },

  // ── RESPONDER TIPO B (CDU) ────────────────────────────────
  async responderB(qId) {
    if (this.estado.respostas[qId]) return;

    const q = this.estado.questoes.find(q => q.id === qId);
    if (!q) return;

    const c = parseInt(document.getElementById(`cdu-c-${qId}`)?.value || '0') || 0;
    const d = parseInt(document.getElementById(`cdu-d-${qId}`)?.value || '0') || 0;
    const u = parseInt(document.getElementById(`cdu-u-${qId}`)?.value || '0') || 0;
    const resposta = c * 100 + d * 10 + u; // valor numérico do aluno

    // Gabarito: aceita string "042", "42", ou número
    const gabNum = parseInt(String(q.gabarito).replace(/\D/g, ''), 10);
    const correta = resposta === gabNum;
    const pontos  = this.calcularPontos('C', correta); // mesma pontuação do tipo C

    // Desabilitar inputs e botão
    ['c','d','u'].forEach(casa => {
      const el = document.getElementById(`cdu-${casa}-${qId}`);
      if (el) el.disabled = true;
    });
    const btn = document.getElementById(`btn-cdu-${qId}`);
    if (btn) btn.disabled = true;

    // Mostrar gabarito correto abaixo das caixas
    const container = document.getElementById(`alts-${qId}`);
    if (container) {
      const gabStr = String(gabNum).padStart(3, '0');
      const cor    = correta ? 'var(--green)' : 'var(--red,#e53935)';
      const info   = document.createElement('div');
      info.className = 'cdu-gabarito-info';
      info.innerHTML = correta
        ? `<span style="color:var(--green)">✅ Resposta correta: ${gabStr}</span>`
        : `<span style="color:var(--red,#e53935)">❌ Gabarito: <strong>${gabStr}</strong> — você digitou: ${String(resposta).padStart(3,'0')}</span>`;
      container.appendChild(info);
    }

    this.mostrarFeedback(qId, correta, pontos, String(resposta));
    await this.salvarResposta(qId, 'B', correta, pontos, String(resposta));
    this.atualizarNavbar(qId, correta);
    this.atualizarProgresso();
  },

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
        }
      });
    } else if (q.tipo === 'B') {
      // Desabilitar inputs CDU e mostrar gabarito
      ['c','d','u'].forEach(casa => {
        const el = document.getElementById(`cdu-${casa}-${qId}`);
        if (el) el.disabled = true;
      });
      const btnCDU = document.getElementById(`btn-cdu-${qId}`);
      if (btnCDU) btnCDU.disabled = true;
      const container = document.getElementById(`alts-${qId}`);
      if (container && !container.querySelector('.cdu-gabarito-info')) {
        const gabNum = parseInt(String(q.gabarito).replace(/\D/g, ''), 10);
        const info   = document.createElement('div');
        info.className = 'cdu-gabarito-info';
        info.innerHTML = `<span>Gabarito: <strong>${String(gabNum).padStart(3,'0')}</strong></span>`;
        container.appendChild(info);
      }
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
      const [{ data: pts }, { data: allProgs }] = await Promise.all([
        sb.from('pontuacao')
          .select('pontos_total, streak_maximo')
          .eq('aluno_id', this.estado.userId)
          .single(),
        // Buscar TODAS as disciplinas para calcular totais reais (evita sobrescrever com dados só da disciplina atual)
        sb.from('progresso_revisao')
          .select('total_questoes, acertos')
          .eq('aluno_id', this.estado.userId),
      ]);

      const novoTotal      = (pts?.pontos_total || 0) + pontos;
      const novoStreak     = Math.max(pts?.streak_maximo || 0, this.estado.streakMaximo);
      const totalRespondidas = (allProgs || []).reduce((s, p) => s + (p.total_questoes || 0), 0);
      const totalAcertos     = (allProgs || []).reduce((s, p) => s + (p.acertos       || 0), 0);

      await sb.from('pontuacao')
        .update({
          [campo]: this.estado.pontosTotal,
          pontos_total: novoTotal,
          streak_atual: this.estado.streakAtual,
          streak_maximo: novoStreak,
          questoes_respondidas: totalRespondidas,
          questoes_corretas: totalAcertos,
        })
        .eq('aluno_id', this.estado.userId);

      // 4. Verificar badges
      await this.verificarBadges(concluida, acertos, total);

    } catch (e) { console.warn('Erro ao salvar resposta:', e); }
  },

  // ── VERIFICAR BADGES ─────────────────────────────────────
  async verificarBadges(concluida, acertos, total) {
    const badgeMap = { bio: 'dna_ativo', quim: 'reacao_em_cadeia', fis: 'forca_total' };

    if (concluida) {
      await this.desbloquearBadge(badgeMap[this.estado.disciplina]);

      const { data: progs } = await sb
        .from('progresso_revisao')
        .select('concluida')
        .eq('aluno_id', this.estado.userId);

      // Triforce: exige exatamente 3 linhas, todas concluídas
      if (progs && progs.length >= 3 && progs.every(p => p.concluida)) {
        await this.desbloquearBadge('triforce');
      }

      // 100% apenas em questões nativas (questões de IA/banco não contam)
      const questoesNativas = this.estado.questoes.filter(q => !q.banco_id);
      const acertosNativas  = questoesNativas.filter(q => this.estado.respostas[q.id]?.correta).length;
      if (questoesNativas.length > 0 && acertosNativas === questoesNativas.length) {
        await this.desbloquearBadge('perfeccionista');
        const pctBadge = { bio: 'mestre_genetica', quim: 'expert_eletroquimica', fis: 'senhor_joule' };
        await this.desbloquearBadge(pctBadge[this.estado.disciplina]);
      }
    }

    if (this.estado.streakMaximo >= 10) {
      await this.desbloquearBadge('streak_fogo');
    }
  },

  // ── VERIFICAR BADGES RETROATIVOS (roda no init) ──────────
  async verificarBadgesRetroativo() {
    if (!this.estado.userId || typeof sb === 'undefined') return;
    try {
      const questoesNativas = this.estado.questoes.filter(q => !q.banco_id);
      const concluida = questoesNativas.length > 0 &&
        questoesNativas.every(q => !!this.estado.respostas[q.id]);

      if (concluida) {
        const badgeMap = { bio: 'dna_ativo', quim: 'reacao_em_cadeia', fis: 'forca_total' };
        await this.desbloquearBadge(badgeMap[this.estado.disciplina]);

        const acertosNativas = questoesNativas.filter(q => this.estado.respostas[q.id]?.correta).length;
        if (acertosNativas === questoesNativas.length) {
          await this.desbloquearBadge('perfeccionista');
          const pctBadge = { bio: 'mestre_genetica', quim: 'expert_eletroquimica', fis: 'senhor_joule' };
          await this.desbloquearBadge(pctBadge[this.estado.disciplina]);
        }

        const { data: progs } = await sb
          .from('progresso_revisao')
          .select('concluida')
          .eq('aluno_id', this.estado.userId);
        if (progs && progs.length >= 3 && progs.every(p => p.concluida)) {
          await this.desbloquearBadge('triforce');
        }
      }

      if (this.estado.streakMaximo >= 10) {
        await this.desbloquearBadge('streak_fogo');
      }
    } catch (e) { console.warn('Erro ao verificar badges retroativos:', e); }
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

    // Nível atual: 1 (primária), 2 (secundária), 3 (terciária)
    const nivel = parseInt(btn.dataset.tutorNivel || '1');

    btn.disabled = true;
    btn.textContent = '⏳ Consultando tutor IA...';
    div.style.display = 'block';
    div.innerHTML = '<div class="ia-loading">🤖 Analisando...</div>';

    try {
      // 1. Tentar buscar explicação já salva no banco
      let texto = await this._buscarExplicacaoTutor(qId, nivel);

      // 2. Não existe ainda — gerar pela IA e salvar
      if (!texto) {
        const respostaLetra = this.estado.respostas[qId]?.resposta || '?';
        const respostaTexto = q.alternativas?.[respostaLetra] || null;

        const resp = await sb.functions.invoke('gemini', {
          body: {
            funcao: 'tutor_erro',
            dados: {
              enunciado:            q.enunciado,
              comando:              q.comando || null,
              texto_base:           q.texto_base || null,
              tema:                 q.tema || null,
              subtema:              q.subtema || null,
              tipo:                 q.tipo || 'C',
              resposta_aluno:       respostaLetra,
              resposta_aluno_texto: respostaTexto,
              gabarito:             q.gabarito,
              explicacao_original:  q.explicacao,
              steps_original:       q.steps || null,
              disciplina:           this.estado.disciplina,
              alternativas:         q.alternativas || null,
              nivel,
            },
          },
        });

        if (resp.error || resp.data?.error) {
          throw new Error(resp.data?.detalhe || resp.error?.message || 'Erro na geração');
        }
        texto = resp.data?.explicacao;
        if (!texto) throw new Error('IA não retornou explicação');

        // Salvar para compartilhar com outros alunos
        await this._salvarExplicacaoTutor(qId, nivel, texto);
      }

      // 3. Renderizar — transformação mínima para não quebrar MathJax
      // REGRA: nunca dividir texto por \n antes do MathJax rodar.
      // \[...\] e \(...\) precisam estar em nós de texto contínuos.
      // Só fazemos: **Título sozinho na linha** → <h4>, **negrito** → <strong>.
      const formatarTutorTexto = (raw) => {
        return raw
          // **Título em linha própria** → <h4> (preserva o restante da linha intacto)
          .replace(/^\*\*(.+?)\*\*\s*$/gm, '<h4 class="ia-secao">$1</h4>')
          // **negrito** inline
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // INTENCIONALMENTE sem split por \n nem replace \n→<br>:
        // isso quebraria \[ ... \] multilinha antes do MathJax processar.
        // CSS white-space: pre-line no .ia-texto cuida das quebras de linha.
      };

      const nivelLabels = { 1: 'Tutor IA', 2: 'Tutor IA · Segundo ângulo', 3: 'Tutor IA · Fundamento base' };
      div.innerHTML = `
        <div class="ia-card">
          <div class="ia-header">🤖 ${nivelLabels[nivel] || 'Tutor IA'}</div>
          <div class="ia-texto">${formatarTutorTexto(texto)}</div>
        </div>`;
      if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([div]).catch(e => console.warn('MathJax Tutor IA:', e));
      }

      // 4. Atualizar botão para o próximo nível
      const proximo = nivel + 1;
      if (proximo <= 3) {
        btn.dataset.tutorNivel = String(proximo);
        btn.disabled = false;
        btn.textContent = proximo === 2
          ? '🔄 Explicar diferente'
          : '🔄 Ainda não, pode tentar outra vez?';
      } else {
        btn.style.display = 'none'; // esgotou as 3 explicações
      }

    } catch (e) {
      console.error('Erro Tutor IA:', e);
      div.innerHTML = '<div class="ia-erro">❌ Tutor indisponível no momento. Consulte a explicação acima.</div>';
      btn.disabled = false;
      // Restaurar label correto conforme nível
      const labels = { 1: '🤖 Não entendi — explicar diferente', 2: '🔄 Explicar diferente', 3: '🔄 Ainda não, pode tentar outra vez?' };
      btn.textContent = labels[nivel] || labels[1];
    }
  },

  // Busca explicação salva para uma questão+nível
  async _buscarExplicacaoTutor(qId, nivel) {
    if (!this.estado.userId || typeof sb === 'undefined') return null;
    try {
      const { data } = await sb
        .from('explicacoes_tutor')
        .select('texto')
        .eq('questao_id', qId)
        .eq('nivel', nivel)
        .maybeSingle();
      return data?.texto || null;
    } catch { return null; }
  },

  // Salva explicação gerada (ignora conflito — outro aluno pode ter salvo ao mesmo tempo)
  async _salvarExplicacaoTutor(qId, nivel, texto) {
    if (!this.estado.userId || typeof sb === 'undefined') return;
    try {
      await sb.from('explicacoes_tutor')
        .insert({ questao_id: qId, nivel, texto });
    } catch (e) {
      // Conflito de unicidade é esperado em acesso simultâneo — silencioso
      if (!String(e).includes('duplicate') && !String(e?.message).includes('duplicate')) {
        console.warn('Erro ao salvar explicação tutor:', e);
      }
    }
  },

  // ── GERAR QUESTÃO EXTRA (IA) ─────────────────────────────
  async gerarQuestaoExtra(disciplina, tema, tipo, nivel, opcoes = {}) {
    const container = document.getElementById('questoesExtras');
    if (!container) return;

    container.innerHTML = '<div class="loading-ia">🤖 Gerando questão com IA...</div>';

    try {
      const subtipo    = opcoes.subtipo    || null;
      const cenario    = opcoes.cenario    || 'Automatico';
      const temaSec    = opcoes.tema_secundario    || null;
      const discInter  = opcoes.disciplinas_integradas || [];

      const resp = await sb.functions.invoke('gemini', {
        body: {
          funcao: 'gerar_questao',
          dados: { disciplina, tema, tipo, subtipo, nivel, cenario,
                   tema_secundario: temaSec, disciplinas_integradas: discInter }
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
        comando: q.comando || null,
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
      const html = this._htmlPorTipo(q, num);

      container.innerHTML = html;

      // Renderizar MathJax na questão gerada
      await VisualRenderer.renderMath(container);
      this.renderizarNavbar();

    } catch(e) {
      console.error('Erro ao gerar questão IA:', e);
      container.innerHTML = '<div class="ia-erro">❌ Não foi possível gerar a questão. Tente novamente.</div>';
    }
  },

  async gerarQuestoesPAS(disciplina, tema, tipos, nivel) {
    const container = document.getElementById('questoesExtras');
    if (!container) return;

    const nItens = tipos.length;
    container.innerHTML = `<div class="loading-ia">🤖 Gerando conjunto PAS (${nItens} itens) com IA...</div>`;

    try {
      const resp = await sb.functions.invoke('gemini', {
        body: {
          funcao: 'gerar_questoes_pas',
          dados: { disciplina, tema, tipos, nivel, n_itens: nItens },
        },
      });

      if (resp.error || resp.data?.error) {
        const detalhe = resp.data?.detalhe || resp.data?.error || resp.error?.message || 'Erro desconhecido';
        throw new Error(detalhe);
      }
      const resultado = resp.data?.resultado;
      if (!resultado?.itens?.length) throw new Error('IA não retornou itens PAS válidos');

      // Salvar e adicionar cada item
      const itensHtml = [];
      for (const q of resultado.itens) {
        q.texto_base = q.texto_base || resultado.texto_base || null;
        q.elementos_visuais = q.elementos_visuais || [];

        const questaoBanco = {
          origem: 'ia_gerada_pas',
          gerada_para: this.estado.userId,
          disciplina, tema: q.tema || tema,
          tipo: q.tipo, nivel: q.nivel || nivel,
          enunciado: q.enunciado,
          comando: q.comando || null,
          texto_base: q.texto_base || null,
          alternativas: q.alternativas || null,
          gabarito: q.gabarito,
          explicacao: q.explicacao || '',
          status: 'pendente',
        };

        let salvo = null;
        try { const r = await sb.from('questoes_banco').insert(questaoBanco).select('id').single(); salvo = r.data; } catch (_) {}

        q.id = salvo?.id ? `banco_${salvo.id}` : `ia_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
        this.estado.questoes.push(q);
        const num = this.estado.questoes.length;
        itensHtml.push(this._htmlPorTipo(q, num));
      }

      // Render com texto-base agrupado se houver
      const tb = resultado.texto_base;
      const instrucaoBloco = resultado.instrucao_bloco || '';
      let html = '';
      if (tb) {
        const titulo = tb.titulo || tb.title || '';
        const paras  = Array.isArray(tb.paragrafos) ? tb.paragrafos : tb.texto ? [tb.texto] : [];
        const fonte  = tb.fonte || '';
        html += `
          <div class="grupo-questoes-wrapper">
            <div class="grupo-texto-base-header">
              ${titulo ? `<div class="grupo-texto-base-titulo">${titulo}</div>` : ''}
              <div class="grupo-texto-base-corpo">${paras.map(p => `<p>${this._fmtTxt ? this._fmtTxt(String(p)) : p}</p>`).join('')}</div>
              ${fonte ? `<div class="grupo-texto-base-fonte">${fonte}</div>` : ''}
            </div>
            ${instrucaoBloco ? `<div class="grupo-instrucao-bloco">${instrucaoBloco}</div>` : ''}
            <div class="grupo-itens">${itensHtml.join('')}</div>
          </div>`;
      } else {
        html = itensHtml.join('');
      }

      container.innerHTML = html;
      await VisualRenderer.renderMath(container);
      this.renderizarNavbar();

    } catch (e) {
      console.error('Erro ao gerar PAS:', e);
      const msg = e?.message || 'Erro desconhecido';
      container.innerHTML = `<div class="ia-erro">❌ Não foi possível gerar o conjunto PAS.<br><small style="opacity:.7;font-size:11px">${msg}</small><br><br>Tente novamente.</div>`;
    }
  },

  async corrigirTipoD(qId) {
    const q       = this.estado.questoes.find(q => q.id === qId);
    const resposta = document.getElementById(`resp-${qId}`)?.value?.trim();
    const btn     = document.getElementById(`btn-corrigir-${qId}`);
    const fb      = document.getElementById(`fb-${qId}`);
    const iaDiv   = document.getElementById(`ia-resp-${qId}`);
    if (!q || !fb || !iaDiv) return;

    if (!resposta) {
      iaDiv.innerHTML = '<div class="ia-erro">⚠️ Escreva sua resposta antes de enviar.</div>';
      fb.style.display = 'block';
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = '⏳ Analisando sua resposta...'; }
    fb.style.display = 'block';
    iaDiv.innerHTML = '<div class="ia-loading">🤖 A IA está avaliando sua resposta...</div>';

    try {
      const resp = await sb.functions.invoke('gemini', {
        body: {
          funcao: 'corrigir_dissertativa',
          dados: {
            enunciado:       q.enunciado,
            comando:         q.comando || '',
            texto_base:      q.texto_base || '',
            resposta_aluno:  resposta,
            criterios:       q.gabarito || q.explicacao || '',
            disciplina:      q.disciplinas?.[0] || 'bio',
          },
        },
      });

      if (resp.error || resp.data?.error) throw new Error(resp.data?.detalhe || 'Erro na correção');
      const feedback = resp.data?.feedback;
      if (!feedback) throw new Error('IA não retornou feedback');

      iaDiv.innerHTML = `
        <div class="ia-card">
          <div class="ia-header">✏️ Correção IA</div>
          <div class="ia-texto">${feedback.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div>
        </div>`;
      if (window.MathJax?.typesetPromise) MathJax.typesetPromise([iaDiv]).catch(() => {});

      if (btn) { btn.disabled = false; btn.textContent = '🔄 Reenviar resposta'; }
    } catch (e) {
      console.error('Erro ao corrigir Tipo D:', e);
      iaDiv.innerHTML = '<div class="ia-erro">❌ Correção indisponível no momento. Releia o material e tente novamente.</div>';
      if (btn) { btn.disabled = false; btn.textContent = '✏️ Tentar novamente'; }
    }
  },

};
