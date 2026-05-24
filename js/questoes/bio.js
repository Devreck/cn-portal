// ============================================================
// CN PORTAL MARISTA — QUESTÕES DE BIOLOGIA
// 30 Tipo C (Múltipla Escolha) + 10 Tipo A (Certo/Errado)
// ============================================================

const QUESTOES_BIO = [

// ════════════════════════════════════════════════════════════
// TIPO C — MÚLTIPLA ESCOLHA (30 questões)
// ════════════════════════════════════════════════════════════

{
  id: 'bio_c_01', tipo: 'C', nivel: 'basico',
  tema: 'Herança ligada ao sexo',
  enunciado: 'Uma mulher com visão normal, cujo pai era daltônico, casa-se com um homem de visão normal. O daltonismo é uma herança recessiva ligada ao cromossomo X. Qual a probabilidade de que o primeiro filho do casal seja do sexo masculino e daltônico?',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'B',
  explicacao: 'A mãe é portadora (XᴰX), pois seu pai era daltônico (XᴰY). O pai tem visão normal (XY). O cruzamento XᴰX × XY gera: XᴰX (portadora), XX (normal), XᴰY (daltônico), XY (normal). A probabilidade de filho daltônico do sexo masculino é 1/4 = 25%.',
  steps: [
    {
      titulo: 'Determinar o genótipo da mãe',
      hint: 'Pai daltônico transmite Xᴰ para todas as filhas',
      explicacao: 'O pai daltônico tem genótipo XᴰY. Toda filha recebe o Xᴰ do pai. Como a mãe tem visão normal, ela é portadora.',
      linhas_latex: ['\\text{Pai daltônico: } X^dY', '\\text{Mãe portadora: } X^dX'],
    },
    {
      titulo: 'Montar o cruzamento',
      hint: 'Quadro de Punnett com os gametas',
      explicacao: 'Cruzamos os gametas da mãe portadora com os gametas do pai normal.',
      linhas_latex: ['X^dX \\times XY', '\\text{Gametas mãe: } X^d, X', '\\text{Gametas pai: } X, Y'],
    },
    {
      titulo: 'Analisar a descendência',
      hint: 'Quadro de Punnett 2×2',
      explicacao: 'Combinando os gametas obtemos 4 genótipos equiprováveis.',
      linhas_latex: ['X^dX \\text{ (portadora)}, \\; XX \\text{ (normal)}, \\; X^dY \\text{ (daltônico)}, \\; XY \\text{ (normal)}'],
    },
    {
      titulo: 'Calcular a probabilidade pedida',
      hint: 'Filho do sexo masculino E daltônico',
      explicacao: 'Apenas XᴰY satisfaz as duas condições: masculino e daltônico. É 1 entre 4 filhos.',
      linhas_latex: ['P = \\frac{1}{4} = 25\\%'],
      destaque_latex: '\\boxed{P = 25\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_02', tipo: 'C', nivel: 'basico',
  tema: 'Sistema ABO',
  enunciado: 'Um casal com os tipos sanguíneos A (heterozigótico) e B (heterozigótico) deseja saber a probabilidade de ter um filho com tipo sanguíneo O. Considerando o sistema ABO com alelos Iᴬ, Iᴮ e i, qual é essa probabilidade?',
  alternativas: {
    A: '0%',
    B: '12,5%',
    C: '25%',
    D: '50%',
    E: '75%'
  },
  gabarito: 'C',
  explicacao: 'Pai Iᴬi × Mãe Iᴮi gera: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O). A proporção do tipo O (ii) é 1/4 = 25%.',
  steps: [
    {
      titulo: 'Identificar os genótipos',
      hint: 'A heterozigótico = Iᴬi; B heterozigótico = Iᴮi',
      explicacao: 'Tipo A heterozigótico tem um alelo Iᴬ e um alelo recessivo i. Tipo B heterozigótico tem Iᴮ e i.',
      linhas_latex: ['\\text{Pai: } I^A i', '\\text{Mãe: } I^B i'],
    },
    {
      titulo: 'Montar o cruzamento',
      hint: 'Quadro de Punnett 2×2',
      explicacao: 'Gametas do pai: Iᴬ e i. Gametas da mãe: Iᴮ e i.',
      linhas_latex: ['I^Ai \\times I^Bi', '\\text{Filhos: } I^AI^B, \\; I^Ai, \\; I^Bi, \\; ii'],
    },
    {
      titulo: 'Identificar os fenótipos',
      hint: 'ii = tipo O',
      explicacao: 'O genótipo ii não expressa nenhum dos antígenos A ou B, resultando no tipo O.',
      linhas_latex: ['I^AI^B \\rightarrow \\text{AB}, \\quad I^Ai \\rightarrow \\text{A}', 'I^Bi \\rightarrow \\text{B}, \\quad ii \\rightarrow \\text{O}'],
    },
    {
      titulo: 'Calcular a probabilidade',
      hint: '1 em 4 filhos',
      explicacao: 'Apenas ii resulta em tipo O, e ocorre em 1 dos 4 resultados do cruzamento.',
      linhas_latex: ['P(\\text{tipo O}) = \\frac{1}{4} = 25\\%'],
      destaque_latex: '\\boxed{25\\%} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_03', tipo: 'C', nivel: 'basico',
  tema: 'Pleiotropia',
  enunciado: 'A anemia falciforme é um exemplo clássico de pleiotropia. Um casal, ambos portadores do traço falciforme (Aa), tem filhos. Qual a probabilidade de ter um filho com anemia falciforme clínica (aa)?',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'B',
  explicacao: 'O cruzamento Aa × Aa gera: AA (25%), Aa (50%), aa (25%). A probabilidade de aa (anemia falciforme) é 25%.',
  steps: [
    {
      titulo: 'Identificar o padrão de herança',
      hint: 'Autossômica recessiva',
      explicacao: 'A anemia falciforme é causada por um alelo recessivo (a) em homozigose. Portadores (Aa) não manifestam a doença clinicamente.',
      linhas_latex: ['AA \\rightarrow \\text{normal}', 'Aa \\rightarrow \\text{portador (traço falciforme)}', 'aa \\rightarrow \\text{anemia falciforme}'],
    },
    {
      titulo: 'Realizar o cruzamento',
      hint: 'Aa × Aa',
      explicacao: 'Ambos os pais são Aa. Os gametas de cada um são A ou a.',
      linhas_latex: ['Aa \\times Aa', '\\text{Filhos: } AA : Aa : aa = 1:2:1'],
    },
    {
      titulo: 'Calcular a probabilidade de aa',
      hint: '1 em 4',
      explicacao: 'A proporção de filhos com genótipo aa é 1/4.',
      linhas_latex: ['P(aa) = \\frac{1}{4} = 25\\%'],
      destaque_latex: '\\boxed{25\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_04', tipo: 'C', nivel: 'basico',
  tema: 'Epistasia recessiva',
  enunciado: 'Em uma linhagem experimental de milho, a produção do pigmento púrpuro depende de dois genes independentes (A e B). A presença de pelo menos um alelo dominante em cada par é necessária para a expressão do pigmento. O cruzamento AaBb × AaBb produz qual proporção fenotípica de grãos com pigmento púrpuro?',
  alternativas: {
    A: '1/16',
    B: '3/16',
    C: '7/16',
    D: '9/16',
    E: '15/16'
  },
  gabarito: 'D',
  explicacao: 'No cruzamento AaBb × AaBb, a proporção de A_B_ (pelo menos um A e um B) é 9/16. Esse é o único genótipo que produz pigmento púrpuro.',
  steps: [
    {
      titulo: 'Entender a condição para pigmentação',
      hint: 'A_B_ = púrpuro; qualquer outra combinação = branco',
      explicacao: 'Para ter pigmento, o grão precisa de ao menos um alelo A E ao menos um alelo B. Isso caracteriza epistasia recessiva dupla.',
      linhas_latex: ['A\\_B\\_ \\rightarrow \\text{púrpuro}', 'A\\_bb, \\; aaB\\_, \\; aabb \\rightarrow \\text{branco}'],
    },
    {
      titulo: 'Calcular proporção de A_ no cruzamento Aa × Aa',
      hint: '3/4 têm pelo menos um A',
      explicacao: 'No cruzamento Aa × Aa: AA (1/4) + Aa (2/4) = 3/4 com pelo menos um A.',
      linhas_latex: ['P(A\\_) = \\frac{3}{4}'],
    },
    {
      titulo: 'Calcular proporção de B_ no cruzamento Bb × Bb',
      hint: 'Mesma lógica: 3/4',
      explicacao: 'Por segregação independente, o mesmo cálculo se aplica ao locus B.',
      linhas_latex: ['P(B\\_) = \\frac{3}{4}'],
    },
    {
      titulo: 'Calcular proporção de A_B_',
      hint: 'Multiplicar as probabilidades independentes',
      explicacao: 'Como os genes segregam independentemente (Lei de Mendel), multiplicamos as probabilidades.',
      linhas_latex: ['P(A\\_B\\_) = \\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}'],
      destaque_latex: '\\boxed{\\frac{9}{16}} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'bio_c_05', tipo: 'C', nivel: 'basico',
  tema: 'Fator Rh e doença hemolítica',
  enunciado: 'Uma mulher Rh negativo (rr) casa-se com um homem Rh positivo heterozigótico (Rr). Na segunda gestação, o bebê é Rh positivo. A mãe foi sensibilizada na primeira gestação. Qual o risco de doença hemolítica do recém-nascido (DHRN) neste segundo filho Rh positivo?',
  alternativas: {
    A: 'Nenhum risco, pois a mãe é Rh negativo',
    B: 'Risco apenas se o pai for Rh positivo homozigótico',
    C: 'Risco presente, pois anticorpos Anti-Rh maternos podem atravessar a placenta e destruir hemácias fetais',
    D: 'Risco apenas no terceiro filho em diante',
    E: 'Risco nulo, pois o sistema Rh não envolve anticorpos'
  },
  gabarito: 'C',
  explicacao: 'Após a sensibilização na primeira gestação, a mãe Rh− produz anticorpos Anti-Rh (IgG). Na segunda gestação com feto Rh+, esses anticorpos atravessam a placenta e podem destruir hemácias fetais, causando a DHRN (eritroblastose fetal).',
  steps: [
    {
      titulo: 'Entender a sensibilização materna',
      hint: 'Primeira gestação com feto Rh+',
      explicacao: 'Na primeira gestação, hemácias Rh+ do feto podem entrar na circulação materna (especialmente no parto). A mãe Rh− produz anticorpos Anti-Rh como resposta imune.',
      linhas_latex: ['\\text{Mãe: } rr \\; (\\text{Rh}^-)', '\\text{1ª gestação: feto Rh}^+ \\rightarrow \\text{sensibilização materna}'],
    },
    {
      titulo: 'Consequência na segunda gestação',
      hint: 'Anticorpos IgG atravessam a placenta',
      explicacao: 'Os anticorpos Anti-Rh produzidos pela mãe são do tipo IgG, que consegue atravessar a barreira placentária e atacar as hemácias do feto Rh+.',
      linhas_latex: ['\\text{Anti-Rh (IgG)} \\xrightarrow{\\text{placenta}} \\text{hemácias fetais}', '\\rightarrow \\text{hemólise} \\rightarrow \\text{DHRN}'],
    },
  ],
},

{
  id: 'bio_c_06', tipo: 'C', nivel: 'basico',
  tema: 'Codominância — Sistema ABO',
  enunciado: 'Dois indivíduos com tipo sanguíneo AB se casam. Qual a proporção esperada de filhos com tipo sanguíneo AB?',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'C',
  explicacao: 'IᴬIᴮ × IᴬIᴮ gera: IᴬIᴬ (tipo A), IᴬIᴮ (tipo AB), IᴬIᴮ (tipo AB), IᴮIᴮ (tipo B). Proporção AB = 2/4 = 50%.',
  steps: [
    {
      titulo: 'Identificar o cruzamento',
      hint: 'Ambos os pais são IᴬIᴮ',
      explicacao: 'Indivíduos com tipo AB têm genótipo IᴬIᴮ — codominância entre os dois alelos.',
      linhas_latex: ['I^AI^B \\times I^AI^B'],
    },
    {
      titulo: 'Calcular a descendência',
      hint: 'Quadro de Punnett 2×2',
      explicacao: 'Combinando os gametas: Iᴬ e Iᴮ de cada pai.',
      linhas_latex: ['I^AI^A : I^AI^B : I^AI^B : I^BI^B = 1:2:1', '\\text{Tipo A} : \\text{AB} : \\text{AB} : \\text{B}'],
    },
    {
      titulo: 'Calcular proporção AB',
      hint: '2 dos 4 resultados',
      explicacao: 'Dos 4 genótipos possíveis, 2 são IᴬIᴮ (tipo AB).',
      linhas_latex: ['P(AB) = \\frac{2}{4} = 50\\%'],
      destaque_latex: '\\boxed{50\\%} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_07', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança ligada ao X + Sistema ABO',
  enunciado: 'Uma mulher portadora de daltonismo (XᴰX) com tipo sanguíneo A heterozigótico (Iᴬi) casa-se com um homem de visão normal (XY) com tipo sanguíneo B heterozigótico (Iᴮi). Qual a probabilidade de nascer um filho do sexo masculino, daltônico e com tipo sanguíneo O?',
  alternativas: {
    A: '1/32',
    B: '1/16',
    C: '1/8',
    D: '3/16',
    E: '1/4'
  },
  gabarito: 'B',
  explicacao: 'P(masculino daltônico) = 1/4; P(tipo O) = 1/4. Como os genes segregam independentemente, P = 1/4 × 1/4 = 1/16.',
  steps: [
    {
      titulo: 'Calcular P(masculino daltônico)',
      hint: 'Cruzamento XᴰX × XY',
      explicacao: 'Os filhos possíveis são: XᴰX, XX, XᴰY, XY. Apenas XᴰY é masculino e daltônico.',
      linhas_latex: ['X^dX \\times XY \\rightarrow X^dX : XX : X^dY : XY', 'P(\\text{masc. daltônico}) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular P(tipo O)',
      hint: 'Cruzamento Iᴬi × Iᴮi',
      explicacao: 'Os filhos são: IᴬIᴮ, Iᴬi, Iᴮi, ii. Apenas ii = tipo O.',
      linhas_latex: ['I^Ai \\times I^Bi \\rightarrow I^AI^B : I^Ai : I^Bi : ii', 'P(\\text{tipo O}) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular probabilidade conjunta',
      hint: 'Genes independentes — multiplicar',
      explicacao: 'Os dois loci segregam independentemente, portanto multiplicamos as probabilidades.',
      linhas_latex: ['P = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}'],
      destaque_latex: '\\boxed{\\frac{1}{16}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_08', tipo: 'C', nivel: 'intermediario',
  tema: 'Linkage e recombinação',
  enunciado: 'Dois genes G e H estão localizados no mesmo cromossomo autossômico, com distância de 20 centiMorgans (cM) entre eles. Um indivíduo duplo heterozigótico tem os alelos G e h no cromossomo materno, e g e H no cromossomo paterno (configuração trans). Qual a frequência esperada do gameta recombinante GH?',
  alternativas: {
    A: '2%',
    B: '5%',
    C: '10%',
    D: '20%',
    E: '40%'
  },
  gabarito: 'C',
  explicacao: 'A distância de 20 cM indica 20% de recombinação total. Os gametas recombinantes são GH e gh, cada um com frequência 10%. Os gametas parentais Gh e gH têm frequência de 40% cada.',
  steps: [
    {
      titulo: 'Entender a distância genética',
      hint: '20 cM = 20% de recombinação total',
      explicacao: 'A distância em centiMorgans corresponde à frequência total de recombinação entre dois loci. 20 cM = 20% dos gametas serão recombinantes.',
      linhas_latex: ['\\text{Distância} = 20 \\text{ cM} \\rightarrow 20\\% \\text{ recombinantes}'],
    },
    {
      titulo: 'Identificar os gametas possíveis',
      hint: 'Configuração trans: Gh / gH',
      explicacao: 'Os gametas parentais (sem recombinação) são Gh e gH. Os recombinantes são GH e gh.',
      linhas_latex: ['\\text{Parentais: } Gh \\text{ e } gH \\rightarrow 80\\%', '\\text{Recombinantes: } GH \\text{ e } gh \\rightarrow 20\\%'],
    },
    {
      titulo: 'Calcular frequência do gameta GH',
      hint: 'Recombinantes são simétricos',
      explicacao: 'Os dois tipos de gametas recombinantes (GH e gh) ocorrem em frequências iguais.',
      linhas_latex: ['P(GH) = \\frac{20\\%}{2} = 10\\%'],
      destaque_latex: '\\boxed{10\\%} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_09', tipo: 'C', nivel: 'intermediario',
  tema: 'Anemia falciforme + Sistema ABO',
  enunciado: 'Um homem portador do traço falciforme (Aa) com tipo sanguíneo A heterozigótico (Iᴬi) casa-se com uma mulher portadora do traço falciforme (Aa) com tipo sanguíneo B heterozigótico (Iᴮi). Qual a probabilidade de o casal ter um filho com anemia falciforme clínica (aa) e tipo sanguíneo O (ii)?',
  alternativas: {
    A: '1/4',
    B: '1/8',
    C: '1/16',
    D: '3/16',
    E: '9/16'
  },
  gabarito: 'C',
  explicacao: 'P(aa) = 1/4; P(ii) = 1/4. Como os loci são independentes, P = 1/4 × 1/4 = 1/16.',
  steps: [
    {
      titulo: 'Calcular P(anemia falciforme) — locus da betaglobina',
      hint: 'Cruzamento Aa × Aa',
      explicacao: 'Do cruzamento Aa × Aa, a proporção de filhos aa (anemia clínica) é 1/4.',
      linhas_latex: ['Aa \\times Aa \\rightarrow AA : Aa : Aa : aa = 1:2:1', 'P(aa) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular P(tipo sanguíneo O) — locus ABO',
      hint: 'Cruzamento Iᴬi × Iᴮi',
      explicacao: 'Do cruzamento Iᴬi × Iᴮi, a proporção de filhos ii (tipo O) é 1/4.',
      linhas_latex: ['I^Ai \\times I^Bi \\rightarrow I^AI^B : I^Ai : I^Bi : ii', 'P(ii) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular probabilidade conjunta',
      hint: 'Loci independentes — multiplicar',
      explicacao: 'Os loci da betaglobina e do sistema ABO estão em cromossomos diferentes, portanto segregam independentemente.',
      linhas_latex: ['P = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}'],
      destaque_latex: '\\boxed{\\frac{1}{16}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_10', tipo: 'C', nivel: 'intermediario',
  tema: 'Epistasia dupla recessiva — milho',
  enunciado: 'Em um experimento com linhagens de milho, a produção de pigmento púrpuro depende de dois genes independentes (A e B): apenas grãos com pelo menos um alelo dominante em cada locus (genótipo A_B_) expressam o pigmento; todos os demais genótipos resultam em grãos incolores (brancos). Qual é a probabilidade de um grão ser incolor no cruzamento AaBb × AaBb?',
  alternativas: {
    A: '1/16',
    B: '3/16',
    C: '7/16',
    D: '9/16',
    E: '15/16'
  },
  gabarito: 'C',
  explicacao: 'A proporção de grãos A_B_ (púrpuro) é 9/16. Portanto, os incolores são 1 − 9/16 = 7/16.',
  steps: [
    {
      titulo: 'Identificar grãos com pigmento',
      hint: 'A_B_ = púrpuro',
      explicacao: 'Apenas grãos com pelo menos um alelo A e pelo menos um alelo B produzem pigmento.',
      linhas_latex: ['P(A\\_B\\_) = \\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}'],
    },
    {
      titulo: 'Calcular grãos incolores',
      hint: 'Complemento de A_B_',
      explicacao: 'Todos os outros genótipos (A_bb, aaB_, aabb) não produzem pigmento.',
      linhas_latex: ['P(\\text{incolor}) = 1 - \\frac{9}{16} = \\frac{7}{16}'],
      destaque_latex: '\\boxed{\\frac{7}{16}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_11', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança ligada ao X — daltonismo',
  enunciado: 'Uma mulher com visão normal, filha de pai daltônico, casa-se com um homem daltônico. Qual a probabilidade de que uma filha deste casal seja daltônica?',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'C',
  explicacao: 'A mãe é portadora (XᴰX). O pai é daltônico (XᴰY). O cruzamento XᴰX × XᴰY gera: XᴰXᴰ (filha daltônica), XᴰX (filha portadora), XᴰY (filho daltônico), XY (filho normal). Das filhas: 1/2 são daltônicas. P(filha daltônica) = 1/2 = 50%.',
  steps: [
    {
      titulo: 'Determinar genótipos dos pais',
      hint: 'Mãe: pai foi daltônico → portadora',
      explicacao: 'A mãe recebeu Xᴰ do pai daltônico, então é XᴰX. O pai daltônico é XᴰY.',
      linhas_latex: ['\\text{Mãe: } X^dX', '\\text{Pai: } X^dY'],
    },
    {
      titulo: 'Montar a descendência',
      hint: 'Cruzamento XᴰX × XᴰY',
      explicacao: 'Combinando gametas: Xᴰ e X da mãe com Xᴰ e Y do pai.',
      linhas_latex: ['X^dX^d, \\; X^dX, \\; X^dY, \\; XY'],
    },
    {
      titulo: 'Filtrar apenas as filhas',
      hint: 'Filhas têm dois cromossomos X',
      explicacao: 'As filhas são XᴰXᴰ (daltônica) e XᴰX (portadora). Metade das filhas é daltônica.',
      linhas_latex: ['P(\\text{filha daltônica}) = \\frac{1}{2} = 50\\%'],
      destaque_latex: '\\boxed{50\\%} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_12', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança poligênica — variação contínua',
  enunciado: 'A coloração da pele humana é controlada por pelo menos 3 pares de genes independentes (A, B e C), com alelos maiúsculos contribuindo aditivamente para a produção de melanina. Dois indivíduos com genótipo AaBbCc se reproduzem. Qual é a proporção esperada de filhos com a menor quantidade possível de melanina (genótipo aabbcc)?',
  alternativas: {
    A: '1/8',
    B: '1/16',
    C: '1/32',
    D: '1/64',
    E: '1/4'
  },
  gabarito: 'D',
  explicacao: 'Na herança poligênica com segregação independente, cada par contribui independentemente. Para cada par Aa × Aa, a probabilidade de gerar aa é 1/4. Com 3 pares independentes: P(aabbcc) = 1/4 × 1/4 × 1/4 = 1/64.',
  steps: [
    {
      titulo: 'Probabilidade de aa em Aa × Aa',
      hint: 'Proporção 1:2:1 → P(aa) = 1/4',
      explicacao: 'Do cruzamento Aa × Aa, a proporção de descendentes aa é 1 em 4 (AA : Aa : Aa : aa).',
      linhas_latex: ['Aa \\times Aa \\rightarrow AA : 2Aa : aa', 'P(aa) = \\frac{1}{4}'],
    },
    {
      titulo: 'Aplicar a independência dos três pares',
      hint: 'Três pares independentes → multiplique as probabilidades',
      explicacao: 'Como A, B e C segregam de forma independente (2ª Lei de Mendel), a probabilidade conjunta é o produto das probabilidades individuais.',
      linhas_latex: [
        'P(aabbcc) = P(aa) \\times P(bb) \\times P(cc)',
        'P(aabbcc) = \\frac{1}{4} \\times \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{64}',
      ],
      destaque_latex: '\\boxed{\\dfrac{1}{64}} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'bio_c_13', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança quantitativa vs. epistasia',
  enunciado: 'Em um modelo de herança quantitativa (poligênica), diferentemente da epistasia, como os alelos contribuem para o fenótipo?',
  alternativas: {
    A: 'Um gene mascara a expressão do outro',
    B: 'Alelos de diferentes genes contribuem de forma aditiva e cumulativa para o fenótipo',
    C: 'Um único par de alelos determina múltiplos fenótipos distintos',
    D: 'A expressão fenotípica é sempre dominante sobre a recessiva',
    E: 'Os genes envolvidos estão obrigatoriamente no mesmo cromossomo'
  },
  gabarito: 'B',
  explicacao: 'Na herança quantitativa, múltiplos loci contribuem com alelos aditivos para o fenótipo, resultando em variação contínua. Diferente da epistasia, não há mascaramento — todos os alelos contribuem de forma cumulativa.',
  steps: [
    {
      titulo: 'Comparar epistasia e herança quantitativa',
      hint: 'Epistasia = mascaramento; poligênica = adição',
      explicacao: 'Na epistasia, um gene interfere na expressão de outro (mascaramento). Na herança quantitativa, múltiplos genes contribuem aditivamente, sem mascarar uns aos outros.',
      linhas_latex: ['\\text{Epistasia: gene A mascara gene B}', '\\text{Poligênica: gene A + gene B + ... = fenótipo contínuo}'],
    },
  ],
},

{
  id: 'bio_c_14', tipo: 'C', nivel: 'avancado',
  tema: 'Linkage — frequência de recombinação',
  enunciado: 'Em um mapa genético, os loci G e H estão a 16 centiMorgans de distância. Um indivíduo tem a configuração GH/gh (cis). Durante a gametogênese, qual é a frequência esperada do gameta recombinante Gh?',
  alternativas: {
    A: '4%',
    B: '8%',
    C: '16%',
    D: '42%',
    E: '84%'
  },
  gabarito: 'B',
  explicacao: '16 cM = 16% de recombinação total. Os gametas recombinantes são Gh e gH, cada um com 8%. Os gametas parentais GH e gh têm 42% cada.',
  steps: [
    {
      titulo: 'Interpretar a distância genética',
      hint: '16 cM = 16% recombinantes total',
      explicacao: 'A distância de 16 cM indica que 16% dos gametas serão recombinantes (houve crossing over entre os loci).',
      linhas_latex: ['16 \\text{ cM} \\rightarrow 16\\% \\text{ gametas recombinantes}', '84\\% \\text{ gametas parentais}'],
    },
    {
      titulo: 'Identificar configuração cis e gametas',
      hint: 'Cis: GH/gh — parentais são GH e gh',
      explicacao: 'Na configuração cis, os alelos dominantes estão no mesmo cromossomo (GH). Os recombinantes são Gh e gH.',
      linhas_latex: ['\\text{Parentais: } GH \\text{ e } gh \\rightarrow 42\\% \\text{ cada}', '\\text{Recombinantes: } Gh \\text{ e } gH \\rightarrow 8\\% \\text{ cada}'],
    },
    {
      titulo: 'Calcular frequência de Gh',
      hint: 'Metade dos recombinantes',
      explicacao: 'Os dois tipos de recombinantes ocorrem em frequências iguais.',
      linhas_latex: ['P(Gh) = \\frac{16\\%}{2} = 8\\%'],
      destaque_latex: '\\boxed{8\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_15', tipo: 'C', nivel: 'avancado',
  tema: 'Pleiotropia letal — alelos múltiplos',
  enunciado: 'Considere que o alelo recessivo i do sistema ABO apresente efeito pleiotrópico com letalidade embrionária precoce em homozigose (ii). Nesse cenário, o cruzamento entre dois indivíduos heterozigóticos Iᴬi × Iᴮi produziria descendência viável com qual proporção fenotípica?',
  alternativas: {
    A: 'AB : A : B = 1:1:1',
    B: 'AB : A : B : O = 1:1:1:1',
    C: 'AB : A : B = 1:2:2',
    D: 'AB : A : B = 2:1:1',
    E: 'A : B = 1:1'
  },
  gabarito: 'A',
  explicacao: 'Do cruzamento Iᴬi × Iᴮi nascem: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O). Com a letalidade de ii, o fenótipo O é eliminado. Os 3 fenótipos viáveis (AB, A, B) ocorrem em proporção 1:1:1.',
  steps: [
    {
      titulo: 'Calcular descendência sem letalidade',
      hint: 'Cruzamento Iᴬi × Iᴮi',
      explicacao: 'Sem a letalidade, teríamos 4 genótipos em proporção 1:1:1:1.',
      linhas_latex: ['I^AI^B : I^Ai : I^Bi : ii = 1:1:1:1'],
    },
    {
      titulo: 'Aplicar a letalidade do alelo ii',
      hint: 'ii não sobrevive — remover da proporção',
      explicacao: 'O genótipo ii é letal, portanto é eliminado da descendência viável.',
      linhas_latex: ['\\text{Viáveis: } I^AI^B : I^Ai : I^Bi = 1:1:1'],
    },
    {
      titulo: 'Identificar os fenótipos',
      hint: 'IᴬIᴮ = AB, Iᴬi = A, Iᴮi = B',
      explicacao: 'Cada genótipo viável corresponde a um fenótipo distinto.',
      linhas_latex: ['AB : A : B = 1:1:1'],
      destaque_latex: '\\boxed{AB:A:B = 1:1:1} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'bio_c_16', tipo: 'C', nivel: 'avancado',
  tema: 'Aconselhamento genético — ABO + Rh',
  enunciado: 'Uma mulher possui tipo sanguíneo A com Fator Rh positivo. Sabe-se que o pai dela era tipo O negativo. Seu marido possui tipo sanguíneo B com Fator Rh positivo, e a mãe dele era tipo O negativo. Assumindo segregação independente, qual a probabilidade de este casal ter um filho com tipo sanguíneo O e Fator Rh negativo?',
  alternativas: {
    A: '1/4',
    B: '1/8',
    C: '1/16',
    D: '3/16',
    E: '9/16'
  },
  gabarito: 'C',
  explicacao: 'A mãe é Iᴬi (pai tipo O → deu i) e Rr (pai Rh− → deu r). O pai é Iᴮi (mãe tipo O → deu i) e Rr (mãe Rh− → deu r). P(tipo O) = P(ii) = 1/4; P(Rh−) = P(rr) = 1/4. P total = 1/4 × 1/4 = 1/16.',
  steps: [
    {
      titulo: 'Determinar genótipo ABO da mãe',
      hint: 'Pai dela era tipo O (ii) → ela recebeu i do pai',
      explicacao: 'O pai tipo O tem genótipo ii. A mãe tipo A recebeu um i do pai, portanto é Iᴬi (heterozigótica).',
      linhas_latex: ['\\text{Mãe: } I^Ai \\text{ (tipo A heterozigótica)}'],
    },
    {
      titulo: 'Determinar genótipo ABO do pai',
      hint: 'Mãe dele era tipo O (ii) → ele recebeu i da mãe',
      explicacao: 'Mesma lógica: o pai tipo B recebeu i de sua mãe tipo O, portanto é Iᴮi.',
      linhas_latex: ['\\text{Pai: } I^Bi \\text{ (tipo B heterozigótico)}'],
    },
    {
      titulo: 'Determinar genótipos Rh',
      hint: 'Ambos têm um pai/mãe Rh− (rr) → receberam r',
      explicacao: 'A mãe recebeu r do pai Rh−, e o pai recebeu r da mãe Rh−. Ambos são Rr.',
      linhas_latex: ['\\text{Mãe: } Rr, \\quad \\text{Pai: } Rr'],
    },
    {
      titulo: 'Calcular probabilidade',
      hint: 'P(O) × P(Rh−)',
      explicacao: 'P(ii) do cruzamento Iᴬi × Iᴮi = 1/4. P(rr) do cruzamento Rr × Rr = 1/4.',
      linhas_latex: ['P(\\text{O Rh}^-) = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}'],
      destaque_latex: '\\boxed{\\frac{1}{16}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_17', tipo: 'C', nivel: 'avancado',
  tema: 'Heredograma — herança dominante ligada ao X',
  enunciado: 'Em um heredograma, um homem afetado tem 100% das filhas afetadas e 0% dos filhos afetados. Uma mulher afetada transmite a condição a aproximadamente 50% dos filhos, independentemente do sexo. Pais não afetados não têm filhos afetados. Qual padrão de herança é compatível com todos esses dados?',
  alternativas: {
    A: 'Autossômica dominante',
    B: 'Autossômica recessiva',
    C: 'Recessiva ligada ao X',
    D: 'Dominante ligada ao X',
    E: 'Ligada ao Y'
  },
  gabarito: 'D',
  explicacao: 'Na herança dominante ligada ao X, o homem afetado tem genótipo XᴬY: transmite Xᴬ a 100% das filhas (todas afetadas) e Y a 100% dos filhos (nenhum afetado). A mulher afetada é XᴬX: transmite Xᴬ a 50% dos filhos de ambos os sexos. Pais não afetados (XY e XX) não possuem Xᴬ, portanto não geram filhos afetados — consistente com dominância.',
  steps: [
    {
      titulo: 'Analisar o padrão do homem afetado',
      hint: 'Pai afetado → 100% filhas afetadas, 0% filhos afetados',
      explicacao: 'Um homem afetado tem genótipo XᴬY. Ele transmite Xᴬ para TODAS as filhas (que herdam obrigatoriamente o X paterno) e Y para TODOS os filhos (que herdam o X da mãe). Como o alelo é dominante, todas as filhas que recebem Xᴬ são afetadas.',
      linhas_latex: ['\\text{Pai } X^AY: \\text{ filhas recebem } X^A \\rightarrow \\text{todas afetadas}', '\\text{Pai } X^AY: \\text{ filhos recebem } Y \\rightarrow \\text{nenhum afetado}'],
    },
    {
      titulo: 'Analisar o padrão da mulher afetada',
      hint: 'Mãe afetada XᴬX transmite a 50% independente do sexo',
      explicacao: 'A mulher afetada é heterozigótica (XᴬX). Ela transmite Xᴬ ou X normal com 50% de chance para cada filho — independentemente do sexo do descendente.',
      linhas_latex: ['X^AX \\times XY \\rightarrow X^AX : XX : X^AY : XY', 'P(\\text{afetado}) = \\frac{1}{2} \\text{ para ambos os sexos}'],
    },
    {
      titulo: 'Descartar as demais alternativas',
      hint: 'Por que A, B, C e E não funcionam?',
      explicacao: 'A (autossômica dominante): pai afetado transmitiria a 50% dos filhos de qualquer sexo — contradiz 0% em filhos. B (autossômica recessiva): pais não afetados poderiam ter filhos afetados — contradiz o enunciado. C (recessiva ligada ao X): homem afetado (XᵃY) teria filhas todas portadoras mas não afetadas — contradiz 100% afetadas. E (ligada ao Y): apenas filhos homens seriam afetados — contradiz filhas afetadas.',
      linhas_latex: ['\\text{Somente dominante ligada ao X explica todos os dados}'],
      destaque_latex: '\\boxed{\\text{Alternativa D — dominante ligada ao X}}',
    },
  ],
},

{
  id: 'bio_c_18', tipo: 'C', nivel: 'avancado',
  tema: 'Epistasia + probabilidade',
  enunciado: 'No modelo de epistasia recessiva dupla do milho (AaBb × AaBb), qual é a probabilidade de um grão ser AAbb (incolor por falta do alelo B)?',
  alternativas: {
    A: '1/16',
    B: '2/16',
    C: '3/16',
    D: '4/16',
    E: '9/16'
  },
  gabarito: 'A',
  explicacao: 'P(AA) = 1/4 e P(bb) = 1/4. Como os genes segregam independentemente, P(AAbb) = 1/4 × 1/4 = 1/16.',
  steps: [
    {
      titulo: 'Calcular P(AA) do cruzamento Aa × Aa',
      hint: 'Proporção 1:2:1',
      explicacao: 'Do cruzamento Aa × Aa, a proporção de AA é 1/4.',
      linhas_latex: ['P(AA) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular P(bb) do cruzamento Bb × Bb',
      hint: 'Mesma lógica',
      explicacao: 'Do cruzamento Bb × Bb, a proporção de bb é 1/4.',
      linhas_latex: ['P(bb) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular P(AAbb)',
      hint: 'Genes independentes',
      explicacao: 'Como os genes segregam independentemente, multiplicamos as probabilidades.',
      linhas_latex: ['P(AAbb) = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}'],
      destaque_latex: '\\boxed{\\frac{1}{16}} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'bio_c_19', tipo: 'C', nivel: 'basico',
  tema: 'Herança autossômica recessiva',
  enunciado: 'Na anemia falciforme, os indivíduos homozigotos recessivos (aa) manifestam a doença. Um casal em que ambos são portadores (Aa) deseja saber a probabilidade de ter um filho normal (não portador e não afetado, genótipo AA):',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'B',
  explicacao: 'Do cruzamento Aa × Aa resulta: 1/4 AA, 2/4 Aa, 1/4 aa. A probabilidade de AA (normal não portador) é 1/4 = 25%.',
  steps: [
    {
      titulo: 'Realizar o cruzamento',
      hint: 'Aa × Aa',
      explicacao: 'Cada progenitor produz gametas A e a com igual probabilidade.',
      linhas_latex: ['Aa \\times Aa \\rightarrow AA : Aa : Aa : aa = 1:2:1'],
    },
    {
      titulo: 'Identificar P(AA)',
      hint: '1 em 4',
      explicacao: 'Dos quatro resultados possíveis, apenas um é AA.',
      linhas_latex: ['P(AA) = \\frac{1}{4} = 25\\%'],
      destaque_latex: '\\boxed{25\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_20', tipo: 'C', nivel: 'basico',
  tema: 'Sistema ABO — receptor universal',
  enunciado: 'O indivíduo com tipo sanguíneo AB é considerado receptor universal no sistema ABO porque:',
  alternativas: {
    A: 'Possui aglutininas Anti-A e Anti-B no plasma',
    B: 'Não possui aglutininas (anticorpos) Anti-A nem Anti-B no plasma',
    C: 'Possui apenas a aglutinina Anti-A no plasma',
    D: 'Seus eritrócitos não possuem nenhum antígeno',
    E: 'É capaz de doar sangue para qualquer tipo sanguíneo'
  },
  gabarito: 'B',
  explicacao: 'O indivíduo AB possui antígenos A e B nos eritrócitos, mas NÃO possui aglutininas (anticorpos) Anti-A nem Anti-B no plasma. Por isso pode receber sangue de qualquer tipo sem reação de aglutinação.',
  steps: [
    {
      titulo: 'Identificar o que torna AB receptor universal',
      hint: 'Ausência de anticorpos Anti-A e Anti-B',
      explicacao: 'A reação transfusional ocorre quando os anticorpos do receptor reconhecem os antígenos do doador. AB não tem Anti-A nem Anti-B, portanto não rejeita sangue A, B, AB ou O.',
      linhas_latex: ['\\text{Tipo AB: antígenos A e B, sem Anti-A e Anti-B}'],
    },
  ],
},

{
  id: 'bio_c_21', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança ligada ao X — hemofilia',
  enunciado: 'A hemofilia A é uma herança recessiva ligada ao X. Uma mulher fenotipicamente normal, cujo irmão é hemofílico, casa-se com um homem normal. Qual a probabilidade de que o primeiro filho do casal seja hemofílico?',
  alternativas: {
    A: '0%',
    B: '12,5%',
    C: '25%',
    D: '50%',
    E: '100%'
  },
  gabarito: 'B',
  explicacao: 'O irmão hemofílico (XʰY) recebeu Xʰ da mãe dele — logo a mãe da mulher em questão é portadora (XʰX). A mulher tem 50% de chance de ser portadora. P(filho hemofílico) = P(mulher portadora) × P(filho do cruzamento ser XʰY) = 1/2 × 1/4 = 1/8 = 12,5%.',
  steps: [
    {
      titulo: 'Rastrear o alelo Xʰ na família',
      hint: 'Irmão hemofílico → de onde veio o Xʰ dele?',
      explicacao: 'O irmão é XʰY: recebeu Xʰ da mãe e Y do pai. Logo a mãe da mulher em questão é portadora (XʰX). O pai é normal (XY) e não transmite Xʰ.',
      linhas_latex: ['\\text{Avó materna: } X^hX \\text{ (portadora)}', '\\text{Irmão: } X^hY \\text{ (hemofílico)}'],
    },
    {
      titulo: 'Probabilidade da mulher ser portadora',
      hint: 'Ela é filha de XʰX × XY',
      explicacao: 'A mulher veio do cruzamento XʰX × XY. As filhas possíveis são XʰX (portadora) e XX (normal), cada uma com probabilidade 1/2. Como ela é fenotipicamente normal, pode ser qualquer uma delas.',
      linhas_latex: ['P(\\text{mulher portadora}) = \\frac{1}{2}'],
    },
    {
      titulo: 'P(filho hemofílico | mãe portadora)',
      hint: 'Cruzamento XʰX × XY gera XʰY com P = 1/4',
      explicacao: 'Se a mulher for portadora (XʰX) e o marido normal (XY), os filhos possíveis são: XʰX, XX, XʰY, XY. Probabilidade de XʰY = 1/4.',
      linhas_latex: ['X^hX \\times XY \\rightarrow X^hX : XX : X^hY : XY', 'P(X^hY) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular a probabilidade total',
      hint: 'Multiplicar as probabilidades encadeadas',
      explicacao: 'P = P(portadora) × P(filho XʰY | portadora) = 1/2 × 1/4 = 1/8. Ou equivalentemente: 1/2 (ter o alelo) × 1/2 (filho ser do sexo masculino) × 1/2 (transmitir o alelo) = 1/8.',
      linhas_latex: ['P = \\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8} = 12{,}5\\%'],
      destaque_latex: '\\boxed{12{,}5\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_22', tipo: 'C', nivel: 'intermediario',
  tema: 'Pleiotropia — Síndrome de Marfan',
  enunciado: 'A Síndrome de Marfan é causada por mutação no gene da fibrilina-1 (FBN1) e afeta simultaneamente o sistema esquelético (membros longos), cardiovascular (dilatação da aorta) e ocular (luxação do cristalino). Este padrão genético exemplifica:',
  alternativas: {
    A: 'Epistasia dominante',
    B: 'Herança quantitativa poligênica',
    C: 'Pleiotropia',
    D: 'Codominância',
    E: 'Penetrância incompleta'
  },
  gabarito: 'C',
  explicacao: 'Pleiotropia é quando um único gene (ou par de alelos) determina múltiplos efeitos fenotípicos distintos. Na Síndrome de Marfan, uma única mutação no gene FBN1 causa manifestações em vários sistemas orgânicos simultaneamente.',
  steps: [
    {
      titulo: 'Identificar o padrão genético',
      hint: 'Um gene → múltiplos efeitos fenotípicos',
      explicacao: 'A pleiotropia ocorre quando um único gene afeta múltiplas características fenotípicas. A mutação em FBN1 afeta todos os tecidos que dependem da fibrilina para integridade estrutural.',
      linhas_latex: ['\\text{Gene FBN1} \\rightarrow \\text{esquelético + cardiovascular + ocular}', '\\text{= Pleiotropia}'],
    },
  ],
},

{
  id: 'bio_c_23', tipo: 'C', nivel: 'avancado',
  tema: 'Linkage — mapa de 3 genes',
  enunciado: 'Três genes A, B e C estão no mesmo cromossomo. A distância A-B é 10 cM e B-C é 8 cM. Qual a ordem mais provável dos genes e a distância aproximada A-C?',
  alternativas: {
    A: 'A-B-C com distância A-C = 18 cM',
    B: 'A-C-B com distância A-B = 18 cM',
    C: 'B-A-C com distância B-C = 18 cM',
    D: 'A-B-C com distância A-C = 80 cM',
    E: 'C-A-B com distância C-B = 2 cM'
  },
  gabarito: 'A',
  explicacao: 'A ordem linear mais simples é A-B-C. A distância A-C ≈ A-B + B-C = 10 + 8 = 18 cM (assumindo interferência nula). Na prática, a distância real pode ser ligeiramente menor devido ao crossing over duplo.',
  steps: [
    {
      titulo: 'Entender aditividade das distâncias',
      hint: 'Distâncias genéticas são aproximadamente aditivas',
      explicacao: 'Se B está entre A e C, então a distância A-C ≈ A-B + B-C, desde que a interferência seja desprezível.',
      linhas_latex: ['d_{AC} \\approx d_{AB} + d_{BC} = 10 + 8 = 18 \\text{ cM}'],
    },
    {
      titulo: 'Determinar a ordem',
      hint: 'A ordem A-B-C é a mais simples',
      explicacao: 'Com A-B = 10 cM e B-C = 8 cM, a ordem A-B-C resulta em A-C = 18 cM, que é consistente com os dados.',
      linhas_latex: ['A \\overset{10 \\text{ cM}}{---} B \\overset{8 \\text{ cM}}{---} C', 'd_{AC} \\approx 18 \\text{ cM}'],
      destaque_latex: '\\boxed{A\\text{-}B\\text{-}C, \\; d_{AC} = 18 \\text{ cM}} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'bio_c_24', tipo: 'C', nivel: 'avancado',
  tema: 'Penetrância',
  enunciado: 'Um gene autossômico dominante causa uma síndrome em 80% dos indivíduos que possuem o alelo dominante (penetrância de 80%). Um casal, em que a mãe é heterozigótica Aa, tem um filho. Qual a probabilidade de que este filho manifeste a síndrome?',
  alternativas: {
    A: '10%',
    B: '20%',
    C: '40%',
    D: '50%',
    E: '80%'
  },
  gabarito: 'C',
  explicacao: 'P(filho herdar alelo A da mãe heterozigótica) = 1/2. P(manifestar dado que tem A) = 80% = 0,8. P(manifestar) = 1/2 × 0,8 = 0,4 = 40%.',
  steps: [
    {
      titulo: 'Calcular P(filho herdar alelo A)',
      hint: 'Mãe Aa: 50% de chance de passar A',
      explicacao: 'A mãe Aa produz gametas A e a com igual probabilidade. P(filho receber A) = 1/2.',
      linhas_latex: ['P(\\text{herdar } A) = \\frac{1}{2}'],
    },
    {
      titulo: 'Aplicar a penetrância',
      hint: 'Penetrância = P(manifestar | tem o alelo)',
      explicacao: 'Mesmo herdando o alelo A, o filho só manifesta a síndrome com probabilidade de 80%.',
      linhas_latex: ['P(\\text{manifestar} | \\text{tem } A) = 0{,}8'],
    },
    {
      titulo: 'Calcular probabilidade final',
      hint: 'Multiplicar as duas probabilidades',
      explicacao: 'Pela regra do produto para eventos dependentes em sequência:',
      linhas_latex: ['P = \\frac{1}{2} \\times 0{,}8 = 0{,}4 = 40\\%'],
      destaque_latex: '\\boxed{40\\%} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_25', tipo: 'C', nivel: 'avancado',
  tema: 'Herança ligada ao X — portadoras',
  enunciado: 'Uma mulher com visão normal cujo pai é daltônico casa-se com um homem de visão normal. Qual a probabilidade de que um filho (de qualquer sexo) deste casal seja portador do alelo daltônico sem manifestar a doença?',
  alternativas: {
    A: '0%',
    B: '25%',
    C: '50%',
    D: '75%',
    E: '100%'
  },
  gabarito: 'B',
  explicacao: 'A mãe é portadora (XᴰX). O pai é normal (XY). Filhos: XᴰX (portadora, não manifesta), XX (normal), XᴰY (daltônico, manifesta), XY (normal). Portador sem manifestar = apenas XᴰX = 1/4 = 25%.',
  steps: [
    {
      titulo: 'Definir "portador sem manifestar"',
      hint: 'Portador = tem o alelo mas não manifesta',
      explicacao: 'Para herança ligada ao X recessiva, apenas mulheres heterozigotas (XᴰX) são portadoras sem manifestar. Homens XᴰY manifestam a doença (hemizigóticos).',
      linhas_latex: ['X^dX \\rightarrow \\text{portadora (não manifesta)}', 'X^dY \\rightarrow \\text{daltônico (manifesta)}'],
    },
    {
      titulo: 'Calcular a descendência',
      hint: 'Cruzamento XᴰX × XY',
      explicacao: 'Dos 4 filhos possíveis: XᴰX (portadora), XX (normal), XᴰY (daltônico), XY (normal).',
      linhas_latex: ['X^dX \\times XY \\rightarrow X^dX : XX : X^dY : XY'],
    },
    {
      titulo: 'Identificar portadores sem manifestação',
      hint: 'Apenas XᴰX = 1/4',
      explicacao: 'Somente XᴰX (1 em 4 filhos) é portadora e não manifesta a doença.',
      linhas_latex: ['P(\\text{portador sem manifestar}) = \\frac{1}{4} = 25\\%'],
      destaque_latex: '\\boxed{25\\%} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'bio_c_26', tipo: 'C', nivel: 'basico',
  tema: 'Conceito de pleiotropia',
  enunciado: 'Do ponto de vista genético, a pleiotropia manifesta-se quando:',
  alternativas: {
    A: 'Dois genes diferentes determinam o mesmo fenótipo',
    B: 'Um único par de alelos determina, simultaneamente, múltiplas alterações fenotípicas distintas no indivíduo',
    C: 'Alelos de genes diferentes se somam para produzir um fenótipo intermediário',
    D: 'Um gene mascara a expressão de outro gene não alélico',
    E: 'Um gene está localizado no cromossomo sexual X'
  },
  gabarito: 'B',
  explicacao: 'Pleiotropia é o fenômeno pelo qual um único gene (ou par de alelos) causa múltiplos efeitos fenotípicos distintos no mesmo indivíduo. É diferente de epistasia (mascaramento entre genes) e de herança poligênica (vários genes para um fenótipo).',
  steps: [
    {
      titulo: 'Diferenciar pleiotropia dos outros conceitos',
      hint: 'Um gene → muitos fenótipos',
      explicacao: 'Na pleiotropia: 1 gene → múltiplos fenótipos. Na epistasia: 1 gene mascara outro. Na herança poligênica: múltiplos genes → 1 fenótipo contínuo.',
      linhas_latex: ['\\text{Pleiotropia: } 1 \\text{ gene} \\rightarrow \\text{múltiplos fenótipos}'],
      destaque_latex: '\\boxed{\\text{Alternativa B}}',
    },
  ],
},

{
  id: 'bio_c_27', tipo: 'C', nivel: 'intermediario',
  tema: 'Herança ligada ao X — transmissão',
  enunciado: 'Um homem portador de daltonismo (XᴰY) tem filhos com uma mulher de visão normal não portadora (XX). Qual afirmação sobre os filhos é correta?',
  alternativas: {
    A: 'Todos os filhos serão daltônicos',
    B: 'Todas as filhas serão portadoras e nenhum filho será daltônico',
    C: 'Metade das filhas será daltônica',
    D: '50% dos filhos de ambos os sexos serão daltônicos',
    E: 'Nenhum filho será afetado'
  },
  gabarito: 'B',
  explicacao: 'O pai XᴰY passa Xᴰ para todas as filhas (que recebem X da mãe normal), tornando-as portadoras (XᴰX). O pai passa Y para todos os filhos, que recebem X normal da mãe (XY) — nenhum filho será daltônico.',
  steps: [
    {
      titulo: 'Analisar transmissão do pai',
      hint: 'Pai XᴰY: Xᴰ vai para filhas, Y vai para filhos',
      explicacao: 'O pai daltônico (XᴰY) transmite seu Xᴰ para 100% das filhas e seu Y para 100% dos filhos.',
      linhas_latex: ['\\text{Pai } X^dY: \\text{ filhas recebem } X^d, \\text{ filhos recebem } Y'],
    },
    {
      titulo: 'Analisar transmissão da mãe',
      hint: 'Mãe XX: passa X normal para todos',
      explicacao: 'A mãe não portadora (XX) passa apenas X normal para todos os filhos.',
      linhas_latex: ['\\text{Mãe } XX: \\text{ todos os filhos recebem } X'],
    },
    {
      titulo: 'Concluir sobre a descendência',
      hint: 'Filhas = XᴰX; Filhos = XY',
      explicacao: 'Todas as filhas são portadoras (XᴰX). Todos os filhos são normais (XY).',
      linhas_latex: ['\\text{Filhas: } X^dX \\text{ (portadoras)}', '\\text{Filhos: } XY \\text{ (normais)}'],
      destaque_latex: '\\boxed{\\text{Alternativa B}}',
    },
  ],
},

{
  id: 'bio_c_28', tipo: 'C', nivel: 'avancado',
  tema: 'Crossing over duplo e interferência',
  enunciado: 'Em um experimento de mapeamento genético, a frequência de crossing over simples entre os genes A-B foi de 15% e entre B-C foi de 10%. Se a interferência for de 50%, qual será a frequência observada de recombinantes A-C (duplo crossing over)?',
  alternativas: {
    A: '0,75%',
    B: '1,5%',
    C: '2,25%',
    D: '3%',
    E: '25%'
  },
  gabarito: 'A',
  explicacao: 'Frequência esperada de duplo CO = 0,15 × 0,10 = 0,015 = 1,5%. Com interferência de 50%, a frequência observada = 1,5% × (1 − 0,5) = 1,5% × 0,5 = 0,75%.',
  steps: [
    {
      titulo: 'Calcular frequência esperada de duplo CO',
      hint: 'Produto das duas frequências simples',
      explicacao: 'A frequência esperada de dois eventos independentes é o produto de suas frequências.',
      linhas_latex: ['f_{duplo} = 0{,}15 \\times 0{,}10 = 0{,}015 = 1{,}5\\%'],
    },
    {
      titulo: 'Aplicar a interferência',
      hint: 'Interferência = 1 − coeficiente de coincidência',
      explicacao: 'A interferência de 50% significa que o duplo CO ocorre apenas 50% do esperado.',
      linhas_latex: ['I = 0{,}50 \\Rightarrow \\text{CC} = 1 - 0{,}50 = 0{,}50', 'f_{observado} = f_{esperado} \\times CC = 1{,}5\\% \\times 0{,}5 = 0{,}75\\%'],
      destaque_latex: '\\boxed{0{,}75\\%} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'bio_c_29', tipo: 'C', nivel: 'avancado',
  tema: 'ABO + Fator Rh — diibrido',
  enunciado: 'Um casal busca aconselhamento genético. Ambos têm tipo sanguíneo A heterozigótico (Iᴬi) e Fator Rh positivo heterozigótico (Rr). Qual a probabilidade de terem um filho com tipo sanguíneo O e Rh negativo?',
  alternativas: {
    A: '1/4',
    B: '1/8',
    C: '1/16',
    D: '3/16',
    E: '9/16'
  },
  gabarito: 'C',
  explicacao: 'P(tipo O) = P(ii) do cruzamento Iᴬi × Iᴬi = 1/4. P(Rh−) = P(rr) do cruzamento Rr × Rr = 1/4. P = 1/4 × 1/4 = 1/16.',
  steps: [
    {
      titulo: 'Calcular P(tipo O)',
      hint: 'Cruzamento Iᴬi × Iᴬi → P(ii)',
      explicacao: 'Do cruzamento Iᴬi × Iᴬi, os genótipos possíveis são IᴬIᴬ (1/4), Iᴬi (2/4), ii (1/4). Tipo O = ii.',
      linhas_latex: ['P(ii) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular P(Rh negativo)',
      hint: 'Cruzamento Rr × Rr → P(rr)',
      explicacao: 'Do cruzamento Rr × Rr: RR (1/4), Rr (2/4), rr (1/4). Rh− = rr.',
      linhas_latex: ['P(rr) = \\frac{1}{4}'],
    },
    {
      titulo: 'Calcular probabilidade conjunta',
      hint: 'Loci independentes',
      explicacao: 'Os loci ABO e Rh estão em cromossomos diferentes — segregação independente.',
      linhas_latex: ['P(\\text{O Rh}^-) = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}'],
      destaque_latex: '\\boxed{\\frac{1}{16}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'bio_c_30', tipo: 'C', nivel: 'avancado',
  tema: 'Hemizigose — daltonismo masculino',
  enunciado: 'O daltonismo é determinado por um alelo recessivo ligado exclusivamente à porção não homóloga do cromossomo X. Por que homens manifestam daltonismo com maior frequência que mulheres?',
  alternativas: {
    A: 'Porque homens possuem dois cromossomos X e maior exposição ao alelo',
    B: 'Porque homens são hemizigóticos para os genes do X, necessitando apenas de uma cópia do alelo recessivo para expressar o fenótipo',
    C: 'Porque o alelo daltônico é dominante em homens',
    D: 'Porque mulheres possuem anticorpos contra o alelo daltônico',
    E: 'Porque o gene do daltonismo está no cromossomo Y nos homens'
  },
  gabarito: 'B',
  explicacao: 'Homens (XY) possuem apenas um cromossomo X — são hemizigóticos para os genes ligados ao X. Portanto, uma única cópia do alelo recessivo (Xᴰ) é suficiente para expressar o daltonismo. Mulheres precisam de duas cópias (XᴰXᴰ) para manifestar.',
  steps: [
    {
      titulo: 'Entender a hemizigose',
      hint: 'Homem: XY — apenas 1 cromossomo X',
      explicacao: 'Como homens possuem apenas um cromossomo X, qualquer alelo neste X (dominante ou recessivo) será expresso fenotipicamente, pois não há segundo alelo para mascarar.',
      linhas_latex: ['\\text{Homem: } X^dY \\rightarrow \\text{daltônico (hemizigótico)}', '\\text{Mulher: } X^dX \\rightarrow \\text{portadora (heterozigótica)}'],
      destaque_latex: '\\boxed{\\text{Alternativa B — hemizigose}}',
    },
  ],
},

// ════════════════════════════════════════════════════════════
// TIPO A — CERTO / ERRADO (10 questões)
// ════════════════════════════════════════════════════════════

{
  id: 'bio_a_01', tipo: 'A', nivel: 'basico',
  tema: 'Herança ligada ao X',
  enunciado: 'Um homem com daltonismo (XᴰY) transmite obrigatoriamente o alelo Xᴰ para todos os seus filhos biológicos do sexo masculino.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O homem XᴰY transmite o cromossomo Y para todos os filhos do sexo masculino e o cromossomo Xᴰ para todas as filhas. Filhos do sexo masculino recebem o Y paterno e o X materno — nunca o Xᴰ do pai. A pegadinha: confundir filho (recebe Y do pai) com filha (recebe X do pai).',
},

{
  id: 'bio_a_02', tipo: 'A', nivel: 'basico',
  tema: 'Pleiotropia',
  enunciado: 'A pleiotropia é um fenômeno genético que envolve dois genes não alélicos, onde um deles inibe ou mascara a expressão do outro.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. A pleiotropia envolve UM único gene causando múltiplos efeitos fenotípicos. O conceito descrito na afirmativa — um gene mascarando outro — é a definição de EPISTASIA, não de pleiotropia. A pegadinha é a confusão entre pleiotropia (1 gene → vários fenótipos) e epistasia (interação entre genes diferentes).',
},

{
  id: 'bio_a_03', tipo: 'A', nivel: 'basico',
  tema: 'Codominância — Sistema ABO',
  enunciado: 'O indivíduo com tipo sanguíneo AB, por apresentar codominância entre os alelos Iᴬ e Iᴮ, pode ser considerado receptor universal no sistema ABO, pois não possui aglutininas Anti-A e Anti-B em seu plasma.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. O indivíduo AB (IᴬIᴮ) expressa ambos os antígenos A e B por codominância, e justamente por isso não produz Anti-A nem Anti-B (tolerância imunológica). Pode receber sangue de qualquer tipo sem reação, sendo o receptor universal no sistema ABO.',
},

{
  id: 'bio_a_04', tipo: 'A', nivel: 'basico',
  tema: 'Epistasia',
  enunciado: 'A epistasia é um fenômeno de interação gênica alélica, no qual os alelos de um mesmo locus interferem entre si para determinar o fenótipo final do organismo.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. A epistasia é uma interação gênica NÃO ALÉLICA — ocorre entre genes de loci diferentes. A interferência entre alelos do mesmo locus é chamada de dominância (completa, incompleta ou codominância). A pegadinha é a palavra "alélica", que inverte o conceito.',
},

{
  id: 'bio_a_05', tipo: 'A', nivel: 'intermediario',
  tema: 'Doença hemolítica do RN',
  enunciado: 'A incompatibilidade Rh que leva à doença hemolítica pode ocorrer quando uma mulher de genótipo homozigótico recessivo para o fator Rh (rr) gera um descendente cujo genótipo contém pelo menos um alelo dominante (R_).',
  gabarito: 'CERTO',
  explicacao: 'CERTO. A DHRN ocorre quando a mãe Rh− (rr) é sensibilizada por hemácias Rh+ do feto (R_). O pai deve ser Rr ou RR para que o filho seja Rh+. A afirmativa está correta: a condição necessária é mãe rr e filho R_ (pelo menos um R).',
},

{
  id: 'bio_a_06', tipo: 'A', nivel: 'intermediario',
  tema: 'Linkage — recombinação',
  enunciado: 'Genes localizados no mesmo cromossomo (ligados) sempre segregam juntos em arranjo fixo absoluto, o que impede totalmente a ocorrência de recombinação gênica durante a formação dos gametas.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Genes ligados tendem a segregar juntos, mas o crossing over (troca de segmentos entre cromátides homólogas durante a meiose) pode separar alelos que estavam no mesmo cromossomo, gerando gametas recombinantes. A frequência de recombinação é proporcional à distância entre os genes. A pegadinha é o "impede totalmente".',
},

{
  id: 'bio_a_07', tipo: 'A', nivel: 'intermediario',
  tema: 'Transgenia',
  enunciado: 'O desenvolvimento de variedades de cana-de-açúcar com maior resistência ao estresse hídrico, obtido por meio da inserção e expressão de genes exógenos de outras espécies no genoma da planta original, exemplifica a técnica genética de transgenia.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Transgenia é exatamente a inserção de genes de uma espécie no genoma de outra. O organismo resultante é chamado de transgênico ou OGM. A inserção de genes de resistência ao estresse hídrico de outras espécies na cana é um exemplo clássico desta biotecnologia.',
},

{
  id: 'bio_a_08', tipo: 'A', nivel: 'intermediario',
  tema: 'Anemia falciforme — heterozigótico',
  enunciado: 'Um indivíduo heterozigótico para a anemia falciforme (Aa) manifesta a doença com a mesma intensidade que um homozigótico recessivo (aa), pois o alelo mutante é dominante sobre o normal.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. A anemia falciforme tem herança autossômica recessiva. O heterozigótico (Aa) é portador do traço falciforme — geralmente assintomático em condições normais e apresenta hemoglobinas S e A. Apenas o homozigótico (aa), com apenas hemoglobina S, manifesta a doença clínica completa. O alelo mutante NÃO é dominante.',
},

{
  id: 'bio_a_09', tipo: 'A', nivel: 'avancado',
  tema: 'Pleiotropia letal — proporção alterada',
  enunciado: 'Se um alelo recessivo i apresentar efeito pleiotrópico com letalidade embrionária em homozigose (ii), o cruzamento Iᴬi × Iᴮi produzirá descendência viável com proporção fenotípica AB:A:B = 1:1:1, estando ausente o fenótipo O.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Do cruzamento Iᴬi × Iᴮi originam-se: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O). Com a letalidade do genótipo ii, o fenótipo O é eliminado da descendência viável. Os três fenótipos restantes (AB, A, B) ocorrem em proporção 1:1:1.',
},

{
  id: 'bio_a_10', tipo: 'A', nivel: 'avancado',
  tema: 'Herança quantitativa vs. epistasia',
  enunciado: 'Na herança quantitativa (poligênica), diferentemente do modelo epistático, não existem genes mascaradores, mas sim alelos aditivos que contribuem cumulativamente para a expressão do fenótipo, resultando em variação fenotípica contínua na população.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Na herança quantitativa, múltiplos loci contribuem com alelos aditivos — cada alelo dominante adiciona uma "dose" ao fenótipo. Não há mascaramento (epistasia). O resultado é uma distribuição contínua de fenótipos na população (curva normal), diferente dos fenótipos discretos da epistasia.',
},

]; // fim QUESTOES_BIO
