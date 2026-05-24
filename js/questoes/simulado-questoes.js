// ============================================================
// CN PORTAL MARISTA — SIMULADO
// Simulado interdisciplinar em 8 textos-base
// Explicações com MathJax \[...\] profissional
// ============================================================

const QUESTOES_SIMULADO = [

// ════════════════════════════════════════════════════════════
// TEXTO I — Desfibriladores Automáticos (DAE)
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t1_01', texto_base: 1, tipo: 'C', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Energia armazenada no capacitor do DAE',
  texto_contexto: `Um desfibrilador automático externo (DAE) hospitalar armazena 150 J de energia em um capacitor com tensão de descarga de 1500 V e libera essa energia em um pulso de 10 ms. O coração humano é controlado por impulsos elétricos gerados no nó sinoatrial. Mutações em genes de canais iônicos cardíacos causam arritmias hereditárias autossômicas dominantes. O gel condutor dos eletrodos contém íons Na⁺ em solução aquosa.`,
  enunciado: 'Sabendo que a energia armazenada em um capacitor é \\(E = \\frac{1}{2}QV\\), qual é a carga elétrica armazenada no capacitor do DAE?',
  alternativas: { A:'0,1 C', B:'0,2 C', C:'1,0 C', D:'2,0 C', E:'10 C' },
  gabarito: 'B',
  explicacao: 'Isolando \\(Q\\) da expressão \\(E = \\frac{1}{2}QV\\): \\[Q = \\frac{2E}{V} = \\frac{2\\times150\\,\\text{J}}{1500\\,\\text{V}} = \\frac{300}{1500} = 0{,}2\\,\\text{C}\\]',
},

{
  id: 'sim_t1_02', texto_base: 1, tipo: 'A', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Potência média do pulso do DAE',
  enunciado: 'A energia de 150 J liberada em 10 ms pelo DAE corresponde a uma potência média de 15000 W durante o pulso.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Por definição de potência média: \\[P = \\frac{E}{\\Delta t} = \\frac{150\\,\\text{J}}{10\\times10^{-3}\\,\\text{s}} = \\frac{150}{0{,}01} = 15000\\,\\text{W} = 15\\,\\text{kW}\\] Essa alta potência em curtíssimo tempo é o que "reinicia" o ritmo cardíaco.',
},

{
  id: 'sim_t1_03', texto_base: 1, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Arritmia hereditária — padrão autossômico dominante',
  enunciado: 'Uma síndrome arrítmica autossômica dominante transmitida por pai heterozigótico (Aa) afeta exatamente 50% dos filhos, independentemente do sexo.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Cruzamento \\(Aa \\times aa\\): \\[\\text{Filhos: } Aa\\,(50\\%,\\,\\text{afetados}) \\;\\text{e}\\; aa\\,(50\\%,\\,\\text{normais})\\] Como o gene está em autossomo (não no X ou Y), a proporção é igual para ambos os sexos.',
},

{
  id: 'sim_t1_04', texto_base: 1, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim','fis'],
  tema: 'Moles de Na⁺ transportados — gel condutor',
  enunciado: 'Durante o teste do DAE, uma carga de 0,2 C passa pela solução iônica do gel. Quantos mol de Na⁺ (\\(z=+1\\)) são transportados? (\\(F = 96500\\,\\text{C/mol}\\))',
  alternativas: { A:'2,07×10⁻⁶ mol', B:'2,07×10⁻³ mol', C:'0,2 mol', D:'9,65×10³ mol', E:'4,83×10⁻⁴ mol' },
  gabarito: 'A',
  explicacao: 'Para \\(z=1\\), a relação de Faraday é direta: \\[n = \\frac{Q}{z\\cdot F} = \\frac{0{,}2}{1\\times96500} = 2{,}07\\times10^{-6}\\,\\text{mol}\\]',
},

{
  id: 'sim_t1_05', texto_base: 1, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Tampão bicarbonato e acidose por fibrilação',
  enunciado: 'O estresse metabólico durante fibrilação ventricular aumenta o ácido lático, deslocando o equilíbrio \\(\\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-\\) para a direita e diminuindo o pH sanguíneo.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. O ácido lático libera \\(\\text{H}^+\\). O tampão reage: \\(\\text{HCO}_3^- + \\text{H}^+ \\to \\text{H}_2\\text{CO}_3\\). Quando a carga ácida supera a capacidade tamponante, a concentração \\([\\text{H}^+]\\) aumenta e, como \\(\\text{pH} = -\\log[\\text{H}^+]\\), o pH diminui — caracterizando acidose metabólica.',
},

// ════════════════════════════════════════════════════════════
// TEXTO II — Eletroforese de DNA e Anemia Falciforme
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t2_01', texto_base: 2, tipo: 'C', nivel: 'basico',
  disciplinas: ['bio','fis'],
  tema: 'Migração do DNA na eletroforese',
  texto_contexto: `A eletroforese em gel de agarose separa fragmentos de DNA por tamanho utilizando campo elétrico. Os fragmentos migram em direção ao ânodo pois o DNA é carregado negativamente (grupos fosfato, PO₄³⁻). O gel opera com 100 mA e resistência de 100 Ω. Na anemia falciforme, a substituição A→T no códon 6 da β-globina (GAG→GTG) troca ácido glutâmico por valina, criando padrão diagnóstico por eletroforese.`,
  enunciado: 'O DNA migra para o ânodo na eletroforese porque:',
  alternativas: {
    A: 'DNA é positivo e sofre oxidação no ânodo',
    B: 'DNA é negativamente carregado e é atraído pelo polo positivo',
    C: 'DNA é neutro e migra por difusão',
    D: 'DNA sofre redução no ânodo',
    E: 'DNA é repelido pelo cátodo exclusivamente'
  },
  gabarito: 'B',
  explicacao: 'Os grupos fosfato (\\(\\text{PO}_4^{3-}\\)) conferem carga negativa ao DNA. Pela lei de Coulomb, cargas opostas se atraem: \\[\\vec{F} = q\\vec{E} \\implies \\text{carga}\\, (-) \\to \\text{polo}\\, (+)\\,\\text{(ânodo)}\\] A migração para o ânodo é consequência direta da eletrostática básica.',
},

{
  id: 'sim_t2_02', texto_base: 2, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Potência dissipada no gel de eletroforese',
  enunciado: 'Com corrente de 100 mA e resistência do gel de 100 Ω, qual é a potência dissipada?',
  alternativas: { A:'0,1 W', B:'1,0 W', C:'10 W', D:'100 W', E:'0,01 W' },
  gabarito: 'B',
  explicacao: 'Usando \\(P = I^2R\\) com \\(I = 100\\,\\text{mA} = 0{,}1\\,\\text{A}\\): \\[P = (0{,}1)^2\\times100 = 0{,}01\\times100 = 1{,}0\\,\\text{W}\\]',
},

{
  id: 'sim_t2_03', texto_base: 2, tipo: 'A', nivel: 'basico',
  disciplinas: ['bio'],
  tema: 'Mutação da anemia falciforme — troca de aminoácido',
  enunciado: 'A anemia falciforme é causada pela substituição do ácido glutâmico por valina na posição 6 da β-globina, decorrente da mutação A→T no códon 6 (GAG→GTG).',
  gabarito: 'CERTO',
  explicacao: 'CERTO. A mutação de ponto \\(\\text{A}\\to\\text{T}\\) no sexto códon da \\(\\beta\\)-globina transforma GAG (ácido glutâmico, hidrofílico, carga −) em GTG (valina, hidrofóbico, neutro). Essa troca de polaridade permite a polimerização da HbS em baixa oxigenação, causando a falcização das hemácias.',
},

{
  id: 'sim_t2_04', texto_base: 2, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Pleiotropia na anemia falciforme',
  enunciado: 'A anemia falciforme exemplifica pleiotropia pois a única mutação em HbS produz simultaneamente anemia hemolítica, crises vaso-oclusivas, comprometimento renal e resistência à malária em heterozigotos.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Pleiotropia: 1 gene → múltiplos fenótipos. A cadeia HbS polimeriza em hipóxia → falcização → hemólise → anemia; oclusão microvascular → isquemia em rins, baço, SNC. Em heterozigotos (HbAS), a mistura de HbA e HbS inibe o crescimento do \\(Plasmodium\\) — vantagem seletiva em áreas endêmicas de malária.',
},

{
  id: 'sim_t2_05', texto_base: 2, tipo: 'C', nivel: 'avancado',
  disciplinas: ['bio'],
  tema: 'Probabilidade — aa feminino',
  enunciado: 'Casal ambos portadores (Aa) busca diagnóstico pré-natal. Qual a probabilidade de o feto ter anemia falciforme (aa) E ser do sexo feminino?',
  alternativas: { A:'1/8', B:'1/4', C:'1/2', D:'3/4', E:'1/16' },
  gabarito: 'A',
  explicacao: 'Os dois loci segregam independentemente: \\[P(aa) = \\frac{1}{4}\\quad\\text{(Aa}\\times\\text{Aa)}\\] \\[P(\\text{feminino}) = \\frac{1}{2}\\] \\[P(aa\\;\\text{e feminino}) = \\frac{1}{4}\\times\\frac{1}{2} = \\frac{1}{8}\\]',
},

