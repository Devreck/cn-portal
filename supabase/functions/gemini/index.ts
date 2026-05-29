// ============================================================
// CN PORTAL MARISTA — EDGE FUNCTION GEMINI
// Todas as 5 funções de IA centralizadas aqui
// A chave GEMINI_API_KEY fica segura no servidor
// ============================================================

const GEMINI_MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-3.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const KNOWLEDGE_SUPABASE_URL = Deno.env.get('KNOWLEDGE_SUPABASE_URL') || '';
const KNOWLEDGE_SUPABASE_KEY = Deno.env.get('KNOWLEDGE_SUPABASE_KEY') || '';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── CONTEXTO BASE DA PROVA ──────────────────────────────────
const CONTEXTO_PROVA = `
Você é um elaborador de itens especialista em Ciências da Natureza para o
Ensino Médio brasileiro (3ª Série), focado na AV4 do Colégio Marista.

CONTEÚDOS DA AV4:
BIOLOGIA: Herança ligada ao sexo (cromossomo X), alelos múltiplos (Sistema ABO),
codominância, pleiotropia, epistasia recessiva dupla, linkage e recombinação
(centiMorgans), herança quantitativa/poligênica, fator Rh e doença hemolítica,
transgenia, probabilidade genética (mono e diibridismo), hemizigose, anemia falciforme.

QUÍMICA: Ânodo/cátodo, oxidação/redução, células galvânicas e eletrolíticas,
Leis de Faraday, galvanoplastia, baterias de lítio, Princípio de Le Chatelier
(pressão, temperatura, concentração), equilíbrio químico (Kc), soluções tampão,
pH de ácido fraco (Ka), catálise enzimática, energia de ativação,
termoquímica (ΔH), gráficos de perfil energético.

FÍSICA: Efeito Joule (P = V²/R, E = Pt), carga elétrica (Q = It),
energia elétrica (E = VQ), potência elétrica (P = VI),
associação de geradores em série, kWh, mAh, baterias e capacidade,
circuitos elétricos simples e associação de resistores em série.

PADRÃO DE MATEMÁTICA PROFISSIONAL:
- Em respostas textuais, use MathJax com \\(...\\) para expressões inline e \\[...\\] para blocos.
- Em JSON de questão, campos textuais como enunciado e explicacao podem usar \\(...\\) e \\[...\\].
- Em steps de questão, "linhas_latex" e "destaque_latex" devem conter apenas LaTeX puro, sem delimitadores \\[, \\], $$.
- REGRA CRÍTICA para "linhas_latex": cada entrada do array DEVE ser uma expressão COMPLETA e autossuficiente.
  ✔ CORRETO — bloco aligned inteiro em UMA entrada:
    "linhas_latex": ["\\begin{aligned}\nP &= \\frac{1}{4} \\times \\frac{1}{4} \\\\\\\\ &= \\frac{1}{16}\n\\end{aligned}"]
  ✗ ERRADO — aligned fragmentado em entradas separadas (causa erros de renderização):
    "linhas_latex": ["\\begin{aligned}", "P &= ...", "\\end{aligned}"]
- Prefira \\begin{aligned}...\\end{aligned} para múltiplas linhas, \\frac{}, \\cdot, \\text{}, \\mathrm{}, unidades em \\text{}.
- Evite notação pobre como V², P = V^2/R em texto corrido, ou contas longas em uma única linha.
`;

// ── SCHEMAS DE VALIDAÇÃO ────────────────────────────────────
// ENEM: sempre 5 alternativas (A-E)
const SCHEMA_QUESTAO_C = `
{
  "disciplina": "bio|quim|fis|inter",
  "tema": "string",
  "subtema": "string",
  "tipo": "C",
  "nivel": "basico|intermediario|avancado",
  "interdisciplinar_com": ["bio","quim","fis"],
  "texto_base": {
    "paragrafos": ["string"],
    "elementos_visuais": [
      {
        "tipo": "tabela|grafico_energia|grafico_xy|circuito_serie|heredograma|equacao_quimica",
        "titulo": "string",
        "cabecalho": ["string"],
        "linhas": [["string"]],
        "componentes": [{"tipo":"bateria|resistor|lamp","label":"string","valor":"string"}],
        "geracoes": [{"individuos":[{"sexo":"M|F","afetado":false,"portador":false,"label":"string","genotipo":"string"}],"unioes":[{"pai":0,"mae":1}]}],
        "equacao": "string",
        "condicoes": "string",
        "legenda": "string",
        "series": [{"label":"string","pontos":[{"x":0,"y":0}]}]
      }
    ]
  },
  "elementos_visuais": [],
  "enunciado": "string",
  "alternativas": {
    "A": "string",
    "B": "string",
    "C": "string",
    "D": "string",
    "E": "string"
  },
  "gabarito": "A|B|C|D|E",
  "explicacao": "string explicando cada alternativa",
  "steps": [
    {
      "titulo": "string",
      "hint": "string curto",
      "explicacao": "string detalhado",
      "linhas_latex": ["expressão LaTeX"],
      "destaque_latex": "expressão LaTeX do resultado final"
    }
  ]
}`;

const SCHEMA_QUESTAO_A = `
{
  "disciplina": "bio|quim|fis|inter",
  "tema": "string",
  "subtema": "string",
  "tipo": "A",
  "nivel": "basico|intermediario|avancado",
  "interdisciplinar_com": ["bio","quim","fis"],
  "texto_base": {
    "paragrafos": ["string"],
    "elementos_visuais": [
      {
        "tipo": "tabela|grafico_energia|grafico_xy|circuito_serie|heredograma|equacao_quimica",
        "titulo": "string"
      }
    ]
  },
  "elementos_visuais": [],
  "enunciado": "string — afirmativa completa para julgar CERTO ou ERRADO",
  "gabarito": "CERTO|ERRADO",
  "explicacao": "string explicando por que é certo ou errado, destacando a pegadinha conceitual"
}`;

// ── PROMPT COMPARTILHADO: EXTRAÇÃO DE QUESTÕES ─────────────
const PROMPT_EXTRACAO_QUESTOES = `
Você está analisando uma prova brasileira de Ciências da Natureza (Biologia, Química, Física).

════════════════════════════════════
ESTRUTURA TÍPICA DO ARQUIVO
════════════════════════════════════
• Layout pode ser em 1 ou 2 COLUNAS — leia coluna por coluna, não linha por linha.
• Cada questão começa com "QUESTÃO XX" ou "Questão XX" (número inteiro).
• Algumas têm subtítulo em negrito logo abaixo do número — inclua no texto_base.
• Alternativas marcadas com Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ ou ❶❷❸❹❺ ou simplesmente A) B) C) D) E) — trate todas como A B C D E.
• O gabarito NUNCA aparece no caderno de questões — use sempre null.

════════════════════════════════════
INSTRUÇÕES PARA IMAGENS E FIGURAS
════════════════════════════════════
• Se uma questão tem figura descritível (diagrama, gráfico, tabela, mapa, foto), descreva brevemente: [Figura: descrição do conteúdo visível].
• Para TABELAS: extraia o conteúdo completo em texto estruturado (cabeçalho | col1 | col2...).
• Se as próprias ALTERNATIVAS são imagens (ex: heredogramas diferentes, vetores, gráficos distintos): descreva cada uma em 1-2 linhas — ex: A: "Heredograma com pai afetado e filho não afetado".
• Para equações químicas visíveis no PDF: extraia o texto completo.

════════════════════════════════════
CONVERSÃO PARA LATEX
════════════════════════════════════
• Toda fórmula química ou matemática deve virar LaTeX.
• Inline: \\(...\\) — ex: \\(H_2O\\), \\(Ca^{2+}\\), \\(\\Delta H\\)
• Bloco: \\[...\\] — para equações longas ou de reação
• Setas de reação: \\rightarrow ou \\rightleftharpoons
• Íons: \\(Ca^{2+}_{(aq)}\\), \\(PO_4^{3-}\\)
• Subscritos de estado: _{(aq)}, _{(s)}, _{(g)}, _{(l)}
• Exemplos:
  - "Mg²⁺(aq) + Ca(OH)₂(aq) → Mg(OH)₂(s) + Ca²⁺(aq)"
    vira: \\(Mg^{2+}_{(aq)} + Ca(OH)_{2(aq)} \\rightarrow Mg(OH)_{2(s)} + Ca^{2+}_{(aq)}\\)

════════════════════════════════════
SCHEMA JSON OBRIGATÓRIO — uma entrada por questão
════════════════════════════════════
{
  "numero": <int — número original da questão>,
  "tipo": "C",
  "disciplina": "bio" | "quim" | "fis" | "inter",
  "tema": "<tema principal inferido>",
  "subtema": "<subtema ou null>",
  "nivel": "basico" | "intermediario" | "avancado",
  "texto_base": { "paragrafos": ["<parágrafo ou descrição de figura>", "..."] } | null,
  "enunciado": "<pergunta ou comando final da questão>",
  "alternativas": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
  "gabarito": null,
  "explicacao": ""
}

REGRAS FINAIS:
1. Extraia TODAS as questões — não pule nenhuma.
2. Preserve o texto fiel ao original; não resuma nem reescreva.
3. Disciplina: bio=biologia/genética/ecologia, quim=química, fis=física, inter=interdisciplinar.
4. Tipo A (certo/errado) é raro em ENEM — se existir, use "tipo":"A" e "alternativas":null.
5. Responda APENAS com JSON válido: { "questoes": [...], "total": <N> }
   Sem texto antes ou depois, sem markdown.`;

