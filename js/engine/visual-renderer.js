// ============================================================
// CN PORTAL MARISTA — VISUAL-RENDERER.JS
// Renderização de matemática (MathJax 3) e elementos visuais (SVG inline)
// ============================================================

const VisualRenderer = {

  // ── INICIALIZAR MATHJAX ──────────────────────────────────
  // Chame uma vez ao carregar a página
  async init() {
    return new Promise((resolve) => {
      // Se MathJax já foi carregado globalmente, resolver imediatamente
      if (window.MathJax?.typesetPromise) { 
        console.log('✓ MathJax já carregado');
        resolve(); 
        return; 
      }

      // Esperar o MathJax ser carregado do CDN
      let tentativas = 0;
      const checkMathJax = () => {
        tentativas++;
        if (window.MathJax?.typesetPromise) {
          console.log('✓ MathJax carregado com sucesso após', tentativas, 'tentativas');
          resolve();
        } else if (tentativas < 100) {
          // Tentar até 100 vezes (10 segundos)
          setTimeout(checkMathJax, 100);
        } else {
          console.warn('⚠ MathJax não carregou após timeout');
          resolve(); // Resolver mesmo sem MathJax
        }
      };
      
      // Começar a verificar após um pequeno delay
      setTimeout(checkMathJax, 100);
    });
  },

  // ── RENDERIZAR MATH EM ELEMENTO ──────────────────────────
  async renderMath(elemento) {
    if (!elemento) return;
    
    // Se MathJax não estiver pronto, aguardar
    if (!window.MathJax?.typesetPromise) {
      console.warn('MathJax não disponível, tentando novamente...');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (window.MathJax?.typesetPromise) {
      try {
        console.log('Renderizando MathJax em elemento:', elemento.id || elemento.className);
        await MathJax.typesetPromise([elemento]);
        console.log('✓ MathJax renderizado com sucesso');
      } catch(e) {
        console.warn('Erro ao renderizar MathJax:', e);
      }
    } else {
      console.warn('MathJax não disponível mesmo após aguardar');
    }
  },

  // ── FORMATAR LATEX PARA DISPLAY ─────────────────────────
  // Converte string LaTeX para HTML pronto para MathJax
  latex(expressao, display = true) {
    if (!expressao) return '';
    const limpa = expressao.trim();
    if (display) {
      return `<span class="math-render math-display">\\[${limpa}\\]</span>`;
    }
    return `<span class="math-render">\\(${limpa}\\)</span>`;
  },

  latexInline(expressao) {
    return this.latex(expressao, false);
  },

  // ── LIMPEZA DE TEXTO PARA SVG ────────────────────────────
  // SVGs nativos não suportam MathJax bem. Essa função converte
  // marcações básicas de LaTeX geradas pela IA para caracteres Unicode.
  cleanSvgText(str) {
    if (!str) return '';
    return String(str)
      .replace(/\\\(/g, '')
      .replace(/\\\)/g, '')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '')
      .replace(/\\Omega/g, 'Ω')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\rightarrow/g, '→')
      .replace(/\^\{?2\}?/g, '²')
      .replace(/\^\{?3\}?/g, '³')
      .replace(/\^\{?\+\}?/g, '⁺')
      .replace(/\^\{?\-\}?/g, '⁻')
      .replace(/\^\{?\+2\}?/g, '²⁺')
      .replace(/\^\{?\+3\}?/g, '³⁺')
      .replace(/_\{?1\}?/g, '₁')
      .replace(/_\{?2\}?/g, '₂')
      .replace(/_\{?3\}?/g, '₃')
      .replace(/_\{?4\}?/g, '₄')
      .replace(/\\text\{([^}]*)\}/g, '$1')
      .replace(/\\mathrm\{([^}]*)\}/g, '$1');
  },

  // ── RENDERIZAR ELEMENTO VISUAL ───────────────────────────
  renderElementoVisual(elemento) {
    if (!elemento || !elemento.tipo) return '';

    switch(elemento.tipo) {
      case 'tabela':          return this.renderTabela(elemento);
      case 'grafico_energia': return this.renderGraficoEnergia(elemento);
      case 'grafico_xy':      return this.renderGraficoXY(elemento);
      case 'circuito_serie':  return this.renderCircuito(elemento);
      case 'heredograma':     return this.renderHeredograma(elemento);
      case 'equacao_quimica': return this.renderEquacaoQuimica(elemento);
      case 'molecula':        return this.renderMolecula(elemento);
      default:                return '';
    }
  },

  // ── TABELA ───────────────────────────────────────────────
  renderTabela(dados) {
    const { titulo, cabecalho, linhas, rodape } = dados;
    return `
      <div class="visual-card">
        ${titulo ? `<div class="visual-titulo">${titulo}</div>` : ''}
        <div class="visual-tabela-wrap">
          <table class="visual-tabela">
            ${cabecalho ? `
              <thead>
                <tr>${cabecalho.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
            ` : ''}
            <tbody>
              ${(linhas||[]).map(linha => `
                <tr>${linha.map(cel => `<td>${cel}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ${rodape ? `<div class="visual-rodape">${rodape}</div>` : ''}
      </div>
    `;
  },

  // ── GRÁFICO DE ENERGIA (PERFIL ENERGÉTICO) ───────────────
  renderGraficoEnergia(dados) {
    const {
      titulo = 'Perfil Energético',
      reagentes = 0,
      estado_transicao = 100,
      produtos = 30,
      label_reagentes = 'Reagentes',
      label_et = 'Estado de Transição',
      label_produtos = 'Produtos',
      label_ea = null,
      label_dh = null,
      com_catalisador = null, // energia do ET com catalisador
    } = dados;

    const W = 520, H = 280;
    const PAD = { top: 40, right: 40, bottom: 50, left: 60 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    // Normalizar valores para coordenadas SVG
    const allVals = [reagentes, estado_transicao, produtos];
    if (com_catalisador !== null) allVals.push(com_catalisador);
    const maxVal = Math.max(...allVals);
    const minVal = Math.min(...allVals);
    const range  = maxVal - minVal || 1;

    const toY = (v) => PAD.top + plotH - ((v - minVal) / range) * plotH * 0.85;
    const toX = (pct) => PAD.left + pct * plotW;

    // Pontos da curva principal
    const x0 = toX(0.05), y0 = toY(reagentes);
    const x1 = toX(0.50), y1 = toY(estado_transicao);
    const x2 = toX(0.95), y2 = toY(produtos);

    // Curva suave via Bezier cúbico
    const path = `M ${x0} ${y0} C ${toX(0.25)} ${y0}, ${toX(0.35)} ${y1}, ${x1} ${y1} S ${toX(0.75)} ${y2}, ${x2} ${y2}`;

    // Curva com catalisador (pontilhada)
    let pathCat = '';
    if (com_catalisador !== null) {
      const y1c = toY(com_catalisador);
      pathCat = `M ${x0} ${y0} C ${toX(0.25)} ${y0}, ${toX(0.35)} ${y1c}, ${x1} ${y1c} S ${toX(0.75)} ${y2}, ${x2} ${y2}`;
    }

    // Labels ΔH e Ea
    const ea_x1 = x1 + 8, ea_x2 = x1 + 8;
    const dh_x  = x2 + 10;

    const labelEa = this.cleanSvgText(label_ea || `Ea = ${estado_transicao - reagentes} kJ/mol`);
    const labelDH = this.cleanSvgText(label_dh || `ΔH = ${produtos - reagentes > 0 ? '+' : ''}${produtos - reagentes} kJ/mol`);

    return `
      <div class="visual-card">
        <div class="visual-titulo">${titulo}</div>
        <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="visual-svg no-math">
          <!-- Eixos -->
          <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top + plotH + 10}" stroke="#6b7a99" stroke-width="1.5"/>
          <line x1="${PAD.left - 10}" y1="${PAD.top + plotH}" x2="${PAD.left + plotW}" y2="${PAD.top + plotH}" stroke="#6b7a99" stroke-width="1.5"/>
          <text x="${PAD.left/2 - 5}" y="${PAD.top + plotH/2}" fill="#6b7a99" font-size="11" text-anchor="middle" transform="rotate(-90,${PAD.left/2 - 5},${PAD.top + plotH/2})">Energia (kJ/mol)</text>
          <text x="${PAD.left + plotW/2}" y="${H - 8}" fill="#6b7a99" font-size="11" text-anchor="middle">Progresso da reação →</text>

          <!-- Curva com catalisador (pontilhada) -->
          ${pathCat ? `
            <path d="${pathCat}" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="6,4" opacity="0.7"/>
            <text x="${x1}" y="${toY(com_catalisador) - 8}" fill="#a855f7" font-size="10" text-anchor="middle">com cat.</text>
          ` : ''}

          <!-- Curva principal -->
          <path d="${path}" fill="none" stroke="#1a6abf" stroke-width="2.5"/>

          <!-- Linha horizontal reagentes -->
          <line x1="${x0 - 20}" y1="${y0}" x2="${x0 + 20}" y2="${y0}" stroke="#22c55e" stroke-width="2"/>
          <!-- Linha horizontal ET -->
          <line x1="${x1 - 20}" y1="${y1}" x2="${x1 + 20}" y2="${y1}" stroke="#ef4444" stroke-width="2"/>
          <!-- Linha horizontal produtos -->
          <line x1="${x2 - 20}" y1="${y2}" x2="${x2 + 20}" y2="${y2}" stroke="#f59e0b" stroke-width="2"/>

          <!-- Seta Ea -->
          <line x1="${ea_x1}" y1="${y0}" x2="${ea_x2}" y2="${y1}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrowRed)"/>
          <text x="${ea_x1 + 8}" y="${(y0 + y1) / 2}" fill="#ef4444" font-size="10">${labelEa}</text>

          <!-- Seta ΔH -->
          <line x1="${dh_x}" y1="${y0}" x2="${dh_x}" y2="${y2}" stroke="${produtos < reagentes ? '#22c55e' : '#f59e0b'}" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrowGreen)"/>
          <text x="${dh_x + 8}" y="${(y0 + y2) / 2}" fill="${produtos < reagentes ? '#22c55e' : '#f59e0b'}" font-size="10">${labelDH}</text>

          <!-- Labels -->
          <text x="${x0}" y="${y0 - 8}" fill="#22c55e" font-size="10" text-anchor="middle">${this.cleanSvgText(label_reagentes)}</text>
          <text x="${x1}" y="${y1 - 10}" fill="#ef4444" font-size="10" text-anchor="middle">${this.cleanSvgText(label_et)}</text>
          <text x="${x2}" y="${y2 - 8}" fill="#f59e0b" font-size="10" text-anchor="middle">${this.cleanSvgText(label_produtos)}</text>

          <!-- Definições de setas -->
          <defs>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/>
            </marker>
          </defs>
        </svg>
      </div>
    `;
  },

  // ── GRÁFICO X/Y GENÉRICO ─────────────────────────────────
  renderGraficoXY(dados) {
    const {
      titulo = '',
      eixo_x = 'x',
      eixo_y = 'y',
      series = [], // [{label, cor, pontos: [{x,y}]}]
      linha_x = null, // valor de referência no eixo x
      linha_y = null, // valor de referência no eixo y
    } = dados;

    const W = 480, H = 260;
    const PAD = { top: 30, right: 30, bottom: 50, left: 60 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    // Calcular domínio
    const todosX = series.flatMap(s => s.pontos.map(p => p.x));
    const todosY = series.flatMap(s => s.pontos.map(p => p.y));
    const minX = Math.min(...todosX), maxX = Math.max(...todosX);
    const minY = Math.min(...todosY), maxY = Math.max(...todosY);
    const rangeX = maxX - minX || 1, rangeY = maxY - minY || 1;

    const toSX = (x) => PAD.left + ((x - minX) / rangeX) * plotW;
    const toSY = (y) => PAD.top  + plotH - ((y - minY) / rangeY) * plotH;

    // Gerar ticks
    const ticksX = 5, ticksY = 4;
    const xTicks = Array.from({length: ticksX+1}, (_, i) => minX + i*(maxX-minX)/ticksX);
    const yTicks = Array.from({length: ticksY+1}, (_, i) => minY + i*(maxY-minY)/ticksY);

    const cores = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#a855f7'];

    return `
      <div class="visual-card">
        ${titulo ? `<div class="visual-titulo">${titulo}</div>` : ''}
        <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="visual-svg no-math">
          <!-- Grid -->
          ${yTicks.map(y => `<line x1="${PAD.left}" y1="${toSY(y)}" x2="${PAD.left+plotW}" y2="${toSY(y)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`).join('')}

          <!-- Eixos -->
          <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top+plotH}" stroke="#6b7a99" stroke-width="1.5"/>
          <line x1="${PAD.left}" y1="${PAD.top+plotH}" x2="${PAD.left+plotW}" y2="${PAD.top+plotH}" stroke="#6b7a99" stroke-width="1.5"/>

          <!-- Ticks X -->
          ${xTicks.map(x => `
            <line x1="${toSX(x)}" y1="${PAD.top+plotH}" x2="${toSX(x)}" y2="${PAD.top+plotH+4}" stroke="#6b7a99" stroke-width="1"/>
            <text x="${toSX(x)}" y="${PAD.top+plotH+16}" fill="#6b7a99" font-size="9" text-anchor="middle">${Number(x.toFixed(2))}</text>
          `).join('')}

          <!-- Ticks Y -->
          ${yTicks.map(y => `
            <line x1="${PAD.left-4}" y1="${toSY(y)}" x2="${PAD.left}" y2="${toSY(y)}" stroke="#6b7a99" stroke-width="1"/>
            <text x="${PAD.left-8}" y="${toSY(y)+4}" fill="#6b7a99" font-size="9" text-anchor="end">${Number(y.toFixed(2))}</text>
          `).join('')}

          <!-- Labels eixos -->
          <text x="${PAD.left+plotW/2}" y="${H-4}" fill="#6b7a99" font-size="11" text-anchor="middle">${this.cleanSvgText(eixo_x)}</text>
          <text x="12" y="${PAD.top+plotH/2}" fill="#6b7a99" font-size="11" text-anchor="middle" transform="rotate(-90,12,${PAD.top+plotH/2})">${this.cleanSvgText(eixo_y)}</text>

          <!-- Linhas de referência -->
          ${linha_x !== null ? `<line x1="${toSX(linha_x)}" y1="${PAD.top}" x2="${toSX(linha_x)}" y2="${PAD.top+plotH}" stroke="#c9a84c" stroke-width="1" stroke-dasharray="5,3" opacity="0.6"/>` : ''}
          ${linha_y !== null ? `<line x1="${PAD.left}" y1="${toSY(linha_y)}" x2="${PAD.left+plotW}" y2="${toSY(linha_y)}" stroke="#c9a84c" stroke-width="1" stroke-dasharray="5,3" opacity="0.6"/>` : ''}

          <!-- Séries -->
          ${series.map((serie, si) => {
            const cor = serie.cor || cores[si % cores.length];
            const pts = serie.pontos;
            if (pts.length === 0) return '';
            const pathD = pts.map((p,i) => `${i===0?'M':'L'} ${toSX(p.x)} ${toSY(p.y)}`).join(' ');
            return `
              <path d="${pathD}" fill="none" stroke="${cor}" stroke-width="2"/>
              ${pts.map(p => `<circle cx="${toSX(p.x)}" cy="${toSY(p.y)}" r="3" fill="${cor}"/>`).join('')}
              ${serie.label ? `<text x="${toSX(pts[pts.length-1].x)+6}" y="${toSY(pts[pts.length-1].y)+4}" fill="${cor}" font-size="10">${this.cleanSvgText(serie.label)}</text>` : ''}
            `;
          }).join('')}

          <!-- Legenda -->
          ${series.length > 1 ? `
            ${series.map((s,si) => {
              const cor = s.cor || cores[si % cores.length];
              return `
                <rect x="${PAD.left + si*100}" y="${H-10}" width="12" height="6" fill="${cor}" rx="2"/>
                <text x="${PAD.left + si*100 + 16}" y="${H-5}" fill="#6b7a99" font-size="9">${this.cleanSvgText(s.label||'')}</text>
              `;
            }).join('')}
          ` : ''}
        </svg>
      </div>
    `;
  },

  // ── CIRCUITO ELÉTRICO SIMPLES ────────────────────────────
  renderCircuito(dados) {
    const {
      titulo = 'Circuito Elétrico',
      componentes = [], // [{tipo: 'resistor'|'bateria'|'lamp', label, valor}]
      tipo = 'serie',
    } = dados;

    const W = 520, H = 240;
    const topY = 68;
    const bottomY = 172;
    const midY = (topY + bottomY) / 2;
    const leftX = 70;
    const rightX = 450;
    const resistores = componentes.filter(c => c.tipo === 'resistor');
    const bateria = componentes.find(c => c.tipo === 'bateria') || componentes[0] || {};

    const label = (comp) => this.cleanSvgText(`${comp.label || ''}${comp.valor ? ' = '+comp.valor : ''}`);

    const resistorZigZag = (x1, x2, y, comp) => {
      const lead = 22;
      const start = x1 + lead;
      const end = x2 - lead;
      const seg = (end - start) / 8;
      const pts = [
        [x1, y],
        [start, y],
        [start + seg * 1, y - 12],
        [start + seg * 2, y + 12],
        [start + seg * 3, y - 12],
        [start + seg * 4, y + 12],
        [start + seg * 5, y - 12],
        [start + seg * 6, y + 12],
        [start + seg * 7, y - 12],
        [end, y],
        [x2, y],
      ].map(p => p.join(',')).join(' ');

      return `
        <polyline points="${pts}" fill="none" stroke="#d8deeb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${(x1+x2)/2}" y="${y-26}" fill="#6b7a99" font-size="12" text-anchor="middle">${label(comp)}</text>
      `;
    };

    const segmentos = Math.max(resistores.length, 1);
    const passo = (rightX - leftX) / segmentos;

    return `
      <div class="visual-card">
        <div class="visual-titulo">${titulo}</div>
        <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="visual-svg no-math">
          <line x1="${leftX}" y1="${topY}" x2="${leftX}" y2="${midY - 18}" stroke="#d8deeb" stroke-width="2"/>
          <line x1="${leftX}" y1="${midY + 18}" x2="${leftX}" y2="${bottomY}" stroke="#d8deeb" stroke-width="2"/>
          <line x1="${leftX}" y1="${bottomY}" x2="${rightX}" y2="${bottomY}" stroke="#d8deeb" stroke-width="2"/>
          <line x1="${rightX}" y1="${bottomY}" x2="${rightX}" y2="${topY}" stroke="#d8deeb" stroke-width="2"/>

          <line x1="${leftX - 22}" y1="${midY - 8}" x2="${leftX + 22}" y2="${midY - 8}" stroke="#c9a84c" stroke-width="3"/>
          <line x1="${leftX - 12}" y1="${midY + 8}" x2="${leftX + 12}" y2="${midY + 8}" stroke="#c9a84c" stroke-width="3"/>
          <text x="${leftX - 40}" y="${midY + 4}" fill="#c9a84c" font-size="13" text-anchor="end">${label(bateria) || 'V'}</text>

          ${resistores.map((comp, i) => {
            const x1 = leftX + i * passo + (i === 0 ? 22 : 0);
            const x2 = leftX + (i + 1) * passo;
            return resistorZigZag(x1, x2, topY, comp);
          }).join('')}

          <text x="${(leftX+rightX)/2}" y="${bottomY+30}" fill="#c9a84c" font-size="12" text-anchor="middle">I</text>
          <path d="M ${(leftX+rightX)/2 - 20} ${bottomY+24} h 40" stroke="#c9a84c" stroke-width="1.6" marker-end="url(#arrowCircuit)"/>
          <defs>
            <marker id="arrowCircuit" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#c9a84c"/>
            </marker>
          </defs>
        </svg>
      </div>
    `;
  },

  // ── HEREDOGRAMA ──────────────────────────────────────────
  // Formato esperado:
  //   geracoes[i].individuos[j]:
  //     sexo: 'M'|'F'
  //     afetado: bool
  //     portador: bool        ← ponto central âmbar
  //     label: 'I-1'
  //     genotipo: 'XᴬX'      ← texto dentro do símbolo (opcional)
  //     filho_de: N           ← índice da união na geração anterior que gerou este filho
  //     origem: 'externo'     ← parceiro externo (não descende da geração anterior)
  //   geracoes[i].unioes[k]:
  //     { pai: idx, mae: idx }  ← índices de individuos nesta geração
  renderHeredograma(dados) {
    const { titulo = 'Heredograma', geracoes = [] } = dados;

    if (!geracoes.length)
      return `<div class="visual-card"><div class="visual-titulo">${titulo}</div>
              <p style="color:var(--text-muted);font-size:13px;padding:16px">Heredograma não disponível</p></div>`;

    const R   = 20;   // raio/metade do lado do símbolo
    const ROW = 100;  // distância vertical entre gerações
    const PAD_LEFT = 44;
    const PAD_TOP  = 28;
    const PAD_BOT  = 46;  // espaço para legenda
    const COL_MIN  = 88;  // largura mínima por indivíduo

    const numGens  = geracoes.length;
    const maxInd   = Math.max(...geracoes.map(g => g.individuos.length));
    const W = Math.max(400, PAD_LEFT + maxInd * COL_MIN + 30);
    const H = PAD_TOP + numGens * ROW + PAD_BOT;

    // ── 1. Calcular posições ─────────────────────────────────
    // Cada geração: distribuir indivíduos uniformemente, mas
    // separar filhos de externos: filhos ficam no centro, externos ficam ao lado do cônjuge.
    geracoes.forEach((gen, gi) => {
      const y = PAD_TOP + R + gi * ROW;
      const n = gen.individuos.length;

      // Identificar filhos (têm filho_de) e externos (origem:'externo' ou sem filho_de em gi>0)
      const filhos   = gen.individuos.filter(ind => typeof ind.filho_de === 'number');
      const externos = gen.individuos.filter(ind => ind.origem === 'externo');
      const restantes = gen.individuos.filter(ind => typeof ind.filho_de !== 'number' && ind.origem !== 'externo');

      // Para gerações > 0: se nenhum tem filho_de, tratar todos como filhos (retrocompatibilidade)
      const ehFilho = gi === 0 ? true : (filhos.length > 0 || externos.length > 0);

      // Posição X base: espalhar uniformemente
      const innerW = W - PAD_LEFT - 30;
      gen.individuos.forEach((ind, ii) => {
        ind._x = PAD_LEFT + innerW * (ii + 0.5) / n;
        ind._y = y;
      });
    });

    // ── 2. Funções auxiliares ────────────────────────────────
    const ln = (x1,y1,x2,y2,stroke='#6b7a99',sw=1.5) =>
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${sw}"/>`;

    const indivSVG = (ind) => {
      const x = ind._x, y = ind._y;
      const cor  = ind.afetado ? '#ef4444' : ind.portador ? '#f59e0b' : '#8899bb';
      const fill = ind.afetado ? 'rgba(239,68,68,0.18)' : 'rgba(136,153,187,0.08)';
      const sw   = ind.afetado ? 2.5 : 1.8;

      let shape;
      if (ind.sexo === 'M') {
        shape = `<rect x="${(x-R).toFixed(1)}" y="${(y-R).toFixed(1)}" width="${R*2}" height="${R*2}" fill="${fill}" stroke="${cor}" stroke-width="${sw}" rx="3"/>`;
        if (ind.portador)
          shape += `<rect x="${(x-5).toFixed(1)}" y="${(y-5).toFixed(1)}" width="10" height="10" fill="${cor}" opacity="0.75" rx="1.5"/>`;
      } else {
        shape = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R}" fill="${fill}" stroke="${cor}" stroke-width="${sw}"/>`;
        if (ind.portador)
          shape += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="${cor}" opacity="0.75"/>`;
      }

      const labelEl = ind.label
        ? `<text x="${x.toFixed(1)}" y="${(y + R + 15).toFixed(1)}" fill="#8899bb" font-size="10" text-anchor="middle" font-family="sans-serif">${this.cleanSvgText(ind.label)}</text>`
        : '';
      const genoEl = ind.genotipo
        ? `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" fill="${cor}" font-size="9" text-anchor="middle" font-family="sans-serif">${this.cleanSvgText(ind.genotipo)}</text>`
        : '';
      return shape + labelEl + genoEl;
    };

    const ROMANOS = ['I','II','III','IV','V'];

    // ── 3. Montar SVG ────────────────────────────────────────
    let svg = '';

    geracoes.forEach((gen, gi) => {
      // Rótulo da geração
      const y = PAD_TOP + R + gi * ROW;
      svg += `<text x="8" y="${(y+4).toFixed(1)}" fill="#6b7a99" font-size="11" font-weight="700" font-family="sans-serif">${ROMANOS[gi] || gi+1}</text>`;

      // Desenhar todos os indivíduos
      gen.individuos.forEach(ind => { svg += indivSVG(ind); });

      // ── Uniões desta geração ─────────────────────────────
      (gen.unioes || []).forEach((uniao, ui) => {
        const a = gen.individuos[uniao.pai];
        const b = gen.individuos[uniao.mae];
        if (!a || !b) return;

        // Ordenar esquerda → direita
        const esq  = a._x < b._x ? a : b;
        const dir  = a._x < b._x ? b : a;

        // Linha de casal
        svg += ln(esq._x + R, esq._y, dir._x - R, dir._y);

        // Ponto de descida: meio do casal
        const midX = (esq._x + dir._x) / 2;

        // Linha vertical para baixo → conecta com próxima geração
        if (gi + 1 < numGens) {
          const nextGen = geracoes[gi + 1];
          const nextY   = PAD_TOP + R + (gi + 1) * ROW;

          // Filhos desta união: têm filho_de === ui, ou (retrocompat.) todos sem origem externa
          const filhosUniao = nextGen.individuos.filter(ind => {
            if (typeof ind.filho_de === 'number') return ind.filho_de === ui;
            if (ind.origem === 'externo') return false;
            return true; // retrocompatibilidade
          });

          if (filhosUniao.length === 0) return;

          const barY = nextY - R - 16;

          // Linha vertical casal → barra
          svg += ln(midX, esq._y + R + 2, midX, barY);

          if (filhosUniao.length === 1) {
            // Filho único: linha reta
            const f = filhosUniao[0];
            svg += ln(f._x, barY, f._x, f._y - R - 1);
          } else {
            // Múltiplos filhos: barra horizontal + gotas
            const xs = filhosUniao.map(f => f._x);
            svg += ln(Math.min(...xs), barY, Math.max(...xs), barY);
            filhosUniao.forEach(f => svg += ln(f._x, barY, f._x, f._y - R - 1));
          }
        }
      });
    });

    // ── 4. Legenda dinâmica ──────────────────────────────────
    const temPortador = geracoes.some(g => g.individuos.some(i => i.portador));
    const temAfetado  = geracoes.some(g => g.individuos.some(i => i.afetado));

    let legendaItens = `
      <span style="display:inline-flex;align-items:center;gap:5px">
        <svg width="14" height="14" class="no-math"><rect x="1" y="1" width="12" height="12" fill="rgba(136,153,187,0.1)" stroke="#8899bb" stroke-width="1.5" rx="2"/></svg>
        Homem
      </span>
      <span style="display:inline-flex;align-items:center;gap:5px">
        <svg width="14" height="14" class="no-math"><circle cx="7" cy="7" r="6" fill="rgba(136,153,187,0.1)" stroke="#8899bb" stroke-width="1.5"/></svg>
        Mulher
      </span>`;

    if (temAfetado) legendaItens += `
      <span style="display:inline-flex;align-items:center;gap:5px">
        <svg width="14" height="14" class="no-math"><rect x="1" y="1" width="12" height="12" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="2"/></svg>
        Afetado
      </span>`;

    if (temPortador) legendaItens += `
      <span style="display:inline-flex;align-items:center;gap:5px">
        <svg width="14" height="14" class="no-math"><circle cx="7" cy="7" r="6" fill="rgba(136,153,187,0.1)" stroke="#f59e0b" stroke-width="1.8"/><circle cx="7" cy="7" r="3" fill="#f59e0b" opacity="0.75"/></svg>
        Portador(a)
      </span>`;

    return `
      <div class="visual-card">
        <div class="visual-titulo">${titulo}</div>
        <div style="overflow-x:auto">
          <svg viewBox="0 0 ${W} ${H}" width="${W}" xmlns="http://www.w3.org/2000/svg" class="visual-svg no-math" style="min-width:320px;max-width:100%;height:auto">
            ${svg}
          </svg>
        </div>
        <div class="visual-legenda" style="flex-wrap:wrap;gap:12px 20px;font-size:11px;color:#8899bb">
          ${legendaItens}
        </div>
      </div>`;
  },

  // ── EQUAÇÃO QUÍMICA ──────────────────────────────────────
  renderEquacaoQuimica(dados) {
    const { equacao, condicoes, legenda } = dados;
    // Converte setas de texto para LaTeX
    const eq = (equacao || '')
      .replace(/→/g, '\\rightarrow')
      .replace(/⇌/g, '\\rightleftharpoons')
      .replace(/↑/g, '\\uparrow')
      .replace(/↓/g, '\\downarrow');

    if (!eq.trim()) return '';

    return `
      <div class="visual-card visual-equacao">
        ${condicoes ? `<div class="visual-rodape" style="margin-bottom:8px">Condições: ${condicoes}</div>` : ''}
        <div class="math-render" style="font-size:16px;text-align:center;padding:12px">\\[${eq}\\]</div>
        ${legenda ? `<div class="visual-rodape">${legenda}</div>` : ''}
      </div>
    `;
  },

  // ── MOLÉCULA ESQUEMÁTICA ────────────────────────────────
  renderMolecula(dados) {
    const {
      titulo = 'Estrutura molecular simplificada',
      atomos = [],
      ligacoes = [],
      legenda = '',
    } = dados;

    if (!Array.isArray(atomos) || atomos.length === 0) return '';

    const W = 480, H = 220;
    const cores = {
      C: '#6b7a99',
      H: '#d8deeb',
      O: '#ef4444',
      N: '#3b82f6',
      P: '#f59e0b',
      S: '#eab308',
      Li: '#a855f7',
      Zn: '#22c55e',
    };
    const atomosMap = new Map(atomos.map(a => [a.id, a]));

    const ligacoesSvg = (ligacoes || []).map(l => {
      const a = atomosMap.get(l[0]);
      const b = atomosMap.get(l[1]);
      if (!a || !b) return '';
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#6b7a99" stroke-width="${l[2] === 'dupla' ? 4 : 2}" opacity="0.85"/>`;
    }).join('');

    const atomosSvg = atomos.map(a => {
      const cor = cores[a.elemento] || '#c9a84c';
      const raio = a.raio || (a.elemento === 'H' ? 12 : 18);
      return `
        <g>
          <circle cx="${a.x}" cy="${a.y}" r="${raio}" fill="rgba(255,255,255,0.04)" stroke="${cor}" stroke-width="2"/>
          <text x="${a.x}" y="${a.y + 5}" fill="${cor}" font-size="14" font-weight="700" text-anchor="middle">${this.cleanSvgText(a.elemento)}</text>
        </g>
      `;
    }).join('');

    return `
      <div class="visual-card">
        <div class="visual-titulo">${titulo}</div>
        <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="visual-svg no-math">
          ${ligacoesSvg}
          ${atomosSvg}
        </svg>
        ${legenda ? `<div class="visual-rodape">${this.cleanSvgText(legenda)}</div>` : ''}
      </div>
    `;
  },

  // ── CSS DOS ELEMENTOS VISUAIS ────────────────────────────
  getCSSGlobal() {
    return `
      .visual-card {
        background: var(--surface2, #0d1526);
        border: 1px solid var(--border, rgba(255,255,255,0.07));
        border-radius: 12px;
        padding: 16px;
        margin: 12px 0;
        overflow: hidden;
      }
      .visual-titulo {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-muted, #6b7a99);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 12px;
      }
      .visual-svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .visual-tabela-wrap { overflow-x: auto; }
      .visual-tabela {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      .visual-tabela th {
        background: var(--surface3, #111d35);
        color: var(--text-muted, #6b7a99);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 8px 12px;
        border-bottom: 1px solid var(--border);
        text-align: left;
      }
      .visual-tabela td {
        padding: 8px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        color: var(--text, #e8edf5);
      }
      .visual-tabela tr:hover td { background: rgba(255,255,255,0.02); }
      .visual-rodape {
        font-size: 11px;
        color: var(--text-muted, #6b7a99);
        margin-top: 8px;
        font-style: italic;
      }
      .visual-legenda {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 8px;
        font-size: 11px;
        color: var(--text-muted, #6b7a99);
        align-items: center;
      }
      .visual-legenda span {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .visual-equacao { text-align: center; }
      /* MathJax override para tema escuro */
      mjx-container svg { fill: var(--text, #e8edf5) !important; }
      .math-display { display: block; margin: 12px 0; text-align: center; }
    `;
  },
};