// ════════════════════════════════════════════════════════════
// TEXTO III — Baterias de Estado Sólido
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t3_01', texto_base: 3, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim','fis'],
  tema: 'Energia armazenada — bateria de estado sólido',
  texto_contexto: `As baterias de estado sólido (SSB) usam eletrólito sólido em vez de líquido, permitindo maior densidade energética. Um protótipo tem: tensão nominal 4,0 V, capacidade 200 Ah, ânodo de lítio metálico (Li → Li⁺ + e⁻). Durante recarga: 50 A por 4 horas. Dados: M(Li) = 7 g/mol; F = 96500 C/mol.`,
  enunciado: 'Qual é a energia total armazenada nessa bateria? Expresse em Wh e kJ.',
  alternativas: { A:'200 Wh', B:'800 Wh', C:'2880 kJ', D:'800 Wh e 2880 kJ — ambas corretas', E:'400 Wh' },
  gabarito: 'D',
  explicacao: '\\[E = V\\cdot Q = 4{,}0\\,\\text{V}\\times200\\,\\text{Ah} = 800\\,\\text{Wh}\\] Convertendo: \\[E = 800\\,\\text{Wh}\\times3600\\,\\frac{\\text{J}}{\\text{Wh}} = 2{,}88\\times10^6\\,\\text{J} = 2880\\,\\text{kJ}\\] Ambas as representações estão corretas.',
},

{
  id: 'sim_t3_02', texto_base: 3, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Lei de Faraday — recarga de lítio',
  enunciado: 'Durante a recarga (50 A por 4 h), qual é a massa de Li restituída no ânodo?',
  alternativas: { A:'13,06 g', B:'26,11 g', C:'52,23 g', D:'104,46 g', E:'7,00 g' },
  gabarito: 'C',
  explicacao: '\\[Q = I\\cdot t = 50\\times(4\\times3600) = 50\\times14400 = 720000\\,\\text{C}\\] \\[n(e^-) = \\frac{Q}{F} = \\frac{720000}{96500} \\approx 7{,}461\\,\\text{mol}\\] Como \\(\\text{Li}^++e^-\\to\\text{Li}\\) (1 elétron por átomo): \\[n(\\text{Li}) = 7{,}461\\,\\text{mol}\\] \\[m = 7{,}461\\times7{,}0 \\approx 52{,}2\\,\\text{g}\\]',
},

{
  id: 'sim_t3_03', texto_base: 3, tipo: 'A', nivel: 'basico',
  disciplinas: ['quim'],
  tema: 'Ânodo e descarga da bateria',
  enunciado: 'Durante a descarga, o lítio metálico no ânodo sofre oxidação (Li → Li⁺ + e⁻) e os elétrons fluem pelo circuito externo em direção ao cátodo.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Na célula galvânica (descarga): ânodo = oxidação. \\[\\text{Ânodo: }\\text{Li}_{(s)}\\to\\text{Li}^+_{(aq)}+e^-\\quad(\\text{oxidação})\\] Os elétrons liberados percorrem o circuito externo do ânodo (−) ao cátodo (+), onde reduzem o material catódico.',
},

{
  id: 'sim_t3_04', texto_base: 3, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Potência durante recarga',
  enunciado: 'A recarga com 50 A e 4,0 V fornece 200 W de potência elétrica ao sistema.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. \\[P = V\\cdot I = 4{,}0\\,\\text{V}\\times50\\,\\text{A} = 200\\,\\text{W}\\] É a potência fornecida pelo carregador ao sistema eletroquímico durante a recarga.',
},

{
  id: 'sim_t3_05', texto_base: 3, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim','fis'],
  tema: 'Custo de carga completa',
  enunciado: 'Uma estação cobra R$1,20/kWh. Qual é o custo para carregar completamente a bateria de 800 Wh?',
  alternativas: { A:'R$0,096', B:'R$0,96', C:'R$9,60', D:'R$96,00', E:'R$1,20' },
  gabarito: 'B',
  explicacao: '\\[E = 800\\,\\text{Wh} = 0{,}8\\,\\text{kWh}\\] \\[\\text{Custo} = 0{,}8\\,\\text{kWh}\\times R\\$\\,1{,}20/\\text{kWh} = R\\$\\,0{,}96\\]',
},

// ════════════════════════════════════════════════════════════
// TEXTO IV — Biorreator e Cinética Enzimática
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t4_01', texto_base: 4, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['bio','quim'],
  tema: 'Transgenia — inserção do gene cel7A',
  texto_contexto: `Um biorreator usa leveduras transgênicas com o gene cel7A de Trichoderma reesei para hidrolisar celulose e produzir bioetanol. Dados da reação de hidrólise: ΔH = −50 kJ/mol; Ea (sem enzima) = 180 kJ/mol; Ea (com celulase) = 40 kJ/mol. Equilíbrio de fermentação: Glicose ⇌ Etanol + CO₂, Kc = 4,0 (reator de 1,0 L; C₀(glicose) = 3,0 mol/L; no equilíbrio: [glicose] = 1,0 mol/L).`,
  enunciado: 'A inserção do gene cel7A de T. reesei no genoma da levedura é um exemplo de:',
  alternativas: {
    A: 'Mutação induzida por radiação',
    B: 'Hibridização somática',
    C: 'Transgenia — produção de OGM',
    D: 'Clonagem reprodutiva',
    E: 'Poliploidia induzida'
  },
  gabarito: 'C',
  explicacao: 'Transgenia é a inserção de gene exógeno (de outra espécie) no genoma hospedeiro. A levedura resultante é um OGM. Formalmente: \\[\\text{gene}\\;(T.\\,reesei) \\xrightarrow{\\text{vetor}} \\text{genoma}\\;(\\text{levedura}) \\to \\text{OGM}\\]',
},

{
  id: 'sim_t4_02', texto_base: 4, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Redução da energia de ativação pela celulase',
  elementos_visuais: [{
    tipo: 'grafico_energia',
    titulo: 'Perfil energético com ação enzimática',
    reagentes: 0,
    estado_transicao: 180,
    produtos: -50,
    com_catalisador: 40,
    label_ea: 'Ea sem enzima = 180 kJ/mol',
    label_dh: 'ΔH = -50 kJ/mol',
  }],
  enunciado: 'Qual é a redução da energia de ativação proporcionada pela enzima celulase?',
  alternativas: { A:'40 kJ/mol', B:'50 kJ/mol', C:'140 kJ/mol', D:'180 kJ/mol', E:'220 kJ/mol' },
  gabarito: 'C',
  explicacao: '\\[\\Delta E_a = E_a(\\text{sem})-E_a(\\text{com}) = 180-40 = 140\\,\\text{kJ/mol}\\] A celulase fornece uma via alternativa de menor barreira energética, reduzindo em 140 kJ/mol a quantidade de energia necessária para iniciar a reação.',
},

{
  id: 'sim_t4_03', texto_base: 4, tipo: 'A', nivel: 'basico',
  disciplinas: ['quim'],
  tema: 'Catalisador não altera ΔH',
  enunciado: 'A celulase ao reduzir Ea de 180 para 40 kJ/mol altera também o ΔH da reação para um valor menos negativo.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O catalisador fornece uma via alternativa, mas os estados inicial (reagentes) e final (produtos) permanecem inalterados. Portanto: \\[\\Delta H = H_{\\text{produtos}}-H_{\\text{reagentes}} = -50\\,\\text{kJ/mol}\\] (inalterado pela catálise). O \\(\\Delta H\\) é uma função de estado — independe do caminho percorrido.',
},

{
  id: 'sim_t4_04', texto_base: 4, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim'],
  tema: 'Kc — fermentação no biorreator',
  enunciado: 'Para Glicose ⇌ Etanol + CO₂ em 1,0 L: \\(C_0(\\text{glicose})=3{,}0\\,\\text{mol/L}\\); no equilíbrio \\([\\text{glicose}]=1{,}0\\,\\text{mol/L}\\). Qual é o valor de Kc calculado?',
  alternativas: { A:'2,0', B:'4,0', C:'8,0', D:'16,0', E:'0,5' },
  gabarito: 'B',
  explicacao: 'Variação: \\(\\Delta[\\text{glicose}] = 3{,}0-1{,}0 = 2{,}0\\,\\text{mol/L}\\) consumido. No equilíbrio: \\[[\\text{etanol}]=[\\text{CO}_2]=2{,}0\\,\\text{mol/L}\\] \\[K_c = \\frac{[\\text{etanol}][\\text{CO}_2]}{[\\text{glicose}]} = \\frac{2{,}0\\times2{,}0}{1{,}0} = 4{,}0\\]',
},

{
  id: 'sim_t4_05', texto_base: 4, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Transmissão do gene transgênico na mitose',
  enunciado: 'Uma levedura com o gene cel7A integrado no genoma transmite esse gene a 100% das células-filhas na reprodução assexuada por brotamento.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Na reprodução assexuada, ocorre mitose — cada célula-filha recebe cópia idêntica do genoma materno, incluindo o transgene integrado. A transmissão é \\(100\\%\\) (diferente da reprodução sexual, onde apenas metade dos gametas carregariam o gene).',
},

// ════════════════════════════════════════════════════════════
// TEXTO V — Aquecimento Global e Equilíbrio Oceânico
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t5_01', texto_base: 5, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Le Chatelier — dissolução exotérmica do CO₂',
  texto_contexto: `O CO₂ atmosférico dissolve-se nos oceanos: CO₂(g) + H₂O(l) ⇌ H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq). A dissolução é exotérmica (ΔH < 0). O aumento da temperatura oceânica reduz a solubilidade do CO₂. Populações de corais têm resistência ao branqueamento controlada por herança poligênica aditiva (loci A, B, C independentes): corais AABBCC suportam 3°C a mais que aabbcc.`,
  enunciado: 'Para \\(\\text{CO}_2(g)+\\text{H}_2\\text{O}(l)\\rightleftharpoons\\text{H}_2\\text{CO}_3(aq)\\) (\\(\\Delta H<0\\)), o aumento da temperatura oceânica desloca o equilíbrio para ___ e o pH ___.',
  alternativas: {
    A: 'direita; diminui',
    B: 'esquerda; aumenta',
    C: 'esquerda; diminui',
    D: 'não desloca; constante',
    E: 'direita; aumenta'
  },
  gabarito: 'B',
  explicacao: 'Reação exotérmica: o calor é "produto". Pelo princípio de Le Chatelier, aumentar \\(T\\) equivale a adicionar um produto → equilíbrio desloca para **esquerda**, liberando CO₂. Com menos \\(\\text{H}_2\\text{CO}_3\\), produz-se menos \\(\\text{H}^+\\) → \\(\\text{pH}\\) **aumenta**. Adicionalmente, \\(K_c\\) diminui pois a reação exotérmica tem \\(K_c\\) inversamente relacionado com \\(T\\).',
},