const PROMPT_EXTRACAO_PAS = `
Você está analisando uma prova no formato PAS (Programa de Avaliação Seriada — CEBRASPE/UnB).

═══════════════════════════════════
ESTRUTURA DO PAS
═══════════════════════════════════
Layout em 2 COLUNAS. Dividido em PARTES e SEÇÕES por disciplina.
Cada seção tem BLOCOS: um texto-base + seus itens numerados.
• Texto-base: título em negrito/caixa + parágrafos, tabelas ou imagens
• Itens numerados sequencialmente (1, 2, 3... até o final da prova)
• Instruções do bloco: "julgue os itens X a Y e assinale a opção correta no item Z, que é do tipo C"

TIPOS DE ITEM:
• Tipo A ("julgue"): afirmação para julgar CERTO/ERRADO — sem alternativas
• Tipo C (dito explicitamente "tipo C"): EXATAMENTE 4 alternativas Ⓐ Ⓑ Ⓒ Ⓓ = A B C D
• Tipo B (dito explicitamente "tipo B"): resposta numérica — caixa em branco
• Tipo D (dito explicitamente "tipo D"): resposta dissertativa — linhas em branco

═══════════════════════════════════
REGRA CRÍTICA: AGRUPAMENTO
═══════════════════════════════════
Cada BLOCO (1 texto-base + seus itens) = 1 entrada no JSON com tipo "PAS".
NÃO crie uma entrada por item — crie UMA entrada por bloco/texto-base.

═══════════════════════════════════
SCHEMA JSON — uma entrada por bloco
═══════════════════════════════════
{
  "numero": <número do PRIMEIRO item do bloco — int>,
  "tipo": "PAS",
  "disciplina": "bio" | "quim" | "fis" | "matematica" | "linguagens" | "humanas" | "inter",
  "tema": "<tema principal do texto-base>",
  "nivel": "basico" | "intermediario" | "avancado",
  "texto_base": {
    "titulo": "<título do texto-base ou null>",
    "paragrafos": ["<parágrafo 1>", "..."]
  },
  "enunciado": null,
  "alternativas": {
    "pas_itens": [
      {
        "numero": <número do item — int>,
        "tipo": "A" | "C" | "B" | "D",
        "enunciado": "<texto completo do item>",
        "alternativas": { "A": "...", "B": "...", "C": "...", "D": "..." } | null,
        "gabarito": null
      }
    ]
  },
  "gabarito": null,
  "explicacao": ""
}

═══════════════════════════════════
INSTRUÇÕES ADICIONAIS
═══════════════════════════════════
1. Extraia TODOS os blocos de TODAS as partes/disciplinas
2. Para figuras/imagens: [Figura: descrição breve]
3. Para tabelas: extraia o conteúdo estruturado em texto
4. Equações e fórmulas: LaTeX inline \\(...\\), bloco \\[...\\]
5. Tipo B/D: extraia o enunciado, gabarito: null
6. O gabarito NUNCA aparece na prova — sempre null
7. Responda APENAS com JSON: { "questoes": [...], "total": <N> }`;

// ── HANDLER PRINCIPAL ───────────────────────────────────────
Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Método não permitido' }, 405);
  }

  const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY');
  if (!GEMINI_KEY) {
    return json({ error: 'Chave da API não configurada' }, 500);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const { funcao, dados } = body;

  try {
    switch (funcao) {
      case 'gerar_questao':
        return await gerarQuestao(GEMINI_KEY, dados);
      case 'extrair_questoes_pdf':
        return await extrairQuestoesPDF(GEMINI_KEY, dados);
      case 'tutor_erro':
        return await tutorErro(GEMINI_KEY, dados);
      case 'diagnostico':
        return await diagnostico(GEMINI_KEY, dados);
      case 'chat':
        return await chat(GEMINI_KEY, dados);
      case 'resumo':
        return await resumo(GEMINI_KEY, dados);
      case 'corrigir_dissertativa':
        return await corrigirDissertativa(GEMINI_KEY, dados);
      case 'gerar_questoes_pas':
        return await gerarQuestoesPAS(GEMINI_KEY, dados);
      case 'regenerar_explicacao':
        return await regenerarExplicacao(GEMINI_KEY, dados);
      default:
        return json({ error: `Função desconhecida: ${funcao}` }, 400);
    }
  } catch (err) {
    console.error(`Erro na função ${funcao}:`, err);
    return json({ error: 'Erro interno', detalhe: err.message }, 500);
  }
});

