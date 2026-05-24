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
Você é um tutor especialista em Ciências da Natureza para o 
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

CARACTERÍSTICAS DAS QUESTÕES:
- Interdisciplinares: cada questão une 2-3 disciplinas
- Contextos contemporâneos: marcapassos, biossensores, galvanoplastia, 
  baterias de celular, veículos elétricos, anemia falciforme
- Tipo A (Certo/Errado): afirmativas com pegadinhas conceituais sutis
- Tipo C (Múltipla Escolha): 5 alternativas, cálculos numéricos precisos

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
  "nivel_cognitivo": "Basico|Operacional|Global",
  "habilidade": "string — habilidade específica avaliada (ex: 'Aplicar P=I²R para calcular potência')",
  "fonte_ids": ["string — ID e seção do documento da Base de Dados utilizado (ex: 'ID 12, Seção: Efeito Joule')"],
  "interdisciplinar_com": ["bio","quim","fis"],
  "texto_base": {
    "paragrafos": ["string"]
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
  "explicacao": "string — resolução completa passo a passo + para cada distrator incorreto: qual equívoco de raciocínio o torna atraente e por que está errado",
  "steps": [
    {
      "titulo": "string",
      "hint": "string curto",
      "explicacao": "string detalhado",
      "linhas_latex": ["expressão LaTeX pura, sem delimitadores"],
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
  "nivel_cognitivo": "Basico|Operacional|Global",
  "habilidade": "string — habilidade específica avaliada",
  "fonte_ids": ["string — ID e seção do documento da Base de Dados utilizado"],
  "interdisciplinar_com": ["bio","quim","fis"],
  "texto_base": {
    "paragrafos": ["string"]
  },
  "elementos_visuais": [],
  "enunciado": "string — afirmativa completa para julgar CERTO ou ERRADO",
  "gabarito": "CERTO|ERRADO",
  "explicacao": "string — explica por que é CERTO ou ERRADO, identifica a pegadinha conceitual e justifica por que a interpretação oposta é incorreta"
}`;

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
  const { disciplina, tema, tipo, nivel, disciplinas_integradas, contexto_chunks = [] } = dados;
  const chunksBase = await buscarChunksConhecimento(disciplina, tema, contexto_chunks);

  const schema = tipo === 'C' ? SCHEMA_QUESTAO_C : SCHEMA_QUESTAO_A;
  const contextoTipo = tipo === 'C'
    ? 'múltipla escolha com 5 alternativas e cálculo numérico'
    : 'certo ou errado com pegadinha conceitual sutil';

  const prompt = `
${CONTEXTO_PROVA}

IDENTIDADE E PADRÃO DE INFALIBILIDADE:
Você atua como a síntese de três especialistas seniores — Biólogo, Físico e Químico — com domínio absoluto de design instrucional e psicometria. Tolerância zero para imprecisões conceituais, erros de cálculo, aproximações não informadas ou ambiguidades lógicas.

TAREFA: Gere UMA questão de ${contextoTipo} sobre "${tema}" (${disciplina}),
integrando com ${disciplinas_integradas?.join(' e ') || 'outra disciplina'}.
Nível: ${nivel}.

CONTEXTO VALIDADO DA BASE DO PROFESSOR:
${chunksBase.length
  ? chunksBase.slice(0, 4).map((c: any, i: number) => `CHUNK ${i + 1}: ${typeof c === 'string' ? c : c.texto || c.content || JSON.stringify(c)}`).join('\n\n')
  : 'Nenhum chunk fornecido nesta chamada.'}

REGRAS ABSOLUTAS:
1. Responda APENAS com JSON válido, sem markdown, sem texto antes ou depois.
2. Todos os valores numéricos devem ser cientificamente exatos. Cálculos que resultem em dízimas periódicas ou exijam aproximações não informadas no enunciado são proibidos.
3. Toda matemática deve ser em LaTeX profissional compatível com MathJax.
   - Em "linhas_latex" e "destaque_latex", use APENAS a expressão LaTeX, sem \\[ \\], sem $$.
   - Para várias linhas, prefira \\begin{aligned} ... \\end{aligned} ou \\begin{array} ... \\end{array}.
   - Use \\frac{}, \\cdot, \\Omega, \\text{}, \\mathrm{}, expoentes e unidades corretamente.
   - Em LaTeX, vírgula decimal como {,}: 0{,}40, 18{,}0. Milhar com espaço fino: 18\\,000.
   - NÃO escreva contas em texto corrido como "P = V²/R = 400/100".
   - NÃO use Unicode matemático (², Ω, Δ soltos) em fórmulas; use LaTeX.
4. O contexto deve ser tecnológico e contemporâneo (nunca exemplos genéricos).
5. Para Tipo C: os steps devem resolver o cálculo passo a passo como um professor.
   Cada step deve ter explicação textual curta e uma ou mais "linhas_latex" bem formatadas.
   O campo "explicacao" deve incluir a resolução completa E a justificativa do erro específico de cada distrator.
6. Para Tipo A: a pegadinha deve ser sutil — uma única palavra ou negação muda tudo.
   O campo "explicacao" deve identificar a pegadinha e explicar por que a interpretação oposta falha.
7. Não reproduza questões, dados, figuras ou alternativas da prova original AV4.
8. ELEMENTOS VISUAIS — inclua SOMENTE quando o elemento for INDISPENSÁVEL para responder à questão:
   INCLUA quando: a questão exige leitura direta de valores de um gráfico/tabela de dados, um circuito com componentes nomeados e rotulados que o aluno deve interpretar, um heredograma com indivíduos específicos, uma equação química referenciada diretamente no enunciado.
   NÃO INCLUA quando: todos os dados já estão completos no texto do enunciado e o visual apenas os repete; ou quando a tabela mostraria passos da resolução (entregando o gabarito).
   EM CASO DE DÚVIDA: não inclua.
   Se incluir, use apenas "elementos_visuais" no nível raiz. Deixe "texto_base" com apenas "paragrafos".
   Formatos aceitos:
   - tabela: { "tipo":"tabela", "titulo":"...", "cabecalho":["..."], "linhas":[["..."]] }
   - circuito_serie: { "tipo":"circuito_serie", "titulo":"...", "componentes":[{"tipo":"bateria","label":"Fonte","valor":"20 V"},{"tipo":"resistor","label":"R","valor":"100 \\Omega"}] }
   - heredograma: { "tipo":"heredograma", "titulo":"...", "geracoes":[{"individuos":[{"sexo":"M","afetado":false,"label":"I-1"},{"sexo":"F","afetado":false,"label":"I-2"}],"unioes":[{"pai":0,"mae":1}]},{"individuos":[{"sexo":"M","afetado":true,"label":"II-1"}]}] }
   - equacao_quimica: { "tipo":"equacao_quimica", "equacao":"Cu^{2+}_{(aq)} + 2e^- \\rightarrow Cu_{(s)}", "legenda":"Redução no cátodo" }
   - grafico_energia: { "tipo":"grafico_energia", "reagentes":0, "estado_transicao":80, "produtos":-30, "com_catalisador":35 }
   - grafico_xy: { "tipo":"grafico_xy", "eixo_x":"t (s)", "eixo_y":"Q (C)", "series":[{"label":"Q = It","pontos":[{"x":0,"y":0},{"x":10,"y":50}]}] }
9. Se o tema for "Circuitos Elétricos", restrinja a circuitos simples com resistores em série:
   R_eq = R_1 + R_2 + ...; V = R·I; P = V·I, P = R·I², P = V²/R.
   Não gere paralelo, malhas complexas, Kirchhoff avançado ou capacitores.
10. INTERDISCIPLINARIDADE NATURAL: a conexão entre disciplinas deve ser narrativa e real.
    PROIBIDO: usar resultado numérico de genética/biologia como dado direto de cálculo físico/químico.
    EXEMPLOS ACEITÁVEIS: biossensor (física+bio), eletroforese diagnóstica (física+bio+quim), bateria de veículo em estudo populacional (física+quim).
    EXEMPLOS PROIBIDOS: "use a probabilidade genotípica como tempo t", "gametas recombinantes = corrente em mA".
11. Preencha os campos "nivel_cognitivo", "habilidade" e "fonte_ids" corretamente.
    nivel_cognitivo segue: Basico (reconhecimento/memorização), Operacional (aplicação de procedimento), Global (análise/síntese interdisciplinar).
12. CENÁRIOS PROIBIDOS — rejeite qualquer questão que contenha:
    - Casais compostos por parentes biológicos (irmãos, primos, pai/filha, etc.) como casal reprodutor principal.
    - Qualquer relação consanguínea implícita entre o casal que planeja filhos.
    - Personagens sem nome ou genericidade excessiva que tornem a situação implausível ("dois indivíduos AA").
    CORRETO: "uma mulher portadora casa-se com um homem normal" (sem parentesco entre eles).
    CORRETO: mencionar um familiar como CONTEXTO genético ("seu irmão é hemofílico") sem que esse familiar seja o parceiro reprodutivo.
    PROIBIDO: "dois irmãos biológicos planejam ter filhos", "um casal de primos", "pai e filha com a mesma condição se reproduzem".

PROTOCOLO DE AUDITORIA INTERNA — execute silenciosamente antes de retornar o JSON:
A. DADOS: Os dados fornecidos no enunciado são suficientes para chegar à resposta? Falta alguma constante, massa molar, unidade ou restrição de contorno?
B. PROVA REAL: Resolva a questão de forma independente. O resultado coincide com exatamente UMA alternativa? As unidades estão consistentes do início ao fim?
C. DISTRATORES: Cada distrator representa um erro real e comum de raciocínio? Algum distrator pode ser considerado parcialmente correto sob interpretação alternativa válida? (Se sim: reescreva o distrator.)
D. FONTE E NÍVEL: A questão respeita o nível do Ensino Médio e não exige conhecimento de nível superior não fornecido no texto-base?
→ Se qualquer etapa falhar: descarte o item e reescreva do zero antes de retornar.

SCHEMA OBRIGATÓRIO:
${schema}
`;

  let ultimoResultado = '';
  for (let i = 0; i < 3; i++) {
    const promptTentativa = i === 0 ? prompt : `${prompt}

A tentativa anterior retornou JSON inválido ou incompleto.
Responda novamente com UM JSON completo e válido, sem markdown.`;

    ultimoResultado = await chamarGemini(key, promptTentativa, 3, 8192, true, 0.35);
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

// ── FUNÇÃO 2: TUTOR POR ERRO ────────────────────────────────
async function tutorErro(key: string, dados: any) {
  const { enunciado, resposta_aluno, gabarito, explicacao_original, disciplina } = dados;

  const prompt = `
${CONTEXTO_PROVA}

TAREFA: Um aluno errou uma questão. Explique o erro de forma personalizada.

QUESTÃO: ${enunciado}

RESPOSTA DO ALUNO: ${resposta_aluno}
RESPOSTA CORRETA: ${gabarito}
EXPLICAÇÃO PADRÃO: ${explicacao_original}

Crie uma explicação que:
1. Reconheça especificamente o que o aluno pensou (sem julgamento)
2. Explique o conceito errado com uma analogia simples
3. Mostre o raciocínio correto passo a passo
4. Dê uma dica memorável para não errar de novo
5. Use linguagem encorajadora e direta

Responda em texto corrido, máximo 200 palavras, sem JSON.
Use **negrito** para destacar conceitos importantes.
`;

  const explicacao = await chamarGemini(key, prompt);
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