{
  id: 'sim_t5_02', texto_base: 5, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Kc diminui com T para reação exotérmica',
  enunciado: 'Para a dissolução exotérmica do CO₂, o aumento de temperatura diminui o valor de Kc.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Para reações exotérmicas (\\(\\Delta H < 0\\)), a relação de van\'t Hoff mostra que: \\[\\frac{d\\ln K_c}{dT} = \\frac{\\Delta H}{RT^2} < 0\\] Logo, \\(K_c\\) **diminui** com o aumento de \\(T\\). O deslocamento para a esquerda reduz [produtos] e aumenta [reagentes], diminuindo o numerador e aumentando o denominador de \\(K_c\\).',
},

{
  id: 'sim_t5_03', texto_base: 5, tipo: 'C', nivel: 'basico',
  disciplinas: ['bio'],
  tema: 'Herança poligênica — genótipo AABBCC',
  enunciado: 'Qual proporção de filhos de AaBbCc × AaBbCc terá genótipo AABBCC (máxima resistência)?',
  alternativas: { A:'27/64', B:'1/64', C:'9/64', D:'3/64', E:'1/8' },
  gabarito: 'B',
  explicacao: 'Para três loci independentes, a probabilidade de homozigose dominante em cada um é \\(1/4\\): \\[P(AA) = \\frac{1}{4}, \\quad P(BB) = \\frac{1}{4}, \\quad P(CC) = \\frac{1}{4}\\] \\[P(AABBCC) = \\frac{1}{4}\\times\\frac{1}{4}\\times\\frac{1}{4} = \\frac{1}{64}\\]',
},

{
  id: 'sim_t5_04', texto_base: 5, tipo: 'A', nivel: 'basico',
  disciplinas: ['bio'],
  tema: 'Herança poligênica vs. epistasia',
  enunciado: 'A resistência ao branqueamento em corais, controlada por múltiplos genes com efeito aditivo, é herança poligênica — não epistasia.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Na **herança poligênica**: múltiplos loci contribuem aditivamente para o fenótipo sem mascarar uns aos outros — resultado: variação contínua. Na **epistasia**: um gene interfere (mascara) a expressão de outro. Como cada alelo de resistência acrescenta uma "dose" ao fenótipo sem interação inibitória, trata-se de herança poligênica.',
},

{
  id: 'sim_t5_05', texto_base: 5, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim'],
  tema: 'Variação de [H⁺] com queda de pH',
  enunciado: 'O pH oceânico cai de 8,2 para 7,8. Qual é a variação em \\([\\text{H}^+]\\)? (\\(10^{0{,}4}\\approx2{,}5\\))',
  alternativas: { A:'[H⁺] dobra', B:'[H⁺] triplica', C:'[H⁺] aumenta 2,5×', D:'[H⁺] aumenta 10×', E:'[H⁺] não se altera' },
  gabarito: 'C',
  explicacao: '\\[[\\text{H}^+]_{7{,}8} = 10^{-7{,}8}, \\quad [\\text{H}^+]_{8{,}2} = 10^{-8{,}2}\\] \\[\\frac{[\\text{H}^+]_{7{,}8}}{[\\text{H}^+]_{8{,}2}} = \\frac{10^{-7{,}8}}{10^{-8{,}2}} = 10^{-7{,}8+8{,}2} = 10^{0{,}4} \\approx 2{,}5\\] A concentração de \\(\\text{H}^+\\) aumenta 2,5 vezes com a queda de 0,4 unidades de pH.',
},

// ════════════════════════════════════════════════════════════
// TEXTO VI — Sensores Vestíveis de Cortisol
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t6_01', texto_base: 6, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Potência no resistor interno do sensor',
  texto_contexto: `Um smartwatch com sensor amperométrico de cortisol usa a enzima 11β-HSD para oxidar o cortisol no suor, gerando corrente proporcional à concentração. Circuito do sensor: V = 0,5 V; I = 2,0 mA; R_interno = 250 Ω. Bateria: 300 mAh e 3,7 V. Síndrome de Cushing (hipercortisolismo) pode ter herança autossômica dominante (MEN1). O cortisol tem ação pleiotrópica em vários tecidos.`,
  enunciado: 'Qual é a potência dissipada no resistor interno do sensor (250 Ω com 2,0 mA)?',
  alternativas: { A:'1,0×10⁻⁶ W', B:'1,0×10⁻³ W', C:'5,0×10⁻⁴ W', D:'5,0×10⁻⁷ W', E:'2,5×10⁻³ W' },
  gabarito: 'B',
  explicacao: '\\[P = I^2R = (2{,}0\\times10^{-3})^2\\times250 = 4{,}0\\times10^{-6}\\times250 = 1{,}0\\times10^{-3}\\,\\text{W} = 1{,}0\\,\\text{mW}\\]',
},

{
  id: 'sim_t6_02', texto_base: 6, tipo: 'A', nivel: 'basico',
  disciplinas: ['quim'],
  tema: 'Enzima imobilizada — catálise sem consumo',
  enunciado: 'A enzima 11β-HSD imobilizada no sensor atua como catalisador: reduz Ea sem ser consumida e sem alterar ΔH.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Definição de catalisador: (1) reduz \\(E_a\\) fornecendo via alternativa; (2) não é consumido (recupera-se após cada ciclo); (3) não altera \\(\\Delta H\\) pois os estados inicial e final são os mesmos. A imobilização fixa a enzima no eletrodo, permitindo uso contínuo.',
},

{
  id: 'sim_t6_03', texto_base: 6, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Cortisol — pleiotropia hormonal',
  enunciado: 'O cortisol é um hormônio com ação pleiotrópica pois uma única molécula produzida pelas suprarrenais gera múltiplos efeitos fenotípicos simultâneos em diferentes tecidos.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Pleiotropia molecular: o cortisol liga-se ao receptor glicocorticoide (GR) em vários tecidos simultaneamente, causando: (1) aumento da glicemia (fígado); (2) supressão imunológica; (3) catabolismo proteico (músculo); (4) alterações no humor e memória (SNC). Múltiplos efeitos de uma única molécula = pleiotropia.',
},

{
  id: 'sim_t6_04', texto_base: 6, tipo: 'C', nivel: 'basico',
  disciplinas: ['bio'],
  tema: 'Herança autossômica dominante — MEN1',
  enunciado: 'Pai com MEN1 (Aa, autossômica dominante) × mãe normal (aa). Probabilidade de filho desenvolver a síndrome:',
  alternativas: { A:'0%', B:'25%', C:'50%', D:'75%', E:'100%' },
  gabarito: 'C',
  explicacao: 'Cruzamento \\(Aa\\times aa\\): \\[\\text{Filhos: }Aa\\,(50\\%,\\,\\text{afetados})\\text{ e }aa\\,(50\\%,\\,\\text{normais})\\] \\[P(\\text{MEN1}) = \\frac{1}{2} = 50\\%\\]',
},

{
  id: 'sim_t6_05', texto_base: 6, tipo: 'C', nivel: 'avancado',
  disciplinas: ['fis'],
  tema: 'Autonomia do sensor — bateria vs consumo',
  enunciado: 'O smartwatch tem bateria de 300 mAh a 3,7 V. O sensor consome 1,0 mW continuamente. Por quantas horas o sensor opera até esgotar a bateria?',
  alternativas: { A:'111 h', B:'300 h', C:'1110 h', D:'3000 h', E:'11100 h' },
  gabarito: 'C',
  explicacao: '\\[E_{\\text{bat}} = 300\\,\\text{mAh}\\times3{,}7\\,\\text{V} = 1110\\,\\text{mWh}\\] \\[t = \\frac{E_{\\text{bat}}}{P} = \\frac{1110\\,\\text{mWh}}{1{,}0\\,\\text{mW}} = 1110\\,\\text{h}\\]',
},

// ════════════════════════════════════════════════════════════
// TEXTO VII — Usina Nuclear e Mutações por Radiação
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t7_01', texto_base: 7, tipo: 'C', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Potência elétrica da usina',
  texto_contexto: `Uma usina nuclear PWR gera 1000 MW elétricos com rendimento de 33% (2/3 do calor é rejeitado nas torres de resfriamento). Saída: 25000 A a 40 kV. Exposição à radiação ionizante pode mutar o gene supressor TP53; mutações germinativas causam síndrome de Li-Fraumeni (autossômica dominante).`,
  enunciado: 'Confirme a potência elétrica do gerador que opera a 40 kV e 25000 A.',
  alternativas: { A:'40 MW', B:'100 MW', C:'1000 MW', D:'400 MW', E:'25 MW' },
  gabarito: 'C',
  explicacao: '\\[P = V\\cdot I = 40\\times10^3\\,\\text{V}\\times25000\\,\\text{A} = 10^9\\,\\text{W} = 1000\\,\\text{MW}\\]',
},

{
  id: 'sim_t7_02', texto_base: 7, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Potência térmica com rendimento 33%',
  enunciado: 'Com rendimento de 33% e saída elétrica de 1000 MW, a potência térmica total do reator é aproximadamente 3000 MW.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Do rendimento: \\[\\eta = \\frac{P_{\\text{elétrica}}}{P_{\\text{térmica}}} \\implies P_{\\text{térmica}} = \\frac{P_{\\text{elétrica}}}{\\eta} = \\frac{1000}{0{,}33} \\approx 3030\\,\\text{MW}\\approx3000\\,\\text{MW}\\] Os \\(\\approx 2000\\,\\text{MW}\\) restantes são dissipados nas torres de resfriamento.',
},