// ── FUNÇÃO 1: GERAR QUESTÃO ─────────────────────────────────
async function gerarQuestao(key: string, dados: any) {
  const {
    disciplina,
    tema,
    tipo,
    subtipo,           // 'teorica' | 'calculo' | null
    nivel,
    disciplinas_integradas,
    contexto_chunks = [],
    cenario,           // texto livre do aluno ou 'Automatico'
    tema_secundario,   // tema completo da 2ª disciplina, se houver
  } = dados;

  const chunksBase = await buscarChunksConhecimento(disciplina, tema, contexto_chunks);
  const schema = (tipo === 'C' || tipo === 'B') ? SCHEMA_QUESTAO_C : SCHEMA_QUESTAO_A;

  // ── Tipo da questão ──
  let descTipo: string;
  if (tipo === 'A') {
    descTipo = 'Tipo A (Certo ou Errado) — afirmativa com pegadinha conceitual sutil. "alternativas" = null. "gabarito" = "CERTO" ou "ERRADO".';
  } else if (tipo === 'B') {
    descTipo = `Tipo B (CDU — Centena Dezena Unidade) — resposta numérica inteira entre 0 e 999.
O aluno preenche três caixas separadas: Centena (C), Dezena (D), Unidade (U).
REGRAS OBRIGATÓRIAS PARA TIPO B:
• O cálculo DEVE resultar em um número inteiro entre 0 e 999.
• O campo "gabarito" deve conter APENAS esse número inteiro (ex: "42" ou "350"), sem unidades, sem frações.
• "alternativas" deve ser null — NÃO gere alternativas A/B/C/D/E.
• Inclua steps de resolução detalhados mostrando como se chega ao valor inteiro.
• Se o resultado natural tiver unidade (ex: 150 J, 320 W), oriente no enunciado a encontrar o valor numérico sem unidade.`;
  } else if (subtipo === 'teorica') {
    descTipo = `Tipo C (Múltipla Escolha) CONCEITUAL — estilo ENEM.
• EXATAMENTE 5 alternativas: A, B, C, D, E — SEM exceção.
• SEM cálculo numérico; foco em interpretação, comparação de conceitos, análise de situações.
• A questão deve ser AUTOSSUFICIENTE: contexto + enunciado + alternativas completos por si só.
• Alternativas erradas: erros conceituais reais e plausíveis que alunos tipicamente cometem.`;
  } else {
    descTipo = `Tipo C (Múltipla Escolha) COM CÁLCULO — estilo ENEM.
• EXATAMENTE 5 alternativas: A, B, C, D, E — SEM exceção.
• O aluno precisa calcular o valor correto; inclua steps de resolução detalhados.
• A questão deve ser AUTOSSUFICIENTE com seu próprio contexto e dados numéricos.
• Alternativas erradas: erros típicos de conta (fator 10x, inversão de fórmula, unidade errada).`;
  }

  // ── Interdisciplinaridade: só quando o aluno escolheu tema secundário ──
  const temInterdisciplinar = Array.isArray(disciplinas_integradas) && disciplinas_integradas.length > 0 && tema_secundario;
  const secaoInter = temInterdisciplinar
    ? `CONEXÃO INTERDISCIPLINAR OBRIGATÓRIA:
   Conecte organicamente o tema principal com: "${tema_secundario}" (${disciplinas_integradas.join(', ')}).
   A conexão deve ser natural — o contexto deve exigir os dois temas ao mesmo tempo, não apenas mencioná-los.`
    : `DISCIPLINA ÚNICA:
   Esta questão é monodisciplinar. NÃO force conexão com outras disciplinas.
   O campo "interdisciplinar_com" deve ser um array vazio [].`;

  // ── Cenário ──
  const cenarioEhManual = cenario && cenario !== 'Automatico';
  const secaoCenario = cenarioEhManual
    ? `CENÁRIO OBRIGATÓRIO (escolhido pelo aluno): "${cenario}"
   O enunciado DEVE estar ambientado neste contexto de forma natural.
   Não mencione o cenário superficialmente; ele deve ser a situação-problema da questão.`
    : `CENÁRIO: Escolha um contexto tecnológico e contemporâneo adequado ao tema
   (ex: dispositivos médicos, baterias, veículos elétricos, diagnóstico genético, galvanoplastia).
   Evite exemplos genéricos ou artificiais.`;

  const prompt = `
${CONTEXTO_PROVA}

═══════════════════════════════════════════
TAREFA: Elabore UMA questão de vestibular para a AV4 Marista.
═══════════════════════════════════════════

TEMA PRINCIPAL: "${tema}" — disciplina: ${disciplina}
TIPO: ${descTipo}
NÍVEL: ${{ basico: 'Fácil (conceito direto, sem armadilhas complexas)', intermediario: 'Intermediário (exige raciocínio, um passo além do óbvio)', avancado: 'Difícil (exige integração de conceitos ou cálculo em etapas)' }[nivel] || nivel}

${secaoInter}

${secaoCenario}

CONTEXTO VALIDADO DA BASE DO PROFESSOR:
${chunksBase.length
  ? chunksBase.slice(0, 4).map((c: any, i: number) => `CHUNK ${i + 1}: ${typeof c === 'string' ? c : c.texto || c.content || JSON.stringify(c)}`).join('\n\n')
  : 'Nenhum chunk fornecido nesta chamada.'}

REGRAS DE ELABORAÇÃO:
1. Responda APENAS com JSON válido, sem markdown, sem texto antes ou depois.
2. Todos os valores numéricos devem ser cientificamente corretos e coerentes entre si.
3. Toda matemática deve usar LaTeX profissional (MathJax):
   - "linhas_latex" e "destaque_latex": APENAS expressão LaTeX pura, sem \\[ \\] ou $$.
   - Prefira \\begin{aligned}...\\end{aligned} para múltiplas linhas.
   - Use \\frac{}, \\cdot, \\Omega, \\text{}, \\mathrm{}, expoentes e unidades corretamente.
   - Vírgula decimal em LaTeX: use {,} — ex: 0{,}40 em vez de 0.40.
   - Milhar: use espaço fino — ex: 18\\,000 em vez de 18.000.
   - NÃO escreva contas em texto corrido ("P = V²/R = 400/100").
   - NÃO use Unicode matemático solto (², Ω, Δ) dentro de fórmulas; use LaTeX.
   - Ao usar \\text{}, adicione \\quad ou \\ antes de variáveis adjacentes.
4. Para Tipo A: a pegadinha deve depender de uma distinção conceitual real, não de um detalhe trivial.
5. Para Tipo C com cálculo: steps devem mostrar o raciocínio completo, um conceito por step.
6. Para Tipo C conceitual: as alternativas erradas devem ser plausíveis — erros comuns reais, não absurdos óbvios.
7. Não reproduza questões da prova AV4 original.
8. Elemento visual (quando o tema permitir — não obrigatório se não agregar):
   - Genética: "heredograma" ou "tabela" de genótipos.
   - Física/circuitos: "circuito_serie" ou "grafico_xy".
   - Química: "equacao_quimica", "tabela" ou "grafico_energia".
   - Coloque em "elementos_visuais". NÃO duplique em "texto_base.elementos_visuais".
   - Nos elementos visuais: use apenas rótulos curtos (R1, E, V); explique no enunciado ou em "legenda"/"titulo". NUNCA textos longos dentro do visual.
9. Tipos de elemento visual aceitos:
   - tabela: { "tipo":"tabela", "titulo":"...", "cabecalho":["..."], "linhas":[["..."]] }
   - circuito_serie: { "tipo":"circuito_serie", "titulo":"...", "componentes":[{"tipo":"bateria","label":"V","valor":"20 V"},{"tipo":"resistor","label":"R1","valor":"100 \\Omega"}] }
   - heredograma: { "tipo":"heredograma", "titulo":"...", "geracoes":[{"individuos":[{"sexo":"M","afetado":false,"label":"I-1"},{"sexo":"F","afetado":false,"label":"I-2"}],"unioes":[{"pai":0,"mae":1}]},{"individuos":[{"sexo":"M","afetado":true,"label":"II-1"}]}] }
   - equacao_quimica: { "tipo":"equacao_quimica", "equacao":"Cu^{2+}_{(aq)} + 2e^- \\rightarrow Cu_{(s)}", "legenda":"Redução no cátodo" }
   - grafico_energia: { "tipo":"grafico_energia", "reagentes":0, "estado_transicao":80, "produtos":-30, "com_catalisador":35 }
   - grafico_xy: { "tipo":"grafico_xy", "eixo_x":"t (s)", "eixo_y":"Q (C)", "series":[{"label":"Q = It","pontos":[{"x":0,"y":0},{"x":10,"y":50}]}] }
10. Circuitos elétricos: restrinja a série simples (R_eq = R_1 + R_2, Lei de Ohm, P = VI ou RI²).
    Não gere paralelo, malhas, Kirchhoff avançado ou capacitores.

SCHEMA OBRIGATÓRIO:
${schema}

Antes de responder, valide internamente: os cálculos batem? As alternativas erradas são plausíveis? O LaTeX é sintaticamente válido?
`;

  let ultimoResultado = '';
  for (let i = 0; i < 3; i++) {
    const promptTentativa = i === 0 ? prompt : `${prompt}

ATENÇÃO: A tentativa anterior retornou JSON inválido ou incompleto.
Responda agora com UM JSON completo e válido, sem markdown, sem texto fora do JSON.`;

    ultimoResultado = await chamarGemini(key, promptTentativa, 3, 8192, true, 0.65);
    const questao = parsearJSON(ultimoResultado);

    if (questao) {
      // Garantir campos obrigatórios
      questao.origem = 'ia_gerada';
      questao.status = 'pendente';
      questao.elementos_visuais = normalizarElementosVisuais(questao);
      if (questao.texto_base?.elementos_visuais) {
        questao.texto_base.elementos_visuais = [];
      }

      return json({ sucesso: true, questao });
    }
  }

  return json({ error: 'IA não retornou JSON válido', raw: ultimoResultado }, 422);
}

