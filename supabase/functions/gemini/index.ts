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
- Em steps de questão, "linhas_latex" e "destaque_latex" devem conter apenas LaTeX puro, sem delimitadores.
- Prefira \\begin{aligned}...\\end{aligned}, \\frac{}, \\cdot, \\text{}, \\mathrm{}, unidades em \\text{} e símbolos LaTeX.
- Evite notação pobre como V², P = V^2/R em texto corrido, ou contas longas em uma única linha.
`;

// ── SCHEMAS DE VALIDAÇÃO ────────────────────────────────────
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
const PROMPT_EXTRACAO_QUESTOES = `Para cada questão retorne um objeto JSON com esta estrutura exata:
{
  "numero": <int — número da questão no arquivo>,
  "tipo": "A" | "C",
  "disciplina": "bio" | "quim" | "fis" | "inter",
  "tema": "<tema principal inferido do conteúdo>",
  "subtema": "<subtema ou null>",
  "nivel": "basico" | "intermediario" | "avancado",
  "texto_base": { "paragrafos": ["<parágrafo 1>", "..."] } | null,
  "enunciado": "<enunciado completo>",
  "alternativas": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." } | null,
  "gabarito": "<letra A-E, CERTO, ERRADO, ou null se não estiver no arquivo>",
  "explicacao": ""
}

REGRAS CRÍTICAS:
1. Extraia TODAS as questões sem pular nenhuma
2. Tipo A = afirmativa para julgar CERTO/ERRADO; Tipo C = múltipla escolha com letras A–E
3. Converta toda matemática para LaTeX: inline \\(...\\), bloco \\[...\\]
4. Se o gabarito não aparecer, use null — o professor irá preencher
5. Texto introdutório compartilhado por várias questões: inclua em texto_base de cada uma
6. Preserve o texto exatamente como está; não resuma nem reescreva
7. Disciplina: bio=biologia/genética, quim=química/eletroquímica, fis=física/elétrica, inter=interdisciplinar
8. Responda APENAS com JSON: { "questoes": [...], "total": <N> }`;

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
  const schema = tipo === 'C' ? SCHEMA_QUESTAO_C : SCHEMA_QUESTAO_A;

  // ── Tipo da questão ──
  let descTipo: string;
  if (tipo === 'A') {
    descTipo = 'Tipo A (Certo ou Errado) — afirmativa com pegadinha conceitual sutil';
  } else if (subtipo === 'teorica') {
    descTipo = 'Tipo C (Múltipla Escolha) CONCEITUAL — 5 alternativas, SEM cálculo numérico; foco em interpretação, comparação de conceitos ou análise de situações';
  } else {
    descTipo = 'Tipo C (Múltipla Escolha) COM CÁLCULO — 5 alternativas; o aluno precisa calcular o valor correto; inclua steps de resolução detalhados';
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

  // Verificar tamanho do PDF
  if (pdf_base64) {
    const tamanhoMB = (pdf_base64.length * 3 / 4) / (1024 * 1024);
    if (tamanhoMB > 18) {
      return json({ error: `PDF muito grande (${tamanhoMB.toFixed(1)} MB). Limite: 18 MB.` }, 400);
    }
  }

  // Para MD: usar chamarGemini (texto puro, sem inlineData)
  if (isMD) {
    const prompt = `Analise o conteúdo Markdown abaixo de uma prova de Ciências da Natureza e extraia TODAS as questões.