{
  id: 'sim_t7_03', texto_base: 7, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Li-Fraumeni — herança dominante',
  enunciado: 'Indivíduo Aa (Li-Fraumeni, autossômica dominante) × parceiro normal (aa). Probabilidade de filho afetado:',
  alternativas: { A:'0%', B:'25%', C:'50%', D:'75%', E:'100%' },
  gabarito: 'C',
  explicacao: '\\[Aa\\times aa \\to Aa\\,(50\\%,\\,\\text{afetados})\\text{ e }aa\\,(50\\%,\\,\\text{normais})\\] \\[P = 50\\%\\]',
},

{
  id: 'sim_t7_04', texto_base: 7, tipo: 'A', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Energia produzida em 24 h',
  enunciado: 'Uma usina de 1000 MW operando 24 horas produz \\(24\\times10^6\\) kWh = \\(2{,}4\\times10^7\\) kWh.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. \\[E = P\\cdot t = 1000\\,\\text{MW}\\times24\\,\\text{h} = 24000\\,\\text{MWh}\\] \\[24000\\,\\text{MWh}\\times10^3\\,\\frac{\\text{kWh}}{\\text{MWh}} = 2{,}4\\times10^7\\,\\text{kWh}\\] Correto.',
},

{
  id: 'sim_t7_05', texto_base: 7, tipo: 'A', nivel: 'avancado',
  disciplinas: ['bio'],
  tema: 'Pleiotropia do TP53',
  enunciado: 'O gene TP53 mutado exemplifica pleiotropia pois sua perda de função afeta apoptose, reparo de DNA e ciclo celular, gerando predisposição a múltiplos tipos de tumor.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. A proteína p53 atua em múltiplas vias: (1) ativa genes de reparo de DNA; (2) induz apoptose em células danificadas; (3) bloqueia progressão do ciclo celular em G1/S. A perda de qualquer dessas funções favorece neoplasias em múltiplos tecidos (mama, sarcoma, leucemia, SNC). Um gene → múltiplos fenótipos = pleiotropia.',
},

// ════════════════════════════════════════════════════════════
// TEXTO VIII — Nanomedicina e Drug Delivery
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t8_01', texto_base: 8, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim','bio'],
  tema: 'Le Chatelier — liberação do fármaco em pH tumoral',
  texto_contexto: `Nanopartículas poliméricas (NPs) liberam fármaco em pH ácido tumoral (6,5) por protonação do polímero. Equilíbrio: NP-fármaco(s) ⇌ NP(aq) + fármaco(aq), Kc = 2,0×10⁻³ (pH 7,4 sanguíneo). Anticorpos terapêuticos são produzidos por células transgênicas. Resistor aquecedor do biorreator de NPs: R = 500 Ω, V = 50 V.`,
  enunciado: 'No ambiente tumoral (pH 6,5), o aumento de \\([\\text{H}^+\\)] protona o polímero das NPs, desestabilizando o encapsulamento. Pelo princípio de Le Chatelier, o equilíbrio de liberação se desloca para:',
  alternativas: {
    A: 'Esquerda — retendo o fármaco',
    B: 'Não se altera — H⁺ não está na equação',
    C: 'Direita — protonação desfaz o encapsulamento, liberando o fármaco',
    D: 'Direita — apenas em pH > 7',
    E: 'H⁺ altera Kc diretamente'
  },
  gabarito: 'C',
  explicacao: 'O pH ácido promove a protonação do polímero da NP, alterando sua conformação. Isso desfaz as interações que mantêm o fármaco encapsulado, perturbando o equilíbrio. Pelo princípio de Le Chatelier, o sistema desloca-se para **produzir mais fármaco livre** (direita), compensando a desestruturação da NP-fármaco.',
},

{
  id: 'sim_t8_02', texto_base: 8, tipo: 'A', nivel: 'basico',
  disciplinas: ['quim'],
  tema: 'Kc << 1 — encapsulamento favorecido no sangue',
  enunciado: 'O valor \\(K_c = 2{,}0\\times10^{-3}\\) em pH 7,4 indica que o fármaco permanece majoritariamente encapsulado no sangue.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. \\[K_c = \\frac{[\\text{NP}][\\text{fármaco}]}{[\\text{NP-fármaco}]} = 2{,}0\\times10^{-3} \\ll 1\\] Um \\(K_c\\) muito menor que 1 indica que os **reagentes** (NP-fármaco encapsulado) são fortemente favorecidos. O fármaco permanece encapsulado no plasma sanguíneo, evitando efeitos sistêmicos indesejados.',
},

{
  id: 'sim_t8_03', texto_base: 8, tipo: 'C', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Energia no resistor aquecedor do biorreator',
  enunciado: 'O resistor aquecedor (R=500 Ω, V=50 V) opera por 2 horas. Qual é a energia total dissipada?',
  alternativas: { A:'18 J', B:'180 J', C:'18000 J', D:'36000 J', E:'5000 J' },
  gabarito: 'D',
  explicacao: '\\[P = \\frac{V^2}{R} = \\frac{(50)^2}{500} = \\frac{2500}{500} = 5{,}0\\,\\text{W}\\] \\[t = 2\\times3600 = 7200\\,\\text{s}\\] \\[E = P\\cdot t = 5{,}0\\times7200 = 36000\\,\\text{J} = 36\\,\\text{kJ}\\]',
},

{
  id: 'sim_t8_04', texto_base: 8, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Bactéria produtora de anticorpo — OGM',
  enunciado: 'Bactérias com gene de anticorpo terapêutico humano inserido são OGMs, mesmo produzindo apenas a proteína humana.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. OGM = organismo com gene exógeno inserido, independentemente da origem ou função do gene. Bactérias produtoras de insulina humana (como \\(E.\\,coli\\) com o gene da insulina) são o exemplo mais clássico de OGMs na biotecnologia médica.',
},

{
  id: 'sim_t8_05', texto_base: 8, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim','fis','bio'],
  tema: 'Questão integradora — identificar afirmativa INCORRETA',
  enunciado: 'Biossensor integrado ao sistema de NPs: \\(I=0{,}5\\,\\text{mA}\\), \\(R=2000\\,\\Omega\\), glicose-oxidase com \\(\\Delta H=-80\\,\\text{kJ/mol}\\), \\(E_a=60\\,\\text{kJ/mol}\\) (com enzima). Qual afirmativa está INCORRETA?',
  alternativas: {
    A: 'A potência do biossensor é \\(5{,}0\\times10^{-4}\\,\\text{W}\\)',
    B: 'A enzima reduz Ea sem alterar ΔH = −80 kJ/mol',
    C: 'A corrente gerada é proporcional à concentração de glicose oxidada',
    D: 'ΔH < 0 indica que a reação é exotérmica',
    E: 'Ea = 60 kJ/mol é a energia de ativação SEM catalisador'
  },
  gabarito: 'E',
  explicacao: 'A alternativa E está **INCORRETA**. O enunciado explicitamente informa "\\(E_a = 60\\,\\text{kJ/mol}\\) (com enzima)" — ou seja, é o valor **com** catalisador. A Ea sem catalisador seria maior. Verificação das demais: \\[\\text{A: }P=(0{,}5\\times10^{-3})^2\\times2000=2{,}5\\times10^{-7}\\times2000=5{,}0\\times10^{-4}\\,\\text{W}\\;✓\\] B ✓ (catalisador não altera ΔH); C ✓ (sensor amperométrico); D ✓ (ΔH < 0 = exotérmica).',
},

// ════════════════════════════════════════════════════════════
// TEXTO IX — Pilhas, associação de geradores e perfil energético
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t9_01', texto_base: 9, tipo: 'C', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Associação de geradores em série',
  texto_contexto: String.raw`Em uma oficina de divulgação científica, estudantes montaram uma pilha didática com discos metálicos alternados separados por material poroso embebido em solução salina. Cada par metálico funciona como uma célula galvânica elementar de força eletromotriz aproximada igual a 1,5 V. Para alimentar um pequeno circuito indicador, os estudantes empilharam quatro células no mesmo sentido elétrico, de modo que as forças eletromotrizes individuais atuassem de forma aditiva.

Durante o funcionamento espontâneo, um dos metais apresenta maior tendência a oxidar, liberando elétrons ao circuito externo. Esses elétrons percorrem fios condutores até o eletrodo onde ocorre redução. Embora a maior parte da energia química seja convertida em energia elétrica útil, fios e contatos com resistência não nula dissipam parte da energia sob forma de calor, fenômeno associado ao efeito Joule.

Em paralelo, o professor apresentou um perfil energético genérico de uma reação de oxirredução, no qual os reagentes se encontram em 80 kJ/mol, o estado de transição em 130 kJ/mol e os produtos em 50 kJ/mol. Esse diagrama permite calcular a variação de entalpia e a energia de ativação no sentido direto.

Com base no texto, avalie os itens sobre pilhas, associação de geradores, dissipação de energia e perfil energético.`,
  enunciado: 'Considerando quatro células galvânicas de \\(1{,}5\\ \\mathrm{V}\\) associadas em série e no mesmo sentido, assinale a diferença de potencial total fornecida ao circuito indicador.',
  alternativas: { A:'1,5 V', B:'3,0 V', C:'6,0 V', D:'9,0 V', E:'12,0 V' },
  gabarito: 'C',
  explicacao: 'Em série e no mesmo sentido, as forças eletromotrizes somam: \\[\\varepsilon_{eq}=1{,}5+1{,}5+1{,}5+1{,}5=6{,}0\\ \\mathrm{V}\\]',
},

{
  id: 'sim_t9_02', texto_base: 9, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Ânodo em célula galvânica',
  enunciado: 'Julgue a afirmação: em uma célula galvânica espontânea, o eletrodo que sofre oxidação atua como ânodo e é a fonte de elétrons para o circuito externo.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Oxidação é perda de elétrons. Em pilhas galvânicas, a oxidação ocorre no ânodo, que fornece elétrons ao circuito externo. A redução ocorre no cátodo.',
},