// ── FUNÇÃO 2: EXTRAIR QUESTÕES DE PDF / MD ──────────────────
async function extrairQuestoesPDF(key: string, dados: any) {
  const { pdf_base64, md_texto } = dados;
  if (!pdf_base64 && !md_texto) return json({ error: 'Nenhum arquivo enviado' }, 400);

  const isMD = !!md_texto;

  const formato = dados.formato || 'auto'; // 'pas' | 'enem' | 'auto'
  const promptExtracao = formato === 'pas' ? PROMPT_EXTRACAO_PAS : PROMPT_EXTRACAO_QUESTOES;

  // Verificar tamanho do PDF
  if (pdf_base64) {
    const tamanhoMB = (pdf_base64.length * 3 / 4) / (1024 * 1024);
    if (tamanhoMB > 18) {
      return json({ error: `PDF muito grande (${tamanhoMB.toFixed(1)} MB). Limite: 18 MB.` }, 400);
    }
  }

  // Para MD: usar chamarGemini (texto puro, sem inlineData)
  if (isMD) {
    const prompt = `Analise o conteúdo Markdown abaixo de uma prova de Ciências da Natureza e extraia TODAS as questões.\n\nCONTEÚDO DO ARQUIVO:\n\`\`\`\n${md_texto}\n\`\`\`\n\n${promptExtracao}`;

    const texto = await chamarGemini(key, prompt, 2, 8192, true, 0.1);
    const resultado = parsearJSON(texto);
    if (!resultado?.questoes) throw new Error('Estrutura JSON inválida');
    return json({ sucesso: true, questoes: resultado.questoes, total: resultado.questoes.length });
  }

  // Para PDF: usar inlineData com gemini-1.5-flash
  const PDF_MODEL = 'gemini-1.5-flash';
  const PDF_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${PDF_MODEL}:generateContent`;

  const prompt = `Analise este PDF de prova de Ciências da Natureza e extraia TODAS as questões.\n\n${promptExtracao}`;

  let ultimoErro = '';

  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    const res = await fetch(PDF_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: 'application/pdf', data: pdf_base64 } },
            { text: prompt },
          ],
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!res.ok) {
      ultimoErro = await res.text();
      console.error(`extrairQuestoesPDF tentativa ${tentativa} — HTTP ${res.status}:`, ultimoErro);
      if (tentativa < 2) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      return json({ error: `Gemini recusou o PDF (HTTP ${res.status})`, detalhe: ultimoErro.slice(0, 500) }, 502);
    }

    const data = await res.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!texto) {
      ultimoErro = 'Gemini retornou resposta vazia';
      console.error('extrairQuestoesPDF: resposta vazia', JSON.stringify(data).slice(0, 300));
      continue;
    }

    const resultado = parsearJSON(texto);
    if (!resultado?.questoes) {
      ultimoErro = 'Estrutura JSON inválida';
      console.error('extrairQuestoesPDF: JSON inválido', texto.slice(0, 300));
      continue;
    }

    return json({ sucesso: true, questoes: resultado.questoes, total: resultado.questoes.length });
  }

  return json({ error: 'Não foi possível extrair as questões do PDF', detalhe: ultimoErro }, 422);
}

// ── FUNÇÃO 3: TUTOR POR ERRO ─────────────────────────────────
async function tutorErro(key: string, dados: any) {
  const {
    enunciado,
    comando,
    texto_base,
    tema,
    subtema,
    tipo          = 'C',
    resposta_aluno,
    resposta_aluno_texto,
    gabarito,
    explicacao_original,
    steps_original,
    disciplina,
    alternativas,
    nivel         = 1,
  } = dados;

  // ── Montar bloco do texto-base ──────────────────────────────
  let blocoContexto = '';
  if (texto_base) {
    const titulo = texto_base.titulo || texto_base.title || '';
    const paras  = Array.isArray(texto_base.paragrafos)
      ? texto_base.paragrafos
      : texto_base.texto ? [texto_base.texto] : typeof texto_base === 'string' ? [texto_base] : [];
    if (titulo || paras.length > 0) {
      blocoContexto = `\nTEXTO-BASE DA QUESTÃO:\n${titulo ? titulo + '\n' : ''}${paras.join('\n')}\n`;
    }
  }

  // ── Montar bloco de alternativas ────────────────────────────
  const letras = ['A','B','C','D','E'].filter(l => alternativas?.[l] != null);
  const temAlts = letras.length > 0;
  const secaoAlternativas = temAlts
    ? `\nALTERNATIVAS:\n${letras.map(l =>
        `  ${l}) ${alternativas[l]}${l === gabarito ? '  ← CORRETA' : l === resposta_aluno ? '  ← ALUNO ESCOLHEU' : ''}`
      ).join('\n')}\n`
    : '';

  // ── Montar bloco de steps (quando há resolução original) ────
  let blocoSteps = '';
  if (Array.isArray(steps_original) && steps_original.length > 0) {
    blocoSteps = `\nRESOLUÇÃO ORIGINAL DA QUESTÃO (use como referência, não repita igual):\n` +
      steps_original.map((s: any, i: number) =>
        `  Passo ${i+1} — ${s.titulo || ''}: ${s.explicacao || ''}`
      ).join('\n') + '\n';
  }

  const respostaDesc = resposta_aluno_texto
    ? `${resposta_aluno}: "${resposta_aluno_texto}"`
    : (resposta_aluno || '?');

  const discLabel: Record<string, string> = {
    bio: 'Biologia', quim: 'Química', fis: 'Física', inter: 'Ciências da Natureza',
  };
  const discNome = discLabel[disciplina] || disciplina || 'Ciências da Natureza';
  const temaLabel = tema ? `${tema}${subtema ? ' — ' + subtema : ''}` : discNome;

  // ── Abordagem por nível ─────────────────────────────────────
  const nivelLabel = ['', 'primeira', 'segunda', 'terceira'][nivel] || 'primeira';

  const abordagem: Record<number, string> = {
    1: `
ABORDAGEM — EXPLICAÇÃO COMPLETA (primeira tentativa):

Estruture sua resposta em 4 blocos claramente separados:

**1. O que a questão está testando**
Identifique o conceito central de ${temaLabel}. Explique em 2-3 frases o que o aluno precisaria saber para responder certo. Não resuma o enunciado — vá direto ao princípio.

**2. Por que a resposta "${respostaDesc}" está errada**
Explique o raciocínio que leva ao erro — o que parece fazer sentido nessa escolha mas está conceitualmente equivocado. Seja específico: qual confusão conceitual, qual detalhe ignorado, qual inversão de lógica.

**3. Por que a resposta correta (${gabarito}) é a certa**
${temAlts ? `Mostre por que cada alternativa está certa ou errada em uma linha cada. Destaque a alternativa ${gabarito} com mais detalhe.` : `Demonstre o raciocínio correto passo a passo. Se houver cálculo, mostre com LaTeX.`}

**4. Regra para fixar**
Uma frase objetiva que o aluno pode repetir mentalmente em provas para não errar de novo nesse conceito.
`,

    2: `
ABORDAGEM — NOVA TENTATIVA COM ÂNGULO DIFERENTE (segunda explicação):
O aluno já recebeu a explicação direta e não entendeu. NÃO repita a mesma estrutura da primeira explicação.

Estruture assim:

**1. Analogia do dia a dia**
Antes de mencionar a questão, crie uma analogia concreta e vívida do cotidiano (pode ser tecnologia, culinária, esporte, biologia intuitiva — qualquer coisa tangível) que reproduza EXATAMENTE o mesmo princípio conceitual. Desenvolva bem a analogia: 4-6 frases.

**2. Onde o raciocínio do aluno diverge**
Usando a analogia, mostre em que ponto o pensamento que levou a escolher "${respostaDesc}" faz sentido — e por que esse caminho leva ao lugar errado. Seja empático: o erro faz sentido superficialmente, mas...

**3. A resposta correta pela lente da analogia**
Conecte a analogia à alternativa correta (${gabarito}). Mostre que agora faz sentido intuitivo. Se houver cálculo, mostre os passos com LaTeX.

**4. A diferença em uma linha**
Destile a diferença entre o que o aluno pensou e o que é correto em uma frase direta.
`,

    3: `
ABORDAGEM — DO ZERO (terceira explicação, o aluno ainda não entendeu):
Ignore temporariamente a questão. Comece do fundamento mais básico possível.

Estruture assim:

**1. Definição do zero**
Defina o conceito-chave de ${temaLabel} como se o aluno nunca tivesse visto. Use a linguagem mais simples possível. Sem jargão técnico nas primeiras frases. 4-6 frases.

**2. O exemplo mais simples que existe**
Use um exemplo concreto, numérico ou visual, com os números mais simples possíveis (inteiros, redondos). Mostre o raciocínio do zero, com LaTeX se necessário.

**3. Agora a questão faz sentido**
Volte ao enunciado com esse fundamento em mente. Mostre que a resposta correta (${gabarito}) é a única possível. ${temAlts ? `Explique em uma frase por que cada alternativa errada não se sustenta.` : `Mostre o cálculo completo.`}

**4. Memorize isso**
Uma regra-chave de 1-2 linhas, tão simples que o aluno consegue repetir de memória na hora da prova.
`,
  };

  const avisoNivel = nivel > 1
    ? `IMPORTANTE: Esta é a ${nivelLabel} explicação para essa questão. O aluno NÃO entendeu as anteriores. Use uma abordagem radicalmente diferente — nova analogia, novo exemplo, nova estrutura. Não repita nada do que já foi dito antes.\n`
    : '';

  const prompt = `
${CONTEXTO_PROVA}

════════════════════════════════════════════
TAREFA: Um aluno errou uma questão e pediu ajuda. Gere uma explicação detalhada e útil.
════════════════════════════════════════════
${avisoNivel}
DISCIPLINA: ${discNome} | TEMA: ${temaLabel} | TIPO: ${tipo}
${blocoContexto}
ENUNCIADO DA QUESTÃO:
${enunciado}${comando ? '\n' + comando : ''}
${secaoAlternativas}
RESPOSTA DO ALUNO: ${respostaDesc}
RESPOSTA CORRETA: ${gabarito}

EXPLICAÇÃO ORIGINAL (para referência — não copie, use como base para sua explicação):
${explicacao_original || '(não disponível)'}
${blocoSteps}
${abordagem[nivel] || abordagem[1]}

════════════════════════════════════════════
REGRAS DE QUALIDADE — OBRIGATÓRIAS:
════════════════════════════════════════════
1. Seja COMPLETO. Esta explicação será salva permanentemente no banco — escreva como um professor
   experiente que quer que o aluno realmente entenda, não como quem quer ser breve.
   Mínimo absoluto: 400 palavras. Sem máximo — use o espaço que o conceito exige.
2. Use **negrito** para conceitos, termos técnicos e a resposta correta.
3. Use MathJax para toda matemática: \\(...\\) inline e \\[...\\] para cálculos em bloco.
   - Vírgula decimal: {,} (ex: \\(5{,}0\\,\\mathrm{A}\\))
   - Use \\frac{}{}, \\cdot, \\text{}, \\mathrm{} para unidades
   - NÃO fragmente \\begin{aligned}...\\end{aligned} — escreva o bloco inteiro inline no texto.
4. Linguagem em português, direta, sem ser condescendente.
5. NÃO comece com "Claro!", "Ótima pergunta!", "Com certeza!" ou elogios vazios.
6. NÃO reproduza o enunciado completo da questão.
7. NÃO escreva bastidores como "(65 words)" ou metadados da IA.
8. Escreva apenas o texto da explicação — sem JSON, sem markdown além de **negrito** e títulos de seção.
`;

  const explicacaoBruta = await chamarGemini(key, prompt, 3, 4096, false, 0.6);
  // Remover apenas metadados de contagem no FINAL do texto (última linha com "(N words)" isolado)
  // Não usar [^]* pois truncaria tudo ao encontrar "(400 words)" mencionado no meio do texto.
  const explicacao = explicacaoBruta
    .replace(/\n\s*\(\d+\s*words?\)\s*$/i, '')   // "(N words)" em linha própria no fim
    .replace(/\s+\(\d+\s*palavras?\)\s*$/i, '')  // "(N palavras)" no fim
    .replace(/\\\s*$/, '')                        // backslash solto no fim
    .trim();
  return json({ sucesso: true, explicacao });
}

// ── FUNÇÃO 3: DIAGNÓSTICO ───────────────────────────────────
async function diagnostico(key: string, dados: any) {
  const { erros_por_tema, acertos_por_disciplina, nome_aluno } = dados;

  const errosTexto = Object.entries(erros_por_tema)
    .map(([tema, erros]) => `${tema}: ${erros} erros`)
    .join(', ');

  const acertosTexto = Object.entries(acertos_por_disciplina)
    .map(([dis, pct]) => `${dis}: ${pct}%`)
    .join(', ');

  const prompt = `
${CONTEXTO_PROVA}

TAREFA: Analise o desempenho do aluno e crie um diagnóstico personalizado.

ALUNO: ${nome_aluno}
ERROS POR TEMA: ${errosTexto}
ACERTOS POR DISCIPLINA: ${acertosTexto}

Crie um diagnóstico que inclua:
1. **Pontos fortes** (1-2 áreas onde está bem)
2. **Principais lacunas** (2-3 temas que mais precisam de atenção)
3. **Plano de estudo** específico para os próximos dias
4. **Tipo de questão** que mais erra (Tipo A ou C) e por quê

Seja direto, motivador e específico. Máximo 250 palavras.
Use **negrito** para os títulos de cada seção.
`;

  const relatorio = await chamarGemini(key, prompt);
  return json({ sucesso: true, relatorio });
}

// ── FUNÇÃO 4: CHAT DE DÚVIDAS ───────────────────────────────
async function chat(key: string, dados: any) {
  const { mensagem, historico = [], nome_aluno } = dados;

  // Construir histórico de conversa
  const historicoTexto = historico
    .slice(-6) // últimas 6 mensagens
    .map((m: any) => `${m.role === 'user' ? nome_aluno : 'Tutor'}: ${m.content}`)
    .join('\n');

  const prompt = `
${CONTEXTO_PROVA}

Você é o tutor de CN do Portal Marista. Responda APENAS dúvidas sobre 
os conteúdos da AV4 listados acima. Se a pergunta for sobre outro assunto,
redirecione gentilmente para os temas da prova.

HISTÓRICO:
${historicoTexto}

NOVA PERGUNTA DE ${nome_aluno}: ${mensagem}

Responda de forma clara, didática e encorajadora.
Máximo 150 palavras. Use exemplos do cotidiano quando possível.
Use **negrito** para fórmulas e conceitos-chave.
`;

  const respostaBruta = await chamarGemini(key, prompt);
  // Remove Gemini self-annotation artifacts (e.g. "(65 words) * \")
  const resposta = respostaBruta
    .replace(/\s*\(\d+\s*words?\)[^]*$/im, '')
    .replace(/\\\s*$/, '')
    .trim();
  return json({ sucesso: true, resposta });
}

// ── FUNÇÃO 5: RESUMO PERSONALIZADO ─────────────────────────
async function resumo(key: string, dados: any) {
  const { erros_detalhados, nome_aluno, disciplinas_fracas } = dados;

  const errosTexto = erros_detalhados
    .slice(0, 15)
    .map((e: any) => `- ${e.tema}: ${e.conceito_errado}`)
    .join('\n');

  const prompt = `
${CONTEXTO_PROVA}

TAREFA: Crie um MATERIAL DE REVISÃO PERSONALIZADO, detalhado, didático e funcional.

ALUNO: ${nome_aluno}
DISCIPLINAS COM MAIS ERROS: ${disciplinas_fracas.join(', ')}
CONCEITOS QUE ERROU:
${errosTexto}

Objetivo: entregar um texto que o aluno consiga estudar de verdade, não uma lista genérica.

COMECE EXATAMENTE ASSIM:
**Resumo personalizado para ${nome_aluno}**

REGRAS DE QUALIDADE:
1. Foque nos conceitos acima. Não faça uma revisão ampla de todos os conteúdos da AV4.
2. Explique como professor: comece pelo significado físico/químico/biológico, depois mostre a fórmula ou regra.
3. Para cada tema com erro, escreva uma seção com esta estrutura:
   **Tema**
   - **Ideia central:** explicação conceitual clara, em 4 a 6 frases.
   - **Como resolver na prova:** passo a passo operacional.
   - **Exemplo resolvido:** um exemplo numérico ou conceitual completo, com conta quando couber.
   - **Pegadinha comum:** o erro provável e como evitar.
   - **Checklist rápido:** 2 a 4 itens que o aluno deve conferir antes de marcar a resposta.
4. Quando houver fórmulas, explique o que cada variável significa e as unidades usadas.
5. Toda matemática deve sair em padrão profissional MathJax:
   - expressões inline em \\(...\\);
   - demonstrações e substituições em blocos \\[...\\];
   - use \\frac, \\cdot, expoentes, subscritos, \\mathrm, \\text e unidades em \\mathrm{} quando necessário;
   - use vírgula decimal em LaTeX como {,}, por exemplo \\(2{,}8\\ \\mathrm{V}\\).
6. Em exemplos resolvidos, use dados novos e didáticos. Não copie valores, enunciados, figuras ou alternativas da prova.
7. Se houver dois conceitos parecidos, inclua uma comparação curta em formato de tabela textual.
8. Termine com um plano de estudo de 20 minutos dividido em blocos práticos.
9. Não use frases motivacionais vazias. Seja direto, específico e útil.
10. Use **negrito** para títulos, conceitos e fórmulas importantes.
11. Não escreva plano interno, análise do prompt, "final polish", "tone", "check markdown", nem qualquer bastidor da geração.
12. Não responda em inglês.

Tamanho esperado: 900 a 1400 palavras, se houver dados suficientes.
Formato: Markdown simples, bem organizado, sem JSON.
`;

  let ultimoResumo = '';
  for (let i = 0; i < 3; i++) {
    const promptTentativa = i === 0 ? prompt : `${prompt}

A tentativa anterior ficou curta, incompleta ou parecia bastidor da IA.
Agora escreva APENAS o material final do aluno, em português, começando exatamente com:
**Resumo personalizado para ${nome_aluno}**`;

    ultimoResumo = await chamarGemini(key, promptTentativa, 3, 4096, false, 0.35);
    if (resumoValido(ultimoResumo, nome_aluno)) {
      return json({ sucesso: true, resumo: ultimoResumo });
    }
  }

  return json({ error: 'IA não gerou um resumo válido', raw: ultimoResumo }, 422);
}

// ── HELPERS ─────────────────────────────────────────────────
async function chamarGemini(
  key: string,
  prompt: string,
  tentativas = 3,
  maxOutputTokens = 2048,
  jsonMode = false,
  temperature = 0.7,
): Promise<string> {
  for (let i = 0; i < tentativas; i++) {
    try {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens,
            topP: 0.9,
            ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        const isOverload = res.status === 503 || res.status === 429;
        const msg = isOverload
          ? `IA_SOBRECARGA: servidor Gemini temporariamente indisponível (${res.status})`
          : `Gemini HTTP ${res.status}: ${err}`;
        throw new Error(msg);
      }

      const data = await res.json();
      const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!texto) throw new Error('Gemini retornou resposta vazia');
      return texto;

    } catch (err) {
      console.error(`Tentativa ${i + 1} falhou:`, err.message);
      if (i === tentativas - 1) throw err;
      // 503/429 → espera progressiva mais longa; outros erros → espera curta
      const isOverload = String(err.message).startsWith('IA_SOBRECARGA');
      const delay = isOverload ? 4000 * (i + 1) : 1500 * (i + 1);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('Todas as tentativas falharam');
}

function parsearJSON(texto: string): any {
  // Remover markdown code blocks se presentes
  let limpo = texto
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  // Tentar encontrar o JSON dentro do texto
  const match = limpo.match(/\{[\s\S]*\}/);
  if (match) limpo = match[0];

  try {
    return JSON.parse(limpo);
  } catch {
    console.error('JSON inválido:', limpo.substring(0, 200));
    return null;
  }
}

function resumoValido(texto: string, nomeAluno: string): boolean {
  const limpo = (texto || '').trim();
  const lower = limpo.toLowerCase();
  const palavras = limpo.split(/\s+/).filter(Boolean).length;

  if (palavras < 450) return false;
  if (!lower.startsWith(`**resumo personalizado para ${nomeAluno.toLowerCase()}`)) return false;

  const termosInvalidos = [
    'final polish',
    '*tone:',
    'check markdown',
    'internal',
    'prompt',
    'now write',
    'the student',
  ];

  return !termosInvalidos.some(t => lower.includes(t));
}

function normalizarElementosVisuais(questao: any): any[] {
  const candidatos = [
    ...(Array.isArray(questao.elementos_visuais) ? questao.elementos_visuais : []),
    ...(Array.isArray(questao.texto_base?.elementos_visuais) ? questao.texto_base.elementos_visuais : []),
  ];

  const tiposPermitidos = new Set([
    'tabela',
    'grafico_energia',
    'grafico_xy',
    'circuito_serie',
    'heredograma',
    'equacao_quimica',
  ]);

  const vistos = new Set<string>();
  const unicos = [];

  for (const el of candidatos) {
    if (!el || !tiposPermitidos.has(el.tipo)) continue;
    if (el.tipo === 'equacao_quimica' && !String(el.equacao || '').trim()) continue;
    if (el.tipo === 'tabela' && !Array.isArray(el.linhas)) continue;
    if (el.tipo === 'grafico_xy' && !Array.isArray(el.series)) continue;
    if (el.tipo === 'circuito_serie' && !Array.isArray(el.componentes)) continue;
    if (el.tipo === 'heredograma' && !Array.isArray(el.geracoes)) continue;
    const assinatura = JSON.stringify(el);
    if (vistos.has(assinatura)) continue;
    vistos.add(assinatura);
    unicos.push(el);
  }

  return unicos.slice(0, 2);
}

async function buscarChunksConhecimento(disciplina: string, tema: string, chunksManuais: any[] = []): Promise<string[]> {
  const chunks: string[] = Array.isArray(chunksManuais)
    ? chunksManuais.map(c => typeof c === 'string' ? c : c?.texto || c?.content || '').filter(Boolean)
    : [];

  if (!KNOWLEDGE_SUPABASE_URL || !KNOWLEDGE_SUPABASE_KEY) {
    return chunks;
  }

  const arquivoPorDisc: Record<string, string> = {
    fis: 'Fis',
    quim: 'Quim',
    bio: 'Bio',
  };
  const arquivo = arquivoPorDisc[disciplina] || '';
  const termos = extrairTermosBusca(`${tema} ${disciplina}`).slice(0, 5);

  for (const termo of termos) {
    if (chunks.length >= 6) break;
    try {
      const params = new URLSearchParams();
      params.set('select', 'id,arquivo,secao,conteudo');
      params.set('limit', '3');
      params.set('conteudo', `ilike.*${termo}*`);
      if (arquivo) params.set('arquivo', `ilike.*${arquivo}*`);

      const res = await fetch(`${KNOWLEDGE_SUPABASE_URL}/rest/v1/documentos?${params.toString()}`, {
        headers: {
          apikey: KNOWLEDGE_SUPABASE_KEY,
          Authorization: `Bearer ${KNOWLEDGE_SUPABASE_KEY}`,
        },
      });

      if (!res.ok) continue;
      const rows = await res.json();
      for (const row of rows || []) {
        const texto = limparChunkConhecimento(row);
        if (texto && !chunks.some(c => c.includes(`ID ${row.id}`))) {
          chunks.push(texto);
        }
      }
    } catch (err) {
      console.warn('Busca de conhecimento falhou:', err.message);
    }
  }

  return chunks.slice(0, 4);
}

function extrairTermosBusca(texto: string): string[] {
  const stop = new Set(['tipo','nivel','basico','intermediario','avancado','fis','quim','bio','inter','com','para','sobre']);
  return [...new Set(
    (texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-zA-Z0-9]+/)
      .map(t => t.trim())
      .filter(t => t.length >= 4 && !stop.has(t.toLowerCase()))
  )];
}

function limparChunkConhecimento(row: any): string {
  const conteudo = String(row?.conteudo || '')
    .replace(/<!-- image -->/g, '')
    .replace(/<!-- formula-not-decoded -->/g, '')
    .replace(/GLYPH&lt;[^>]+&gt;/g, '')
    .replace(/\s{3,}/g, ' ')
    .trim();

  if (!conteudo) return '';

  return [
    `ID ${row.id}`,
    `Arquivo: ${row.arquivo || 'sem arquivo'}`,
    `Seção: ${row.secao || 'sem seção'}`,
    `Conteúdo: ${conteudo.slice(0, 900)}`,
  ].join('\n');
}

// ── FUNÇÃO: CORRIGIR DISSERTATIVA (Tipo D) ───────────────────
async function corrigirDissertativa(key: string, dados: any) {
  const { enunciado, comando, texto_base, resposta_aluno, criterios, disciplina } = dados;

  const contextoTB = typeof texto_base === 'string'
    ? texto_base
    : texto_base?.paragrafos
      ? texto_base.paragrafos.join('\n')
      : '';

  const prompt = `
${CONTEXTO_PROVA}

═══════════════════════════════════════════
TAREFA: Corrija a resposta dissertativa de um aluno do Ensino Médio.
═══════════════════════════════════════════

QUESTÃO (Tipo D — teórica, textual):
${contextoTB ? `TEXTO BASE: ${contextoTB}\n` : ''}ENUNCIADO: ${enunciado}
${comando ? `COMANDO: ${comando}` : ''}

${criterios ? `CRITÉRIOS / GABARITO DE REFERÊNCIA:\n${criterios}\n` : ''}

RESPOSTA DO ALUNO:
${resposta_aluno}

INSTRUÇÕES PARA CORREÇÃO:
1. Avalie a resposta de forma construtiva e pedagógica.
2. Estruture o feedback em dois blocos claros:
   **Pontos Fortes** — o que o aluno acertou ou demonstrou bem.
   **Pontos de Melhora** — o que está incompleto, impreciso ou incorreto, e como melhorar.
3. Use linguagem direta, encorajadora, sem ser paternalista.
4. Se a resposta estiver em branco ou for claramente evasiva, diga de forma gentil e redirecione.
5. Não revele a resposta completa; guie o aluno para construir o raciocínio.
6. Mencione conceitos relevantes de ${disciplina === 'bio' ? 'Biologia' : disciplina === 'quim' ? 'Química' : 'Física'} que o aluno poderia aprofundar.
7. Use equações LaTeX com \\(...\\) para expressões inline quando necessário.
8. Seja conciso — máximo de 250 palavras no total.

Responda diretamente o texto do feedback (sem JSON, sem markdown extra).
`;

  const feedback = await chamarGemini(key, prompt, 2, 1024, false, 0.5);
  // Remove possível prefixo de metadata
  const limpo = feedback.replace(/^\(\d+\s+\w+\)\s*\*?\s*/g, '').trim();
  return json({ feedback: limpo });
}

// ── FUNÇÃO: REGENERAR EXPLICAÇÃO ─────────────────────────────
async function regenerarExplicacao(key: string, dados: any) {
  const { disciplina, tipo, tema, enunciado, alternativas, gabarito, steps_resumo } = dados;
  const discLabel = { bio: 'Biologia', quim: 'Química', fis: 'Física', inter: 'Ciências da Natureza' }[disciplina] || disciplina;

  const altsText = alternativas
    ? Object.entries(alternativas).map(([l, t]) => `${l}) ${t}`).join('\n')
    : null;

  const stepsText = Array.isArray(steps_resumo) && steps_resumo.length
    ? steps_resumo.map((s: any, i: number) =>
        `Passo ${i+1} — ${s.titulo || ''}: ${s.explicacao || ''} ${(s.linhas_latex||[]).join(' | ')}`
      ).join('\n')
    : null;

  const prompt = `Você é professor de ${discLabel} do Ensino Médio (AV4 Marista — Biossensores, Genética, Eletroquímica, Termodinâmica).