CONTEÚDO DO ARQUIVO:
\`\`\`
${md_texto}
\`\`\`

${PROMPT_EXTRACAO_QUESTOES}`;

    const texto = await chamarGemini(key, prompt, 2, 8192, true, 0.1);
    const resultado = parsearJSON(texto);
    if (!resultado?.questoes) throw new Error('Estrutura JSON inválida');
    return json({ sucesso: true, questoes: resultado.questoes, total: resultado.questoes.length });
  }

  // Para PDF: usar inlineData com gemini-1.5-flash
  const PDF_MODEL = 'gemini-1.5-flash';
  const PDF_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${PDF_MODEL}:generateContent`;

  const prompt = `Analise este PDF de prova de Ciências da Natureza e extraia TODAS as questões.\n\n${PROMPT_EXTRACAO_QUESTOES}`;

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
          responseMimeType: 'application/json',
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

// ── FUNÇÃO 3 (antiga 2): TUTOR POR ERRO ─────────────────────
async function tutorErro(key: string, dados: any) {
  const {
    enunciado,
    resposta_aluno,
    resposta_aluno_texto,  // texto completo da alternativa escolhida (Tipo C)
    gabarito,
    explicacao_original,
    disciplina,
    alternativas,          // { A: "...", B: "...", C: "...", D: "...", E: "..." }
    nivel = 1,             // 1 = primária, 2 = secundária, 3 = terciária
  } = dados;

  // ── Seção de alternativas (só para Tipo C) ──
  const letras = ['A','B','C','D','E'].filter(l => alternativas?.[l] != null);
  const temAlts = letras.length > 0;

  const secaoAlternativas = temAlts
    ? `\nALTERNATIVAS:\n${letras.map(l =>
        `  ${l}) ${alternativas[l]}${l === gabarito ? '  ← CORRETA' : ''}`
      ).join('\n')}\n`
    : '';

  const respostaDesc = resposta_aluno_texto
    ? `${resposta_aluno}: "${resposta_aluno_texto}"`
    : resposta_aluno;

  // ── Abordagem diferente por nível ──
  const instrucao: Record<number, string> = {
    1: `Explique de forma clara e direta:
• Por que a resposta "${respostaDesc}" está errada — identifique o equívoco conceitual específico
${temAlts ? '• Analise CADA alternativa: uma linha por alternativa dizendo por que está certa ou errada\n' : ''}• Qual o conceito correto, com exemplo do cotidiano
• Uma dica objetiva para não cometer esse erro de novo`,

    2: `O aluno já recebeu uma explicação direta e ainda não entendeu. Use uma abordagem COMPLETAMENTE DIFERENTE:
• Comece por uma analogia ou metáfora do dia a dia que explique o conceito intuitivamente
• Mostre POR QUE faz sentido pensar como o aluno pensou — e onde exatamente o raciocínio desvia
${temAlts ? '• Compare diretamente a alternativa escolhida com a correta, explicando a diferença conceitual\n' : ''}• Reformule o conceito central sem jargão técnico`,

    3: `O aluno tentou duas vezes. Volte ao FUNDAMENTO MAIS BÁSICO possível:
• Ignore a questão por um momento — defina o conceito-chave do zero, como se o aluno nunca tivesse visto
• Use a situação mais simples e concreta que consiga imaginar
• Só então conecte esse fundamento à questão e mostre por que a resposta correta é inevitável
${temAlts ? '• Explique a alternativa correta com uma frase cristalina, sem ambiguidade\n' : ''}• Encerre com uma regra mental de uma linha para fixar`,
  };

  const nivelLabel = ['', 'primeira', 'segunda', 'terceira'][nivel] || 'primeira';
  const avisoNivel = nivel > 1
    ? `\nEsta é a ${nivelLabel} explicação para esta questão. Use uma abordagem completamente diferente das anteriores — não repita metáforas, exemplos ou estrutura já usados.\n`
    : '';

  const prompt = `
${CONTEXTO_PROVA}

TAREFA: Um aluno errou uma questão. Gere uma explicação personalizada (nível ${nivel}/3).
${avisoNivel}
QUESTÃO:
${enunciado}
${secaoAlternativas}
RESPOSTA DO ALUNO: ${respostaDesc}
RESPOSTA CORRETA: ${gabarito}
EXPLICAÇÃO ORIGINAL DA QUESTÃO: ${explicacao_original}

COMO EXPLICAR NESTE NÍVEL:
${instrucao[nivel] || instrucao[1]}

REGRAS DE FORMATO:
- Linguagem encorajadora, direta e em português
- Máximo 280 palavras
- Use **negrito** para conceitos-chave e fórmulas
- Use MathJax (\\(...\\) inline, \\[...\\] em bloco) para matemática
- Não reproduza a questão inteira
- Não use frases como "como mencionado antes" ou "conforme explicado"
- Sem JSON, sem markdown extra além de **negrito**
`;

  const explicacao = await chamarGemini(key, prompt, 3, 1024, false, 0.75);
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

  const resposta = await chamarGemini(key, prompt);
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
        throw new Error(`Gemini HTTP ${res.status}: ${err}`);
      }

      const data = await res.json();
      const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!texto) throw new Error('Gemini retornou resposta vazia');
      return texto;

    } catch (err) {
      console.error(`Tentativa ${i + 1} falhou:`, err.message);
      if (i === tentativas - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
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

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