{
  id: 'sim_t9_03', texto_base: 9, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'ΔH e energia de ativação',
  elementos_visuais: [{
    tipo: 'grafico_energia',
    titulo: 'Perfil energético da oxirredução',
    reagentes: 80,
    estado_transicao: 130,
    produtos: 50,
    label_ea: 'Ea direta',
    label_dh: 'ΔH',
  }],
  enunciado: 'A partir do perfil energético descrito no Texto IX, assinale os valores de \\(\\Delta H\\) da reação e da energia de ativação no sentido direto.',
  alternativas: {
    A: '+30 kJ/mol e 50 kJ/mol',
    B: '−30 kJ/mol e 50 kJ/mol',
    C: '−30 kJ/mol e 80 kJ/mol',
    D: '+50 kJ/mol e 130 kJ/mol',
    E: '−50 kJ/mol e 30 kJ/mol'
  },
  gabarito: 'B',
  explicacao: '\\[\\Delta H=H_{produtos}-H_{reagentes}=50-80=-30\\ \\mathrm{kJ/mol}\\] \\[E_a=H_{ET}-H_{reagentes}=130-80=50\\ \\mathrm{kJ/mol}\\]',
},

{
  id: 'sim_t9_04', texto_base: 9, tipo: 'A', nivel: 'basico',
  disciplinas: ['fis'],
  tema: 'Efeito Joule em condutores',
  enunciado: 'Julgue a proposição: se os fios e contatos do circuito tiverem resistência elétrica não nula, parte da energia elétrica será convertida em energia térmica durante a passagem de corrente.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. A dissipação térmica por efeito Joule é dada por \\(P=RI^2\\). Se \\(R>0\\) e \\(I>0\\), há potência dissipada em calor.',
},

{
  id: 'sim_t9_05', texto_base: 9, tipo: 'C', nivel: 'avancado',
  disciplinas: ['fis'],
  tema: 'Energia dissipada por efeito Joule',
  enunciado: 'Em um ensaio da pilha didática, a resistência total dos contatos foi estimada em \\(0{,}40\\ \\Omega\\), com corrente de \\(2{,}0\\ \\mathrm{A}\\) por \\(10\\ \\mathrm{min}\\). Assinale a energia dissipada nesses contatos.',
  alternativas: { A:'96 J', B:'240 J', C:'480 J', D:'960 J', E:'2400 J' },
  gabarito: 'D',
  explicacao: '\\[P=RI^2=0{,}40\\cdot(2{,}0)^2=1{,}6\\ \\mathrm{W}\\] \\[\\Delta t=10\\ \\mathrm{min}=600\\ \\mathrm{s}\\] \\[E=P\\Delta t=1{,}6\\cdot600=960\\ \\mathrm{J}\\]',
},

// ════════════════════════════════════════════════════════════
// TEXTO X — Hemoglobina, oxigenação e analogias elétricas
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t10_01', texto_base: 10, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Pleiotropia em hemoglobinopatias',
  texto_contexto: String.raw`Em hemoglobinopatias hereditárias, uma alteração molecular em proteína transportadora de oxigênio pode repercutir em diferentes níveis de organização biológica. A modificação da hemoglobina altera a afinidade pelo oxigênio, a forma e a deformabilidade das hemácias e a circulação em vasos de pequeno calibre. Como consequência, podem surgir manifestações hematológicas, vasculares e teciduais, ainda que a origem primária esteja em um único gene.

O transporte de oxigênio pode ser representado por um equilíbrio simplificado entre hemoglobina desoxigenada, oxigênio molecular e oxi-hemoglobina. Variações na pressão parcial de \\(O_2\\), como as observadas em ambientes de grande altitude, perturbam esse equilíbrio e podem favorecer a forma desoxigenada. Em alguns indivíduos, essa condição aumenta a chance de alterações físicas nas hemácias.

Em laboratório, capilares aquecidos são usados para estudar amostras sanguíneas, reduzindo viscosidade e controlando fluxo. O aquecimento pode ser realizado por resistores ôhmicos, cuja potência é calculada por \\(P=V^2/R\\). Em aconselhamento genético, probabilidades envolvendo hemoglobinopatias e grupos sanguíneos podem ser combinadas quando os loci segregam independentemente.

Com base nesse contexto, avalie os itens sobre pleiotropia, equilíbrio químico, genética e efeito Joule.`,
  enunciado: 'Julgue a afirmação: uma mutação em um único gene da hemoglobina pode produzir múltiplas consequências fenotípicas, caracterizando pleiotropia.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Pleiotropia ocorre quando um único gene influencia várias características. Alterações em hemoglobina podem afetar forma celular, transporte de gases, circulação e manifestações clínicas sistêmicas.',
},

{
  id: 'sim_t10_02', texto_base: 10, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim','bio'],
  tema: 'Le Chatelier e oxigenação',
  enunciado: 'Julgue a proposição: ao reduzir a pressão parcial de \\(O_2\\), o equilíbrio \\(Hb+O_2\\rightleftharpoons HbO_2\\) tende a deslocar-se para a esquerda, favorecendo hemoglobina desoxigenada.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Reduzir \\(O_2\\) remove reagente do equilíbrio direto. Pelo princípio de Le Chatelier, o sistema se desloca para a esquerda para repor parte do \\(O_2\\), favorecendo \\(Hb\\) desoxigenada.',
},

{
  id: 'sim_t10_03', texto_base: 10, tipo: 'C', nivel: 'avancado',
  disciplinas: ['bio'],
  tema: 'Probabilidade genética independente',
  enunciado: 'Um casal é heterozigoto para uma hemoglobinopatia autossômica recessiva \\((Aa\\times Aa)\\). Além disso, o genótipo ABO do casal é \\(I^Ai\\times I^Bi\\). Admitindo segregação independente, assinale a probabilidade de nascer uma criança \\(aa\\) e do grupo sanguíneo O.',
  alternativas: { A:'1/4', B:'1/8', C:'1/16', D:'3/16', E:'9/16' },
  gabarito: 'C',
  explicacao: 'Para a hemoglobinopatia: \\(Aa\\times Aa\\Rightarrow P(aa)=\\frac{1}{4}\\). Para ABO: \\(I^Ai\\times I^Bi\\Rightarrow P(ii)=\\frac{1}{4}\\). Como os loci segregam independentemente: \\[P(aa\\ e\\ ii)=\\frac{1}{4}\\cdot\\frac{1}{4}=\\frac{1}{16}\\]',
},

{
  id: 'sim_t10_04', texto_base: 10, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Aquecimento resistivo em capilar',
  enunciado: 'Um resistor ôhmico de \\(8{,}0\\ \\Omega\\) é submetido a \\(16\\ \\mathrm{V}\\) durante \\(5{,}0\\ \\mathrm{min}\\). Assinale a energia elétrica dissipada em calor no intervalo.',
  alternativas: { A:'960 J', B:'2400 J', C:'4800 J', D:'9600 J', E:'19200 J' },
  gabarito: 'D',
  explicacao: '\\[P=\\frac{V^2}{R}=\\frac{16^2}{8}=32\\ \\mathrm{W}\\] \\[\\Delta t=5{,}0\\ \\mathrm{min}=300\\ \\mathrm{s}\\] \\[E=P\\Delta t=32\\cdot300=9600\\ \\mathrm{J}\\]',
},

{
  id: 'sim_t10_05', texto_base: 10, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'Sistema ABO e fator Rh',
  enunciado: 'Em outro aconselhamento, os genótipos parentais são \\(I^Ai\\,Rr\\) e \\(I^Bi\\,Rr\\). Admitindo segregação independente entre ABO e Rh, assinale a probabilidade de uma criança do grupo O e Rh negativo.',
  alternativas: { A:'1/4', B:'1/8', C:'1/16', D:'3/16', E:'9/16' },
  gabarito: 'C',
  explicacao: 'Grupo O exige \\(ii\\): \\(P(ii)=\\frac{1}{4}\\). Rh negativo exige \\(rr\\): \\(P(rr)=\\frac{1}{4}\\). Como os loci são independentes: \\[P(ii\\ e\\ rr)=\\frac{1}{4}\\cdot\\frac{1}{4}=\\frac{1}{16}\\]',
},

// ════════════════════════════════════════════════════════════
// TEXTO XI — Sensor ambiental, circuito em série e tampão carbonato
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t11_01', texto_base: 11, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Resistores em série em sensor ambiental',
  elementos_visuais: [{
    tipo: 'circuito_serie',
    titulo: 'Circuito de leitura em série',
    componentes: [
      { tipo: 'bateria', label: 'V', valor: '12 V' },
      { tipo: 'resistor', label: 'R1', valor: '100 Ω' },
      { tipo: 'resistor', label: 'R2', valor: '150 Ω' },
      { tipo: 'resistor', label: 'R3', valor: '250 Ω' },
    ],
  }],
  texto_contexto: String.raw`Uma estação de monitoramento instalada às margens de um lago utiliza sensores eletroquímicos para acompanhar pH, temperatura e condutividade da água. Para reduzir custos, o circuito de leitura foi montado com três resistores ôhmicos em série, de valores \(100\ \Omega\), \(150\ \Omega\) e \(250\ \Omega\), ligados a uma fonte contínua de \(12\ \mathrm{V}\). Os fios de conexão podem ser considerados ideais.

O sensor de pH opera em um ambiente aquático onde o dióxido de carbono dissolvido participa do equilíbrio simplificado \(CO_2(aq)+H_2O(l)\rightleftharpoons H^+(aq)+HCO_3^-(aq)\). Variações na pressão parcial de \(CO_2\), na temperatura e na entrada de ácidos ou bases alteram a concentração de \(H^+\), modificando a leitura do pH.

Em uma população de organismos aquáticos estudada no mesmo lago, a tolerância à acidez é influenciada por dois genes independentes, com contribuição cumulativa de alelos dominantes. Dessa forma, a interpretação do sistema ambiental exige integração entre circuito elétrico, equilíbrio químico e genética quantitativa.`,
  enunciado: 'Considerando o circuito em série descrito no Texto XI, assinale a resistência equivalente do sistema de leitura do sensor.',
  alternativas: { A:'150 Ω', B:'250 Ω', C:'300 Ω', D:'500 Ω', E:'750 Ω' },
  gabarito: 'D',
  explicacao: 'Em série, as resistências se somam: \\[R_{eq}=100+150+250=500\\ \\Omega\\]',
},