Escreva a EXPLICAÇÃO COMPLETA para a questão abaixo.

TEMA: ${tema}
TIPO: ${tipo === 'A' ? 'Tipo A (Certo ou Errado)' : tipo === 'C' ? 'Tipo C (Múltipla Escolha)' : `Tipo ${tipo}`}
ENUNCIADO: ${enunciado}
${altsText ? `ALTERNATIVAS:\n${altsText}` : ''}
GABARITO: ${gabarito}
${stepsText ? `RESOLUÇÃO PASSO A PASSO (já dada — use como base):\n${stepsText}` : ''}

REGRAS OBRIGATÓRIAS:
1. Explique POR QUE o gabarito está correto — não apenas qual é.
2. Para Tipo C: explique brevemente por que cada alternativa errada está errada.
3. Para Tipo A: explique o conceito correto e onde está o erro (se ERRADO) ou por que a afirmação é precisa.
4. Use linguagem clara, científica, com rigor técnico.
5. Use LaTeX com \\(...\\) para expressões matemáticas inline. Não use $..$.
6. Comprimento: 3–6 frases completas (120–350 palavras). Seja completo, não truncar.
7. Responda APENAS o texto da explicação — nenhum JSON, nenhum prefixo, nenhum título.
8. Termine com ponto final.`;

  for (let i = 0; i < 3; i++) {
    try {
      const texto = await chamarGemini(key, prompt, 1, 2048, false, 0.4);
      const limpo = texto.trim();
      if (limpo && limpo.length > 60) {
        return json({ explicacao: limpo });
      }
    } catch (e: any) {
      console.error(`regenerarExplicacao tentativa ${i+1}:`, e.message);
      if (i < 2) await new Promise(r => setTimeout(r, 1500));
    }
  }
  return json({ error: 'Não foi possível gerar a explicação' }, 500);
}

// ── FUNÇÃO: GERAR QUESTÕES PAS ───────────────────────────────
async function gerarQuestoesPAS(key: string, dados: any) {
  const { disciplina, tema, tipos, nivel, n_itens } = dados;
  const n = n_itens || tipos?.length || 3;

  // Buscar chunks da base de conhecimento (mesmo que ENEM)
  const chunks = await buscarChunksConhecimento(disciplina, tema);

  const descNivel = {
    basico: 'Fácil (conceito direto)',
    intermediario: 'Intermediário (raciocínio e análise)',
    avancado: 'Difícil (integração de conceitos)',
  }[nivel] || nivel;

  // Numeração dos itens para o bloco de instruções (PAS numera sequencialmente no exame)
  const numBase = 1;
  const nums: number[] = (tipos as string[]).map((_: string, i: number) => numBase + i);
  const tiposA: number[] = nums.filter((_: number, i: number) => (tipos as string[])[i] === 'A');
  const tiposB: number[] = nums.filter((_: number, i: number) => (tipos as string[])[i] === 'B');
  const tiposC: number[] = nums.filter((_: number, i: number) => (tipos as string[])[i] === 'C');
  const tiposD: number[] = nums.filter((_: number, i: number) => (tipos as string[])[i] === 'D');

  // Instrução do bloco no estilo PAS real
  const partesInstrucao: string[] = [];
  if (tiposA.length > 0) {
    const label = tiposA.length === 1 ? `o item ${tiposA[0]}` : `os itens ${tiposA.slice(0,-1).join(', ')} e ${tiposA.at(-1)}`;
    partesInstrucao.push(`julgue ${label}`);
  }
  if (tiposB.length > 0) {
    tiposB.forEach((num: number) => partesInstrucao.push(`faça o que se pede no item ${num}, que é do tipo B`));
  }
  if (tiposC.length > 0) {
    tiposC.forEach((num: number) => partesInstrucao.push(`assinale a opção correta no item ${num}, que é do tipo C`));
  }
  if (tiposD.length > 0) {
    tiposD.forEach((num: number) => partesInstrucao.push(`responda ao item ${num}, que é do tipo D`));
  }
  const instrucaoBloco = partesInstrucao.length > 0
    ? `Com base no texto acima, ${partesInstrucao.join('; ')}.`
    : '';

  // Descrever cada tipo para o prompt
  const descTipos = (tipos as string[]).map((t, i) => {
    switch(t) {
      case 'A': return `Item ${nums[i]}: Tipo A (Certo ou Errado) — afirmação direta para o aluno julgar CERTO ou ERRADO. Deve explorar uma distinção conceitual real, não trivial. "alternativas" = null. "gabarito" = "CERTO" ou "ERRADO".`;
      case 'B': return `Item ${nums[i]}: Tipo B (CDU — Centena Dezena Unidade) — cálculo cujo resultado é um número inteiro entre 0 e 999. O enunciado deve pedir um valor determinado. "alternativas" = null. "gabarito" = apenas o número inteiro (ex: "42", "350"). Inclua steps detalhados de resolução.`;
      case 'C': return `Item ${nums[i]}: Tipo C (Múltipla Escolha) — EXATAMENTE 4 alternativas: Ⓐ Ⓑ Ⓒ Ⓓ (campos "A", "B", "C", "D" — SEM campo "E"). Pode ser conceitual ou de cálculo. "gabarito" = "A", "B", "C" ou "D". Alternativas erradas devem ser plausíveis.`;
      case 'D': return `Item ${nums[i]}: Tipo D (Dissertativa) — o aluno escreve ou calcula a resposta em espaço próprio. Pode ser conceitual (explique, argumente, compare) ou de cálculo (determine, calcule, obtenha). "alternativas" = null. "gabarito" contém os critérios de avaliação e/ou o valor esperado.`;
      default:  return `Item ${nums[i]}: Tipo C — 4 alternativas (A-D).`;
    }
  }).join('\n');

  const disciplinaLabel = { bio: 'Biologia', quim: 'Química', fis: 'Física', inter: 'Ciências da Natureza (interdisciplinar)' }[disciplina] || disciplina;

  const blocoConhecimento = chunks.length
    ? `════════════════════════════════════