{
  id: 'sim_t11_02', texto_base: 11, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Potência em circuito equivalente',
  elementos_visuais: [{
    tipo: 'circuito_serie',
    titulo: 'Circuito equivalente do sensor',
    componentes: [
      { tipo: 'bateria', label: 'V', valor: '12 V' },
      { tipo: 'resistor', label: 'Req', valor: '500 Ω' },
    ],
  }],
  enunciado: 'Com a fonte de \\(12\\ \\mathrm{V}\\) ligada ao resistor equivalente obtido para o circuito do Texto XI, assinale a potência total dissipada.',
  alternativas: { A:'0,048 W', B:'0,144 W', C:'0,288 W', D:'0,500 W', E:'1,200 W' },
  gabarito: 'C',
  explicacao: '\\[P=\\frac{V^2}{R}=\\frac{12^2}{500}=\\frac{144}{500}=0{,}288\\ \\mathrm{W}\\]',
},

{
  id: 'sim_t11_03', texto_base: 11, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Le Chatelier e acidificação',
  enunciado: 'Julgue a afirmação: aumento da concentração de \\(CO_2\\) dissolvido tende a deslocar o equilíbrio para a direita, elevando \\([H^+]\\) e reduzindo o pH.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. O aumento de reagente favorece produtos. Como \\(H^+\\) é produto do equilíbrio simplificado, sua concentração aumenta e o pH diminui: \\[pH=-\\log[H^+]\\]',
},

{
  id: 'sim_t11_04', texto_base: 11, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim'],
  tema: 'pH e concentração de H+',
  enunciado: 'Em uma amostra do lago, a concentração de \\(H^+\\) foi estimada em \\(1{,}0\\times10^{-6}\\ \\mathrm{mol/L}\\). Assinale o pH correspondente.',
  alternativas: { A:'4,0', B:'5,0', C:'6,0', D:'7,0', E:'8,0' },
  gabarito: 'C',
  explicacao: '\\[pH=-\\log(1{,}0\\times10^{-6})=6{,}0\\]',
},

{
  id: 'sim_t11_05', texto_base: 11, tipo: 'A', nivel: 'basico',
  disciplinas: ['bio'],
  tema: 'Herança quantitativa',
  enunciado: 'Julgue a proposição: quando vários genes independentes contribuem cumulativamente para tolerância à acidez, o padrão é compatível com herança quantitativa, não com dominância simples em um único locus.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Herança quantitativa envolve múltiplos genes com efeitos aditivos, gerando variação contínua. Isso difere de uma característica monogênica de dominância simples.',
},

// ════════════════════════════════════════════════════════════
// TEXTO XII — Galvanoplastia, corrosão e grupos sanguíneos
// ════════════════════════════════════════════════════════════
{
  id: 'sim_t12_01', texto_base: 12, tipo: 'A', nivel: 'intermediario',
  disciplinas: ['quim'],
  tema: 'Cátodo em eletrólise',
  elementos_visuais: [{
    tipo: 'equacao_quimica',
    equacao: 'Zn^{2+}_{(aq)} + 2e^- \\rightarrow Zn_{(s)}',
    legenda: 'No cátodo ocorre redução e deposição metálica.',
  }],
  texto_contexto: String.raw`Em uma planta de tratamento de peças metálicas, a galvanoplastia é utilizada para recobrir componentes de aço com uma fina camada de zinco, protegendo-os da corrosão. Na cuba eletrolítica, a peça a ser revestida é ligada ao polo negativo da fonte, enquanto uma solução aquosa contém íons \(Zn^{2+}\). O processo é mantido por corrente contínua rigorosamente controlada.

Durante a operação, cátions migram em direção ao eletrodo onde recebem elétrons e se transformam em metal depositado. A massa depositada pode ser prevista pelas Leis de Faraday, desde que se conheçam corrente, tempo, número de elétrons envolvidos na semirreação e massa molar. Como o processo industrial consome energia elétrica, a potência de cada cuba também precisa ser dimensionada para estimar custos.

No ambulatório da empresa, campanhas de doação de sangue exigem compreensão do sistema ABO e do fator Rh. Como esses loci segregam de forma independente em modelos mendelianos simplificados, probabilidades compostas podem ser obtidas por multiplicação.`,
  enunciado: 'Julgue a afirmação: na galvanoplastia descrita, a peça ligada ao polo negativo atua como cátodo, onde ocorre redução de \\(Zn^{2+}\\) a \\(Zn(s)\\).',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Em eletrólise, o cátodo recebe elétrons da fonte. Assim, os cátions \\(Zn^{2+}\\) migram para a peça e sofrem redução: \\[Zn^{2+}+2e^-\\rightarrow Zn(s)\\]',
},

{
  id: 'sim_t12_02', texto_base: 12, tipo: 'C', nivel: 'avancado',
  disciplinas: ['quim'],
  tema: 'Leis de Faraday para zinco',
  elementos_visuais: [{
    tipo: 'tabela',
    titulo: 'Dados de Faraday para eletrodeposição',
    cabecalho: ['Grandeza', 'Valor'],
    linhas: [
      ['Corrente', '\\(5{,}0\\ \\mathrm{A}\\)'],
      ['Tempo', '\\(19300\\ \\mathrm{s}\\)'],
      ['Constante de Faraday', '\\(96500\\ \\mathrm{C\\ mol^{-1}}\\)'],
      ['Semirreação', '\\(Zn^{2+}+2e^-\\rightarrow Zn\\)'],
    ],
  }],
  enunciado: 'Uma cuba opera com corrente de \\(5{,}0\\ \\mathrm{A}\\) por \\(19300\\ \\mathrm{s}\\). Para \\(Zn^{2+}+2e^-\\rightarrow Zn\\), com \\(F=96500\\ \\mathrm{C/mol}\\) e \\(M(Zn)=65{,}4\\ \\mathrm{g/mol}\\), assinale a massa depositada.',
  alternativas: { A:'16,35 g', B:'32,70 g', C:'65,40 g', D:'130,80 g', E:'327,00 g' },
  gabarito: 'B',
  explicacao: '\\[Q=I\\Delta t=5{,}0\\cdot19300=96500\\ \\mathrm{C}\\] \\[n(e^-)=\\frac{Q}{F}=1{,}0\\ \\mathrm{mol}\\] Como são 2 mol de elétrons por 1 mol de zinco: \\[n(Zn)=0{,}5\\ \\mathrm{mol}\\] \\[m=0{,}5\\cdot65{,}4=32{,}70\\ \\mathrm{g}\\]',
},

{
  id: 'sim_t12_03', texto_base: 12, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['fis'],
  tema: 'Energia elétrica industrial',
  enunciado: 'Cada cuba opera com \\(200\\ \\mathrm{V}\\) e \\(10\\ \\mathrm{A}\\) durante \\(4\\ \\mathrm{h}\\). Assinale a energia consumida por uma cuba nesse intervalo.',
  alternativas: { A:'0,8 kWh', B:'2,0 kWh', C:'4,0 kWh', D:'8,0 kWh', E:'20,0 kWh' },
  gabarito: 'D',
  explicacao: '\\[P=VI=200\\cdot10=2000\\ \\mathrm{W}=2{,}0\\ \\mathrm{kW}\\] \\[E=P\\Delta t=2{,}0\\cdot4=8{,}0\\ \\mathrm{kWh}\\]',
},

{
  id: 'sim_t12_04', texto_base: 12, tipo: 'C', nivel: 'intermediario',
  disciplinas: ['bio'],
  tema: 'ABO e Rh independentes',
  enunciado: 'Um casal \\(I^Ai\\,Rr\\times I^Bi\\,rr\\) deseja estimar a probabilidade de descendente do grupo O e Rh negativo. Assinale o valor correto.',
  alternativas: { A:'1/4', B:'1/8', C:'1/16', D:'3/8', E:'1/2' },
  gabarito: 'B',
  explicacao: 'Para ABO: \\(I^Ai\\times I^Bi\\Rightarrow P(ii)=\\frac{1}{4}\\). Para Rh: \\(Rr\\times rr\\Rightarrow P(rr)=\\frac{1}{2}\\). Logo: \\[P(ii\\ e\\ rr)=\\frac{1}{4}\\cdot\\frac{1}{2}=\\frac{1}{8}\\]',
},

{
  id: 'sim_t12_05', texto_base: 12, tipo: 'A', nivel: 'basico',
  disciplinas: ['quim','fis'],
  tema: 'Corrente contínua e eletrodeposição',
  enunciado: 'Julgue a proposição: manter corrente contínua constante é essencial porque a carga total transferida, \\(Q=I\\Delta t\\), determina a quantidade de elétrons disponível para a eletrodeposição.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. As Leis de Faraday partem da carga total transferida. Se \\(I\\) é constante, \\(Q=I\\Delta t\\). Essa carga determina \\(n(e^-)=Q/F\\), que define a quantidade de metal depositado.',
},

]; // fim QUESTOES_SIMULADO

// ============================================================
// REELABORAÇÃO — FORMATO MAIS PRÓXIMO DA PROVA
// Textos-base longos, interdisciplinares e itens menos diretos.
// Não reproduz enunciados, dados ou figuras da avaliação original.
// ============================================================

const SIMULADO_TEXTOS_FORMATO_PROVA = {
  1: String.raw`
  TEXTO I — Atendimento emergencial, bioeletricidade e soluções iônicas

  Em hospitais e espaços públicos de grande circulação, desfibriladores automáticos externos são utilizados para intervir em episódios de arritmia grave. O equipamento realiza a leitura do ritmo cardíaco e, quando indicado, descarrega energia elétrica em intervalo muito curto, buscando reorganizar a atividade elétrica do miocárdio. A descarga depende de um capacitor previamente carregado por um circuito interno, e a energia entregue ao paciente pode ser analisada por relações entre carga elétrica, diferença de potencial, tempo e potência média.

  A condução do pulso até o tórax exige eletrodos com gel condutor. Esse gel contém espécies iônicas dissolvidas em água, permitindo transporte de carga em meio aquoso. Embora a corrente no circuito metálico externo seja associada ao movimento ordenado de elétrons, em soluções eletrolíticas a condução envolve migração de íons positivos e negativos sob ação do campo elétrico.

  Do ponto de vista biológico, o ritmo cardíaco normal depende de células especializadas e de canais iônicos de membrana. Alterações hereditárias em proteínas de canais podem modificar a excitabilidade cardíaca. Em algumas famílias, síndromes arrítmicas seguem padrão autossômico dominante, isto é, o alelo alterado em apenas uma cópia já pode ser suficiente para produzir o fenótipo clínico.

  Com base no texto, nas relações \(E=\frac{1}{2}QV\), \(P=\frac{E}{\Delta t}\), nos princípios da condução iônica e na genética mendeliana, julgue os itens e assinale as alternativas propostas.
  `,

  2: String.raw`
  TEXTO II — Eletroforese, hemoglobina e diagnóstico molecular

  A eletroforese em gel é uma técnica laboratorial empregada para separar moléculas biológicas carregadas. Fragmentos de DNA, por apresentarem grupos fosfato com carga negativa, migram no gel sob ação de um campo elétrico. O sentido da migração depende da polaridade dos eletrodos, enquanto a velocidade de deslocamento é influenciada pelo tamanho molecular e pela resistência oferecida pela matriz do gel.

  Em protocolos didáticos, a cuba de eletroforese pode ser aproximada por um circuito resistivo alimentado por uma fonte contínua. Assim, a dissipação de energia no gel e na solução tampão pode ser analisada por \(P=RI^2\), \(P=VI\) e \(E=P\Delta t\). Mesmo quando a corrente elétrica é pequena, o controle térmico do sistema é importante para evitar distorções nas bandas moleculares.

  Uma aplicação clínica relevante é a investigação de variantes da hemoglobina. Na anemia falciforme, uma mutação pontual no gene da beta-globina altera a estrutura primária da proteína, favorecendo a formação de hemoglobina S. Essa alteração molecular repercute em múltiplos efeitos fisiológicos: mudança na forma das hemácias, anemia hemolítica, obstruções vasculares e manifestações sistêmicas. Por isso, a doença permite integrar genética molecular, herança mendeliana, estrutura proteica e princípios físicos de separação eletroforética.

  Com base nesse contexto, analise os itens considerando carga elétrica, potência dissipada, pleiotropia e probabilidade genética.
  `,

  3: String.raw`
  TEXTO III — Baterias de estado sólido, lítio metálico e recarga controlada

  O desenvolvimento de baterias de estado sólido é uma das frentes tecnológicas mais promissoras para veículos elétricos e armazenamento de energia renovável. Diferentemente de baterias convencionais com eletrólitos líquidos, esses dispositivos empregam eletrólitos sólidos que podem aumentar a segurança operacional e permitir maior densidade energética. Um protótipo laboratorial apresenta tensão nominal de \(4{,}0\ \mathrm{V}\), capacidade de \(200\ \mathrm{Ah}\) e eletrodo de lítio metálico, cuja semirreação de oxidação durante a descarga pode ser representada por \(Li(s)\rightarrow Li^+(aq)+e^-\).

  Durante a descarga, a energia química é convertida espontaneamente em energia elétrica, caracterizando funcionamento galvânico. Na recarga, uma fonte externa força o processo inverso, de modo que íons de lítio recebam elétrons e sejam restituídos ao eletrodo metálico. A massa depositada ou consumida pode ser calculada pelas Leis de Faraday, relacionando corrente elétrica, tempo, constante de Faraday e massa molar.

  No dimensionamento econômico, a energia armazenada em watt-hora e quilowatt-hora também é relevante, pois esta é a unidade usual de cobrança em estações de recarga. Portanto, o mesmo sistema exige raciocínio integrado entre eletroquímica, corrente elétrica, energia e custo.

  Considere \(F=96500\ \mathrm{C\ mol^{-1}}\), \(M(Li)=7\ \mathrm{g\ mol^{-1}}\) e as informações do texto para responder aos itens.
  `,

  4: String.raw`
  TEXTO IV — Biorreatores, enzimas recombinantes e equilíbrio de fermentação

  A produção de bioetanol de segunda geração depende da conversão de materiais lignocelulósicos em açúcares fermentáveis. Em biorreatores experimentais, linhagens de leveduras podem receber genes de outros organismos para expressar enzimas capazes de hidrolisar celulose. Um exemplo é a inserção de um gene que codifica celulase, enzima que acelera a quebra de ligações glicosídicas e aumenta a disponibilidade de glicose para fermentação.

  A ação enzimática não altera a variação de entalpia global da reação, mas oferece rota alternativa de menor energia de ativação. Em diagramas de energia, isso aparece como redução do pico associado ao estado de transição, sem modificar os níveis energéticos inicial e final. Assim, a enzima acelera a chegada ao equilíbrio, mas não muda a constante de equilíbrio termodinâmica.

  No interior do biorreator, a fermentação pode ser modelada, de forma simplificada, por um equilíbrio entre glicose, etanol e dióxido de carbono. A análise de \(K_c\) exige comparar concentrações no equilíbrio com os coeficientes estequiométricos. Ao mesmo tempo, como as células transgênicas se multiplicam por brotamento, a estabilidade genética da linhagem produtora é um ponto essencial para a produtividade industrial.

  Utilize o texto para relacionar transgenia, catálise, energia de ativação, entalpia e equilíbrio químico.
  `,

  5: String.raw`
  TEXTO V — Acidificação oceânica, equilíbrio do carbono e adaptação genética

  O aumento da concentração atmosférica de dióxido de carbono intensifica sua dissolução em ambientes aquáticos. Em água, parte do \(CO_2\) dissolvido participa de equilíbrios sucessivos que formam ácido carbônico, bicarbonato e íons hidrogênio. A elevação de \([H^+]\) reduz o pH, afetando organismos calcificadores e ecossistemas marinhos.

  A dissolução de gases em água também depende da temperatura. Para muitos gases, o aquecimento diminui a solubilidade, alterando a quantidade de espécie dissolvida disponível para os equilíbrios subsequentes. O princípio de Le Chatelier permite prever o sentido de deslocamento quando concentração, temperatura ou pressão parcial sofrem perturbação.

  Em paralelo, populações de corais podem apresentar variação hereditária na tolerância térmica. Quando vários genes independentes contribuem de modo cumulativo para um fenótipo, a característica é classificada como herança poligênica ou quantitativa. Esse tipo de herança difere de epistasia, pois não depende necessariamente do mascaramento de um gene por outro, mas da soma de efeitos alélicos.

  A partir do texto, avalie os itens sobre equilíbrio químico, pH em escala logarítmica e herança poligênica.
  `,

  6: String.raw`
  TEXTO VI — Dispositivos vestíveis, biossensores e regulação hormonal

  Dispositivos vestíveis modernos podem monitorar biomarcadores presentes no suor por meio de sensores amperométricos. Em um modelo experimental, a detecção de cortisol depende de uma enzima imobilizada na superfície do eletrodo, capaz de participar de uma reação de oxidação cujo sinal elétrico é proporcional à concentração do analito. O circuito interno do sensor opera com pequena diferença de potencial e correntes da ordem de miliampères.

  Como todo circuito resistivo, parte da energia fornecida pela bateria é dissipada em forma de calor por efeito Joule. A autonomia do dispositivo depende da capacidade da bateria, frequentemente indicada em miliampère-hora, e da potência consumida continuamente pelos sensores. Para comparar carga, energia e tempo de funcionamento, é necessário converter unidades adequadamente.

  O cortisol exerce efeitos em diferentes tecidos, como metabolismo energético, resposta imune e regulação cardiovascular. Alterações hereditárias em vias endócrinas podem seguir padrões mendelianos, inclusive autossômicos dominantes em algumas síndromes. O contexto permite integrar catálise enzimática, potência elétrica, autonomia de baterias, pleiotropia hormonal e probabilidade genética.

  Com base no texto, julgue os itens e resolva as situações propostas.
  `,

  7: String.raw`
  TEXTO VII — Geração de energia, radiação ionizante e genes supressores tumorais

  Usinas nucleares do tipo PWR utilizam a energia liberada em reações nucleares para aquecer água, produzir vapor e movimentar turbinas acopladas a geradores elétricos. A potência elétrica entregue à rede é menor que a potência térmica produzida no reator, pois parte da energia é inevitavelmente rejeitada para o ambiente, de acordo com limitações termodinâmicas.

  A etapa elétrica pode ser analisada por \(P=VI\), especialmente na saída dos geradores, onde altas diferenças de potencial e correntes intensas permitem transferência de grande potência. A energia produzida ao longo do tempo é usualmente expressa em \(kWh\), unidade importante para planejamento energético e comparação de consumo.

  A radiação ionizante exige controle rigoroso porque pode induzir danos no DNA. Alterações germinativas em genes supressores tumorais, como aqueles envolvidos em reparo, apoptose e regulação do ciclo celular, podem elevar o risco de múltiplos tumores. Quando um único gene influencia várias manifestações fenotípicas, caracteriza-se pleiotropia. Algumas síndromes hereditárias associadas a predisposição tumoral seguem padrão autossômico dominante.

  Considere esse cenário para integrar potência elétrica, rendimento, energia e genética molecular.
  `,

  8: String.raw`
  TEXTO VIII — Nanomedicina, liberação controlada e biorreatores farmacêuticos

  Sistemas de drug delivery baseados em nanopartículas poliméricas são projetados para transportar fármacos pelo organismo e liberá-los preferencialmente em tecidos-alvo. Em alguns tumores, o microambiente é mais ácido que o sangue, o que pode protonar grupos químicos do polímero, alterar sua conformação e favorecer a liberação do medicamento encapsulado. Esse processo pode ser representado por um equilíbrio entre nanopartícula carregada com fármaco e as espécies livres em solução.

  A interpretação de \(K_c\) indica se, em determinada condição, predominam as formas encapsuladas ou liberadas. Quando o pH muda, a concentração de \(H^+\) não precisa aparecer explicitamente na equação simplificada para que a protonação de grupos funcionais perturbe a estabilidade do sistema. O princípio de Le Chatelier ajuda a prever o efeito macroscópico dessa perturbação.

  Em escala industrial, nanopartículas e proteínas terapêuticas podem ser produzidas em biorreatores com controle térmico e sensores enzimáticos. Resistores aquecedores dissipam energia por efeito Joule, enquanto células geneticamente modificadas podem expressar proteínas humanas de interesse médico. O sistema, portanto, envolve equilíbrio químico, potência elétrica, catálise, biotecnologia e organismos geneticamente modificados.

  Com base nesse texto, responda aos itens propostos.
  `,
};