TRECHOS VALIDADOS DA BASE DO PROFESSOR (use como base científica — fatos, fórmulas, conceitos)
════════════════════════════════════
${chunks.map((c, i) => `TRECHO ${i + 1}:\n${c}`).join('\n\n')}`
    : '';

  const prompt = `
${CONTEXTO_PROVA}

═══════════════════════════════════════════
TAREFA: Gere um bloco de itens no formato PAS 3 (CEBRASPE/UnB) para revisão da AV4 Marista.
═══════════════════════════════════════════

TEMA: "${tema}" — ${disciplinaLabel}
NÚMERO DE ITENS: ${n}
NÍVEL: ${descNivel}

${blocoConhecimento}

════════════════════════════════════
COMO FUNCIONA UM BLOCO PAS
════════════════════════════════════
Cada bloco do PAS tem:
  1. Um TEXTO-BASE contextualizado (trecho de texto científico, literário ou de divulgação,
     com dados numéricos embutidos quando necessário para itens de cálculo).
     O texto deve ter título no padrão "TEXTO I — Subtítulo" e terminar com atribuição de fonte
     (ex: "Adaptado de: Autoria. Título. Local: Editora, Ano.")
  2. Uma INSTRUÇÃO DE BLOCO no estilo PAS (ex: "Com base no texto acima, julgue os itens 1 e 2
     e assinale a opção correta no item 3, que é do tipo C.") — inclua esse texto no campo
     "instrucao_bloco" do JSON.
  3. Os ITENS numerados sequencialmente, cada um com seu tipo declarado.

════════════════════════════════════
TIPOS DE ITEM — DEFINIÇÕES EXATAS
════════════════════════════════════
${descTipos}

════════════════════════════════════
INSTRUÇÃO DE BLOCO A USAR
════════════════════════════════════
${instrucaoBloco || '(gere instrução adequada ao conjunto de itens)'}

════════════════════════════════════
REGRAS DE ELABORAÇÃO
════════════════════════════════════
1. O texto-base deve ter 3-5 parágrafos densos, com linguagem técnica/científica, e TODOS os dados
   numéricos necessários para itens de cálculo devem estar NELE (não no enunciado do item).
2. Todos os itens devem se referir explicitamente ao texto-base — não são resolúveis sem ele.
3. Tipo C: EXATAMENTE 4 alternativas (A, B, C, D). NÃO gere alternativa E.
4. Tipo B: o resultado DEVE ser inteiro ≥ 0 e ≤ 999. Especifique isso no enunciado do item.
5. Tipo D: pode pedir explicação, comparação, argumentação OU cálculo/determinação — ambos são válidos.
6. Use LaTeX com \\(...\\) para expressões inline e \\[...\\] para blocos de cálculo.
   Vírgula decimal: {,} (ex: \\(5{,}0\\,\\mathrm{A}\\)). Milhar: espaço fino (ex: \\(18\\,000\\)).
7. Fonte do texto-base: invente uma atribuição plausível (autor, obra, ano) — não use uma real.
8. Responda APENAS com JSON válido, sem markdown, sem texto fora do JSON.

════════════════════════════════════
SCHEMA OBRIGATÓRIO (JSON)
════════════════════════════════════
{
  "texto_base": {
    "titulo": "string — ex: TEXTO I — Equilíbrio Químico em Processos Industriais",
    "paragrafos": ["parágrafo 1", "parágrafo 2", "..."],
    "fonte": "string — ex: Adaptado de: SILVA, J. Química Industrial. São Paulo: Editora X, 2023."
  },
  "instrucao_bloco": "string — instrução no estilo PAS, ex: Com base no texto acima, julgue os itens 1 e 2...",
  "itens": [
    {
      "tipo": "A|B|C|D",
      "nivel": "basico|intermediario|avancado",
      "tema": "string",
      "enunciado": "string — contexto ou situação específica do item (pode ser vazio se o texto-base já basta)",
      "comando": "string — instrução ao aluno (ex: 'Julgue a afirmação a seguir.', 'Assinale a alternativa correta.', 'Determine o valor de...', 'Explique, com base no texto,')",
      "alternativas": {"A":"...","B":"...","C":"...","D":"..."} | null,
      "gabarito": "A|B|C|D|CERTO|ERRADO|número inteiro|critérios de avaliação",
      "explicacao": "string — resolução ou justificativa completa com LaTeX",
      "steps": [
        {
          "titulo": "string",
          "hint": "string curto",
          "explicacao": "string",
          "linhas_latex": ["LaTeX puro"],
          "destaque_latex": "LaTeX puro do resultado"
        }
      ]
    }
  ]
}

ATENÇÃO: steps só é necessário para itens Tipo B e Tipo D de cálculo.
Para Tipo A, C e D conceitual, steps pode ser [] ou omitido.

Antes de responder, verifique internamente:
✔ Tipo C tem exatamente 4 alternativas (A/B/C/D), sem E?
✔ Tipo B resulta em inteiro 0-999?
✔ O texto-base contém todos os dados para os itens?
✔ O LaTeX está sintaticamente correto?
✔ "instrucao_bloco" está no estilo PAS?
`;

  let ultimo = '';
  let ultimoErro = '';
  for (let i = 0; i < 3; i++) {
    try {
      const p = i === 0 ? prompt : `${prompt}\n\nATENÇÃO: Tentativa anterior retornou JSON inválido. Responda APENAS com JSON completo e válido.`;
      ultimo = await chamarGemini(key, p, 2, 8192, true, 0.65);
      const resultado = parsearJSON(ultimo);
      if (resultado?.itens?.length) {
        return json({ resultado });
      }
      ultimoErro = `JSON inválido (tentativa ${i + 1})`;
    } catch (err: any) {
      ultimoErro = err.message || 'Erro desconhecido';
      console.error(`PAS tentativa ${i + 1} falhou:`, ultimoErro);
      if (i < 2) await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }

  return json({ error: 'Não foi possível gerar o conjunto PAS após 3 tentativas', detalhe: ultimoErro }, 500);
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