const SIMULADO_ENUNCIADOS_FORMATO_PROVA = {
  sim_t1_01: 'Considerando a energia armazenada no capacitor descrito no Texto I e a relação \\(E=\\frac{1}{2}QV\\), assinale a alternativa que corresponde à carga elétrica necessária para a descarga terapêutica.',
  sim_t1_02: 'A partir do intervalo de descarga informado no Texto I, julgue a afirmação: a liberação de \\(150\\ \\mathrm{J}\\) em \\(10\\ \\mathrm{ms}\\) corresponde a uma potência média de \\(15000\\ \\mathrm{W}\\).',
  sim_t1_03: 'No contexto de uma síndrome cardíaca autossômica dominante mencionada no Texto I, julgue: um genitor heterozigoto afetado cruzado com indivíduo não afetado pode transmitir o fenótipo a metade dos descendentes, sem depender do sexo.',
  sim_t1_04: 'Durante a condução iônica no gel do eletrodo, considere a passagem de \\(0{,}2\\ \\mathrm{C}\\). Com base na constante de Faraday, assinale a quantidade de matéria de íons monovalentes transportada.',
  sim_t1_05: 'Julgue a afirmação à luz do Texto I: a produção metabólica de ácido em situação de estresse fisiológico pode elevar \\([H^+]\\), reduzir o pH e sobrecarregar sistemas tamponantes.',

  sim_t2_01: 'Com base no Texto II, assinale a justificativa correta para o deslocamento de fragmentos de DNA em direção ao eletrodo positivo durante a eletroforese.',
  sim_t2_02: 'No modelo elétrico simplificado da cuba de eletroforese, assinale a potência dissipada quando o gel é percorrido por corrente de \\(100\\ \\mathrm{mA}\\) e apresenta resistência de \\(100\\ \\Omega\\).',
  sim_t2_03: 'Julgue a proposição: a anemia falciforme decorre de alteração pontual que substitui um aminoácido na beta-globina e modifica as propriedades da hemoglobina.',
  sim_t2_04: 'Considerando os efeitos sistêmicos descritos no Texto II, julgue: a anemia falciforme exemplifica pleiotropia por relacionar uma alteração gênica a múltiplas manifestações fenotípicas.',
  sim_t2_05: 'Em aconselhamento genético, um casal heterozigoto para uma condição autossômica recessiva deseja estimar a chance de descendente afetado do sexo feminino. Assinale a probabilidade correta.',

  sim_t3_01: 'Utilizando os dados do protótipo do Texto III, assinale a energia total armazenada, expressa de forma compatível em \\(Wh\\) e \\(kJ\\).',
  sim_t3_02: 'Durante a recarga forçada descrita no Texto III, assinale a massa de lítio metálico restituída ao eletrodo, admitindo rendimento ideal.',
  sim_t3_03: 'Julgue a afirmação: no funcionamento galvânico da bateria, o lítio metálico sofre oxidação e fornece elétrons ao circuito externo.',
  sim_t3_04: 'Julgue a proposição: uma recarga feita sob \\(50\\ \\mathrm{A}\\) e \\(4{,}0\\ \\mathrm{V}\\) corresponde a potência elétrica de apenas \\(200\\ \\mathrm{W}\\).',
  sim_t3_05: 'Com base na energia armazenada e na tarifa indicada, assinale o custo aproximado de uma recarga completa do protótipo.',

  sim_t4_01: 'No contexto biotecnológico do Texto IV, a inserção de gene de outro organismo no genoma da levedura caracteriza corretamente qual processo?',
  sim_t4_02: 'A partir do perfil energético descrito, assinale a redução de energia de ativação promovida pela celulase no biorreator.',
  sim_t4_03: 'Julgue a afirmação: ao reduzir a energia de ativação, a enzima também torna a variação de entalpia global da reação menos negativa.',
  sim_t4_04: 'Com as concentrações inicial e de equilíbrio informadas no Texto IV, assinale o valor de \\(K_c\\) para o modelo simplificado de fermentação.',
  sim_t4_05: 'Julgue a proposição: uma levedura com gene recombinante integrado ao genoma tende a transmiti-lo às células-filhas formadas por brotamento.',

  sim_t5_01: 'Considerando a dissolução exotérmica de \\(CO_2\\) em água e a elevação da temperatura oceânica, assinale a alternativa que completa corretamente o deslocamento do equilíbrio e o efeito sobre o pH.',
  sim_t5_02: 'Julgue a afirmação: para a dissolução exotérmica do dióxido de carbono, o aumento de temperatura reduz a tendência de dissolução e diminui o valor de \\(K_c\\).',
  sim_t5_03: 'No modelo poligênico apresentado no Texto V, assinale a proporção esperada de descendentes \\(AABBCC\\) no cruzamento \\(AaBbCc\\times AaBbCc\\).',
  sim_t5_04: 'Julgue a proposição: resistência ao branqueamento controlada por múltiplos genes aditivos representa herança poligênica, e não epistasia simples.',
  sim_t5_05: 'Como o pH é uma escala logarítmica, assinale a variação aproximada de \\([H^+]\\) quando o pH oceânico diminui de \\(8{,}2\\) para \\(7{,}8\\).',

  sim_t6_01: 'No circuito interno do biossensor descrito no Texto VI, assinale a potência dissipada por um resistor de \\(250\\ \\Omega\\) percorrido por \\(2{,}0\\ \\mathrm{mA}\\).',
  sim_t6_02: 'Julgue a afirmação: a enzima imobilizada no sensor reduz a energia de ativação, não é consumida globalmente e não altera a variação de entalpia.',
  sim_t6_03: 'Considerando os vários efeitos fisiológicos do cortisol, julgue: a ação em múltiplos tecidos permite associar o hormônio ao conceito funcional de pleiotropia.',
  sim_t6_04: 'Para uma síndrome autossômica dominante no modelo \\(Aa\\times aa\\), assinale a probabilidade de descendente afetado.',
  sim_t6_05: 'Com base na capacidade da bateria e no consumo contínuo do sensor, assinale o tempo aproximado de operação do dispositivo.',

  sim_t7_01: 'A partir da tensão e da corrente de saída do gerador descrito no Texto VII, assinale a potência elétrica correspondente.',
  sim_t7_02: 'Julgue a afirmação: se a saída elétrica é \\(1000\\ \\mathrm{MW}\\) e o rendimento é de aproximadamente \\(33\\%\\), a potência térmica do reator é da ordem de \\(3000\\ \\mathrm{MW}\\).',
  sim_t7_03: 'No padrão autossômico dominante mencionado no Texto VII, assinale a probabilidade de descendente afetado no cruzamento \\(Aa\\times aa\\).',
  sim_t7_04: 'Julgue a proposição: uma usina de \\(1000\\ \\mathrm{MW}\\) operando por \\(24\\ \\mathrm{h}\\) produz \\(2{,}4\\times10^7\\ \\mathrm{kWh}\\).',
  sim_t7_05: 'Considerando as funções do gene supressor tumoral citado, julgue: a alteração de um único gene pode afetar reparo, apoptose e ciclo celular, caracterizando pleiotropia.',

  sim_t8_01: 'Com base no microambiente tumoral ácido descrito no Texto VIII, assinale o sentido de deslocamento do equilíbrio de liberação do fármaco.',
  sim_t8_02: 'Julgue a afirmação: em pH sanguíneo, um \\(K_c\\) muito menor que 1 indica predomínio da forma encapsulada do fármaco.',
  sim_t8_03: 'No biorreator do Texto VIII, assinale a energia dissipada por um resistor de \\(500\\ \\Omega\\) submetido a \\(50\\ \\mathrm{V}\\) durante duas horas.',
  sim_t8_04: 'Julgue a proposição: células bacterianas que recebem gene humano para expressar proteína terapêutica são organismos geneticamente modificados.',
  sim_t8_05: 'No sistema integrado de nanopartículas, biossensor e enzima, assinale a afirmativa incorreta a partir dos dados físico-químicos fornecidos.',
};

QUESTOES_SIMULADO.forEach((q) => {
  const texto = SIMULADO_TEXTOS_FORMATO_PROVA[q.texto_base];
  if (texto) q.texto_contexto = texto.trim();
  if (SIMULADO_ENUNCIADOS_FORMATO_PROVA[q.id]) {
    q.enunciado = SIMULADO_ENUNCIADOS_FORMATO_PROVA[q.id];
  }
});
