// ============================================================
// CN PORTAL MARISTA — QUESTÕES DE FÍSICA
// Explicações com matemática profissional (MathJax \[...\])
// 30 Tipo C + 10 Tipo A
// ============================================================

const QUESTOES_FIS = [

{
  id: 'fis_c_01', tipo: 'C', nivel: 'basico',
  tema: 'Efeito Joule — potência',
  enunciado: 'Um resistor de 100 Ω é conectado a uma diferença de potencial de 20 V. Qual é a potência dissipada por Efeito Joule?',
  alternativas: { A:'0,4 W', B:'2,0 W', C:'4,0 W', D:'40 W', E:'400 W' },
  gabarito: 'C',
  explicacao: 'Usando \\(P = U^2/R\\): \\[P = \\frac{(20\\,\\text{V})^2}{100\\,\\Omega} = \\frac{400}{100} = 4{,}0\\,\\text{W}\\]',
  steps: [
    {
      titulo: 'Escolher a fórmula correta',
      hint: 'Dados U e R → usar P = U²/R',
      explicacao: 'Com tensão e resistência conhecidas, a forma direta da Lei de Joule é:',
      linhas_latex: ['P = \\frac{U^2}{R}'],
    },
    {
      titulo: 'Substituir os valores',
      hint: 'U = 20 V → U² = 400 V²',
      explicacao: 'Elevamos ao quadrado e dividimos:',
      linhas_latex: [
        'P = \\frac{(20)^2}{100} = \\frac{400}{100} = 4{,}0\\,\\text{W}',
      ],
      destaque_latex: '\\boxed{P = 4{,}0\\,\\text{W}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_02', tipo: 'C', nivel: 'basico',
  tema: 'Carga elétrica — marcapasso',
  enunciado: 'Um marcapasso opera com corrente de \\(5{,}0\\times10^{-5}\\,\\text{A}\\) por \\(1{,}0\\times10^{-3}\\,\\text{s}\\). Qual é a carga elétrica liberada por pulso?',
  alternativas: { A:'5,0×10⁻² C', B:'5,0×10⁻⁵ C', C:'5,0×10⁻⁸ C', D:'5,0×10⁻⁶ C', E:'5,0×10⁻³ C' },
  gabarito: 'C',
  explicacao: 'Usando \\(Q = I \\cdot t\\) e a regra dos expoentes \\(10^{-5}\\times10^{-3}=10^{-8}\\): \\[Q = 5{,}0\\times10^{-5}\\,\\text{A}\\times1{,}0\\times10^{-3}\\,\\text{s} = 5{,}0\\times10^{-8}\\,\\text{C}\\]',
  steps: [
    {
      titulo: 'Relação Q = I · t',
      hint: 'Corrente = carga/tempo → Q = I·t',
      explicacao: 'Isolamos Q da definição de corrente elétrica:',
      linhas_latex: ['I = \\frac{Q}{t} \\implies Q = I \\cdot t'],
    },
    {
      titulo: 'Multiplicar em notação científica',
      hint: 'Mantissas multiplicam, expoentes somam',
      explicacao: 'Separamos mantissa e potência:',
      linhas_latex: [
        'Q = (5{,}0 \\times 1{,}0)\\times 10^{(-5)+(-3)} = 5{,}0\\times10^{-8}\\,\\text{C}',
      ],
      destaque_latex: '\\boxed{Q = 5{,}0\\times10^{-8}\\,\\text{C}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_03', tipo: 'C', nivel: 'basico',
  tema: 'Energia elétrica — bateria de marcapasso',
  enunciado: 'Uma bateria de marcapasso tem tensão de 2,8 V e capacidade de 1,0 Ah. Qual é a energia total armazenada?',
  alternativas: { A:'2,8 J', B:'100,8 J', C:'10080 J', D:'2800 J', E:'28 J' },
  gabarito: 'C',
  explicacao: 'Primeiro convertemos: \\(Q = 1{,}0\\,\\text{Ah} = 3600\\,\\text{C}\\). Depois: \\[E = V\\cdot Q = 2{,}8\\,\\text{V}\\times3600\\,\\text{C} = 10080\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'Converter Ah → Coulombs',
      hint: '1 h = 3600 s → 1 Ah = 3600 C',
      explicacao: 'Como \\(1\\,\\text{C}=1\\,\\text{A}\\cdot\\text{s}\\):',
      linhas_latex: ['Q = 1{,}0\\,\\text{Ah} = 1{,}0\\,\\text{A}\\times3600\\,\\text{s} = 3600\\,\\text{C}'],
    },
    {
      titulo: 'Calcular energia E = V · Q',
      hint: 'E = 2,8 × 3600',
      explicacao: 'A energia elétrica é trabalho por unidade de carga vezes carga total:',
      linhas_latex: [
        'E = V\\cdot Q = 2{,}8\\times3600 = 10080\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E = 10080\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_04', tipo: 'C', nivel: 'basico',
  tema: 'Potência elétrica — motor de veículo',
  enunciado: 'Um motor elétrico opera com 400 V e 125 A. Qual é a potência elétrica?',
  alternativas: { A:'3,2 W', B:'500 W', C:'50 kW', D:'500 kW', E:'3,2 kW' },
  gabarito: 'C',
  explicacao: '\\[P = U\\cdot I = 400\\,\\text{V}\\times125\\,\\text{A} = 50000\\,\\text{W} = 50\\,\\text{kW}\\]',
  steps: [
    {
      titulo: 'Aplicar P = U · I',
      hint: 'Potência = tensão × corrente',
      explicacao: 'Multiplicamos diretamente:',
      linhas_latex: ['P = U\\cdot I = 400\\times125 = 50000\\,\\text{W} = 50\\,\\text{kW}'],
      destaque_latex: '\\boxed{P = 50\\,\\text{kW}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_05', tipo: 'C', nivel: 'basico',
  tema: 'Conversão kWh → Joules',
  enunciado: 'Uma indústria consome 150 kWh em um turno. Qual é esse valor em joules?',
  alternativas: { A:'150 J', B:'540 J', C:'5,4×10⁵ J', D:'5,4×10⁸ J', E:'1,5×10⁵ J' },
  gabarito: 'D',
  explicacao: 'O fator de conversão: \\(1\\,\\text{kWh}=3{,}6\\times10^6\\,\\text{J}\\). Portanto: \\[E = 150\\times3{,}6\\times10^6 = 540\\times10^6 = 5{,}4\\times10^8\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'Derivar o fator de conversão',
      hint: '1 kWh = 1000 W × 3600 s',
      explicacao: 'Expandimos a unidade kWh em unidades base do SI:',
      linhas_latex: [
        '1\\,\\text{kWh} = 10^3\\,\\text{W}\\times3{,}6\\times10^3\\,\\text{s} = 3{,}6\\times10^6\\,\\text{J}',
      ],
    },
    {
      titulo: 'Aplicar para 150 kWh',
      hint: '150 × 3,6×10⁶ = 540×10⁶ = 5,4×10⁸',
      explicacao: 'Multiplicamos e reescrevemos em notação científica normalizada:',
      linhas_latex: [
        'E = 150\\times3{,}6\\times10^6 = 5{,}4\\times10^8\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E = 5{,}4\\times10^8\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_06', tipo: 'C', nivel: 'basico',
  tema: 'Efeito Joule — variação quadrática com U',
  enunciado: 'Um resistor dissipa potência \\(P\\) com tensão \\(U\\). Se a tensão for reduzida à metade, qual será a nova potência?',
  alternativas: { A:'P/2', B:'P/4', C:'2P', D:'4P', E:'P' },
  gabarito: 'B',
  explicacao: 'Como \\(P = U^2/R\\), a potência é proporcional ao quadrado da tensão. Reduzindo \\(U\\) à metade: \\[P^{\\prime} = \\frac{(U/2)^2}{R} = \\frac{U^2/4}{R} = \\frac{P}{4}\\] O expoente 2 é a chave: metade da tensão resulta em um quarto da potência, não à metade.',
  steps: [
    {
      titulo: 'P = U²/R — relação quadrática',
      hint: 'P ∝ U²: se U muda por fator k, P muda por fator k²',
      explicacao: 'Partimos da expressão original:',
      linhas_latex: ['P = \\frac{U^2}{R}'],
    },
    {
      titulo: 'Substituir U → U/2',
      hint: '(U/2)² = U²/4',
      explicacao: 'O quadrado distribui para numerador e denominador da fração:',
      linhas_latex: [
        "P' = \\frac{(U/2)^2}{R} = \\frac{U^2/4}{R} = \\frac{1}{4}\\cdot\\frac{U^2}{R} = \\frac{P}{4}",
      ],
      destaque_latex: "\\boxed{P' = P/4} \\quad \\Rightarrow \\text{Alternativa B}",
    },
  ],
},

{
  id: 'fis_c_07', tipo: 'C', nivel: 'basico',
  tema: 'Lei de Ohm — resistência',
  enunciado: 'Um resistor ôhmico tem 12 V de ddp e corrente de 0,3 A. Qual é sua resistência?',
  alternativas: { A:'0,025 Ω', B:'3,6 Ω', C:'12,3 Ω', D:'40 Ω', E:'400 Ω' },
  gabarito: 'D',
  explicacao: 'Isolando \\(R\\) na Lei de Ohm: \\[R = \\frac{V}{I} = \\frac{12\\,\\text{V}}{0{,}3\\,\\text{A}} = 40\\,\\Omega\\]',
  steps: [
    {
      titulo: 'Isolar R na Lei de Ohm',
      hint: 'V = R·I → R = V/I',
      explicacao: '',
      linhas_latex: ['R = \\frac{V}{I} = \\frac{12}{0{,}3} = 40\\,\\Omega'],
      destaque_latex: '\\boxed{R = 40\\,\\Omega} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_08', tipo: 'C', nivel: 'basico',
  tema: 'Associação em série — geradores',
  enunciado: 'Quatro pilhas idênticas com f.e.m. = 1,5 V em série. Qual é a f.e.m. total?',
  alternativas: { A:'1,5 V', B:'3,0 V', C:'4,5 V', D:'6,0 V', E:'9,0 V' },
  gabarito: 'D',
  explicacao: 'Em série, as f.e.m. somam-se: \\[\\varepsilon_{\\text{total}} = n\\cdot\\varepsilon = 4\\times1{,}5\\,\\text{V} = 6{,}0\\,\\text{V}\\]',
  steps: [
    {
      titulo: 'Regra da associação em série',
      hint: 'f.e.m. somam-se; corrente é única',
      explicacao: '',
      linhas_latex: [
        '\\varepsilon_{\\text{total}} = 4\\times1{,}5 = 6{,}0\\,\\text{V}',
      ],
      destaque_latex: '\\boxed{\\varepsilon_{\\text{total}} = 6{,}0\\,\\text{V}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_09', tipo: 'C', nivel: 'basico',
  tema: 'Consumo energético — kWh',
  enunciado: 'Uma cuba eletrolítica opera com 5,0 kW durante 8 horas. Qual é o consumo em kWh?',
  alternativas: { A:'0,625 kWh', B:'5,0 kWh', C:'13 kWh', D:'40 kWh', E:'400 kWh' },
  gabarito: 'D',
  explicacao: '\\[E = P\\cdot t = 5{,}0\\,\\text{kW}\\times8\\,\\text{h} = 40\\,\\text{kWh}\\]',
  steps: [
    {
      titulo: 'E = P · t com unidades compatíveis',
      hint: 'kW × h = kWh diretamente',
      explicacao: '',
      linhas_latex: ['E = 5{,}0\\times8 = 40\\,\\text{kWh}'],
      destaque_latex: '\\boxed{E = 40\\,\\text{kWh}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_10', tipo: 'C', nivel: 'basico',
  tema: 'mAh → Coulombs',
  enunciado: 'Bateria de celular com 3000 mAh e 3,7 V. Qual é a carga em coulombs?',
  alternativas: { A:'3,0 C', B:'300 C', C:'3000 C', D:'10800 C', E:'30000 C' },
  gabarito: 'D',
  explicacao: '\\[Q = 3000\\,\\text{mAh} = 3{,}0\\,\\text{Ah} = 3{,}0\\times3600 = 10800\\,\\text{C}\\]',
  steps: [
    {
      titulo: 'Converter mAh → Ah → C',
      hint: '÷1000 para Ah; ×3600 para C',
      explicacao: 'Dois passos de conversão:',
      linhas_latex: [
        'Q = \\frac{3000}{1000}\\,\\text{Ah} = 3{,}0\\,\\text{Ah}',
        'Q = 3{,}0\\times3600 = 10800\\,\\text{C}',
      ],
      destaque_latex: '\\boxed{Q = 10800\\,\\text{C}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_11', tipo: 'C', nivel: 'intermediario',
  tema: 'Energia — bateria de celular em Joules',
  enunciado: 'Bateria de 3000 mAh e 3,7 V. Qual a energia em joules?',
  alternativas: { A:'11,1 J', B:'1110 J', C:'11100 J', D:'39960 J', E:'111000 J' },
  gabarito: 'D',
  explicacao: 'Com \\(Q = 10800\\,\\text{C}\\) (calculado anteriormente): \\[E = V\\cdot Q = 3{,}7\\times10800 = 39960\\,\\text{J}\\approx40\\,\\text{kJ}\\]',
  steps: [
    {
      titulo: 'Usar Q = 10800 C já calculado',
      hint: '3000 mAh = 10800 C',
      explicacao: '',
      linhas_latex: ['Q = 10800\\,\\text{C}'],
    },
    {
      titulo: 'Calcular E = V · Q',
      hint: '3,7 × 10800 = 39960',
      explicacao: '',
      linhas_latex: ['E = 3{,}7\\times10800 = 39960\\,\\text{J}'],
      destaque_latex: '\\boxed{E = 39960\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_12', tipo: 'C', nivel: 'intermediario',
  tema: 'Efeito Joule — pulso do marcapasso',
  enunciado: 'Pulso com \\(I=10\\,\\text{mA}\\), \\(R=500\\,\\Omega\\), \\(t=1{,}0\\,\\text{ms}\\). Qual é a energia por pulso?',
  alternativas: { A:'5,0×10⁻⁸ J', B:'5,0×10⁻⁵ J', C:'5,0×10⁻² J', D:'5,0×10⁻¹ J', E:'5,0×10⁻⁹ J' },
  gabarito: 'B',
  explicacao: '\\[P = I^2R = (10^{-2})^2\\times500 = 10^{-4}\\times500 = 0{,}05\\,\\text{W}\\] \\[E = Pt = 0{,}05\\times10^{-3} = 5{,}0\\times10^{-5}\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'Calcular P = I²R',
      hint: 'I = 10 mA = 10⁻² A; (10⁻²)² = 10⁻⁴',
      explicacao: '',
      linhas_latex: [
        'P = (10\\times10^{-3})^2\\times500 = 10^{-4}\\times500 = 5{,}0\\times10^{-2}\\,\\text{W}',
      ],
    },
    {
      titulo: 'Calcular E = P · t',
      hint: 't = 1,0 ms = 10⁻³ s',
      explicacao: '',
      linhas_latex: [
        'E = 5{,}0\\times10^{-2}\\times1{,}0\\times10^{-3} = 5{,}0\\times10^{-5}\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E = 5{,}0\\times10^{-5}\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_13', tipo: 'C', nivel: 'intermediario',
  tema: 'Custo energético industrial',
  enunciado: '10 cubas de 3,0 kW cada operando 8 h/dia por 30 dias. Tarifa R$0,80/kWh. Qual é o custo total?',
  alternativas: { A:'R$192,00', B:'R$576,00', C:'R$1440,00', D:'R$5760,00', E:'R$7200,00' },
  gabarito: 'D',
  explicacao: '\\[P_{\\text{total}} = 10\\times3{,}0 = 30\\,\\text{kW}\\] \\[t = 30\\times8 = 240\\,\\text{h}\\] \\[E = 30\\times240 = 7200\\,\\text{kWh}\\] \\[\\text{Custo} = 7200\\times0{,}80 = R\\$\\,5760{,}00\\]',
  steps: [
    {
      titulo: 'Potência total e tempo total',
      hint: 'Em paralelo, potências somam; t = dias × h/dia',
      explicacao: '',
      linhas_latex: [
        'P = 10\\times3{,}0 = 30\\,\\text{kW}',
        't = 30\\times8 = 240\\,\\text{h}',
      ],
    },
    {
      titulo: 'Energia e custo',
      hint: 'E = P·t; Custo = E × tarifa',
      explicacao: '',
      linhas_latex: [
        'E = 30\\times240 = 7200\\,\\text{kWh}',
        '\\text{Custo} = 7200\\times0{,}80 = R\\$\\,5760{,}00',
      ],
      destaque_latex: '\\boxed{\\text{Custo} = R\\$\\,5760{,}00} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_14', tipo: 'C', nivel: 'intermediario',
  tema: 'Efeito Joule — biossensor',
  enunciado: 'Resistor de 150 Ω alimentado com 3,0 V por 5 minutos. Qual é a energia dissipada?',
  alternativas: { A:'0,9 J', B:'18 J', C:'90 J', D:'270 J', E:'5400 J' },
  gabarito: 'B',
  explicacao: '\\[P = \\frac{U^2}{R} = \\frac{9}{150} = 0{,}06\\,\\text{W}\\] \\[E = Pt = 0{,}06\\times300 = 18\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'Calcular P = U²/R',
      hint: '3² = 9; 9/150 = 0,06',
      explicacao: '',
      linhas_latex: ['P = \\frac{(3{,}0)^2}{150} = \\frac{9}{150} = 0{,}06\\,\\text{W}'],
    },
    {
      titulo: 'Converter tempo e calcular E',
      hint: '5 min = 300 s; E = 0,06 × 300',
      explicacao: '',
      linhas_latex: [
        't = 5\\times60 = 300\\,\\text{s}',
        'E = 0{,}06\\times300 = 18\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E = 18\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_15', tipo: 'C', nivel: 'intermediario',
  tema: 'Energia em MJ — motor SOFC',
  enunciado: 'Motor SOFC de 50 kW operando por 2 horas. Qual é a energia em megajoules?',
  alternativas: { A:'100 MJ', B:'180 MJ', C:'360 MJ', D:'720 MJ', E:'3600 MJ' },
  gabarito: 'C',
  explicacao: '\\[E = 50\\times2 = 100\\,\\text{kWh}\\] \\[E = 100\\times3{,}6 = 360\\,\\text{MJ}\\]',
  steps: [
    {
      titulo: 'Calcular kWh e converter para MJ',
      hint: '1 kWh = 3,6 MJ',
      explicacao: '',
      linhas_latex: [
        'E = 50\\,\\text{kW}\\times2\\,\\text{h} = 100\\,\\text{kWh}',
        'E = 100\\times3{,}6 = 360\\,\\text{MJ}',
      ],
      destaque_latex: '\\boxed{E = 360\\,\\text{MJ}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_16', tipo: 'C', nivel: 'intermediario',
  tema: 'Circuito série — queda de tensão',
  enunciado: '\\(R_1=30\\,\\Omega\\) e \\(R_2=70\\,\\Omega\\) em série com 100 V. Qual é a tensão sobre \\(R_1\\)?',
  alternativas: { A:'10 V', B:'30 V', C:'50 V', D:'70 V', E:'100 V' },
  gabarito: 'B',
  explicacao: '\\[R_{eq} = 30+70 = 100\\,\\Omega\\] \\[I = \\frac{100}{100} = 1{,}0\\,\\text{A}\\] \\[V_1 = I\\cdot R_1 = 1{,}0\\times30 = 30\\,\\text{V}\\] Nota: a tensão se distribui proporcionalmente às resistências — \\(V_1/V = R_1/R_{eq} = 30\\%\\).',
  steps: [
    {
      titulo: 'R_eq em série e corrente única',
      hint: 'R_eq = R₁ + R₂; I = V/R_eq',
      explicacao: '',
      linhas_latex: [
        'R_{eq} = 30+70 = 100\\,\\Omega',
        'I = \\frac{100}{100} = 1{,}0\\,\\text{A}',
      ],
    },
    {
      titulo: 'Queda em R₁: V₁ = I·R₁',
      hint: '1,0 A × 30 Ω',
      explicacao: '',
      linhas_latex: ['V_1 = 1{,}0\\times30 = 30\\,\\text{V}'],
      destaque_latex: '\\boxed{V_1 = 30\\,\\text{V}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_17', tipo: 'C', nivel: 'intermediario',
  tema: 'Análise dimensional — 1 mAh = 3,6 C',
  enunciado: 'Um engenheiro afirma que 1 mAh = 3,6 C. Essa afirmação está:',
  alternativas: {
    A: 'Errada, pois 1 mAh = 1 C',
    B: 'Errada, pois 1 mAh = 0,001 C',
    C: 'Correta: 1 mAh = 10⁻³ A × 3600 s = 3,6 C',
    D: 'Errada, pois 1 mAh = 3600 C',
    E: 'Correta, porém apenas para baterias de lítio'
  },
  gabarito: 'C',
  explicacao: '\\[1\\,\\text{mAh} = 10^{-3}\\,\\text{A}\\times3600\\,\\text{s} = 3{,}6\\,\\text{A}\\cdot\\text{s} = 3{,}6\\,\\text{C}\\] Universal — não depende do tipo de bateria.',
  steps: [
    {
      titulo: 'Decompor mAh em unidades SI',
      hint: '1 mA = 10⁻³ A; 1 h = 3600 s',
      explicacao: '',
      linhas_latex: [
        '1\\,\\text{mAh} = 10^{-3}\\,\\text{A}\\times3600\\,\\text{s} = 3{,}6\\,\\text{C}',
      ],
      destaque_latex: '\\boxed{1\\,\\text{mAh} = 3{,}6\\,\\text{C}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_18', tipo: 'C', nivel: 'intermediario',
  tema: 'Circuito paralelo — corrente por ramo',
  enunciado: '\\(R_1=60\\,\\Omega\\) e \\(R_2=40\\,\\Omega\\) em paralelo com 12 V. Qual é a corrente em \\(R_2\\)?',
  alternativas: { A:'0,1 A', B:'0,2 A', C:'0,3 A', D:'0,5 A', E:'1,0 A' },
  gabarito: 'C',
  explicacao: 'Em paralelo, a tensão é igual em todos os ramos. Para \\(R_2\\): \\[I_2 = \\frac{V}{R_2} = \\frac{12}{40} = 0{,}3\\,\\text{A}\\]',
  steps: [
    {
      titulo: 'Paralelo: mesma tensão em todos os ramos',
      hint: 'V_R₂ = V_fonte = 12 V',
      explicacao: '',
      linhas_latex: ['I_2 = \\frac{V}{R_2} = \\frac{12}{40} = 0{,}3\\,\\text{A}'],
      destaque_latex: '\\boxed{I_2 = 0{,}3\\,\\text{A}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_19', tipo: 'C', nivel: 'avancado',
  tema: 'Efeito Joule — dobrar U e R simultaneamente',
  enunciado: 'Aquecedor com \\(U\\) e \\(R\\) dissipa \\(P\\). Se \\(U\\to2U\\) e \\(R\\to2R\\), qual é a nova potência?',
  alternativas: { A:'P/4', B:'P/2', C:'P', D:'2P', E:'4P' },
  gabarito: 'D',
  explicacao: '\\[P^{\\prime} = \\frac{(2U)^2}{2R} = \\frac{4U^2}{2R} = 2\\cdot\\frac{U^2}{R} = 2P\\] Dobrar \\(U\\) multiplica por 4; dobrar \\(R\\) divide por 2. Efeito líquido: \\(\\times2\\).',
  steps: [
    {
      titulo: 'Substituir as duas mudanças em P = U²/R',
      hint: '(2U)² = 4U²; denominar 2R',
      explicacao: '',
      linhas_latex: [
        "P' = \\frac{(2U)^2}{2R} = \\frac{4U^2}{2R} = 2\\cdot\\frac{U^2}{R} = 2P",
      ],
      destaque_latex: "\\boxed{P' = 2P} \\quad \\Rightarrow \\text{Alternativa D}",
    },
  ],
},

{
  id: 'fis_c_20', tipo: 'C', nivel: 'avancado',
  tema: 'Rendimento energético',
  enunciado: 'Motor elétrico: \\(P_{\\text{entrada}}=500\\,\\text{W}\\), \\(P_{\\text{útil}}=400\\,\\text{W}\\). Qual é o rendimento e a potência dissipada como calor?',
  alternativas: {
    A: 'η=80%; calor=50 W',
    B: 'η=80%; calor=100 W',
    C: 'η=125%; calor=100 W',
    D: 'η=20%; calor=400 W',
    E: 'η=80%; calor=400 W'
  },
  gabarito: 'B',
  explicacao: '\\[\\eta = \\frac{P_{\\text{útil}}}{P_{\\text{total}}} = \\frac{400}{500} = 0{,}80 = 80\\%\\] \\[P_{\\text{calor}} = 500-400 = 100\\,\\text{W}\\]',
  steps: [
    {
      titulo: 'Rendimento η = P_útil / P_total',
      hint: '400/500 = 0,80',
      explicacao: '',
      linhas_latex: [
        '\\eta = \\frac{400}{500} = 0{,}80 = 80\\%',
      ],
    },
    {
      titulo: 'Potência dissipada por conservação',
      hint: 'P_calor = P_total − P_útil',
      explicacao: '',
      linhas_latex: ['P_{\\text{calor}} = 500-400 = 100\\,\\text{W}'],
      destaque_latex: '\\boxed{\\eta=80\\%,\\;P_{\\text{calor}}=100\\,\\text{W}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_21', tipo: 'C', nivel: 'avancado',
  tema: 'Circuito misto — R equivalente',
  enunciado: '\\(R_1=10\\,\\Omega\\) em série com o paralelo \\(R_2=30\\,\\Omega\\) e \\(R_3=15\\,\\Omega\\). Qual é \\(R_{eq}\\)?',
  alternativas: { A:'10 Ω', B:'20 Ω', C:'30 Ω', D:'55 Ω', E:'45 Ω' },
  gabarito: 'B',
  explicacao: '\\[R_p = \\frac{R_2 R_3}{R_2+R_3} = \\frac{30\\times15}{45} = \\frac{450}{45} = 10\\,\\Omega\\] \\[R_{eq} = R_1+R_p = 10+10 = 20\\,\\Omega\\]',
  steps: [
    {
      titulo: 'Paralelo R₂ ∥ R₃',
      hint: 'R_p = (R₂·R₃)/(R₂+R₃)',
      explicacao: '',
      linhas_latex: ['R_p = \\frac{30\\times15}{30+15} = \\frac{450}{45} = 10\\,\\Omega'],
    },
    {
      titulo: 'Série: R₁ + R_p',
      hint: '10 + 10 = 20',
      explicacao: '',
      linhas_latex: ['R_{eq} = 10+10 = 20\\,\\Omega'],
      destaque_latex: '\\boxed{R_{eq}=20\\,\\Omega} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_22', tipo: 'C', nivel: 'avancado',
  tema: 'Energia total — marcapasso 24 h',
  enunciado: 'Marcapasso: 70 pulsos/min, \\(P=0{,}05\\,\\text{W}\\), \\(t_{\\text{pulso}}=1{,}0\\,\\text{ms}\\). Qual a energia em 24 h?',
  alternativas: { A:'0,21 J', B:'5,0 J', C:'360 J', D:'504 J', E:'21,6 J' },
  gabarito: 'B',
  explicacao: '\\[n = 70\\times60\\times24 = 100800\\,\\text{pulsos}\\] \\[E_{\\text{pulso}} = 0{,}05\\times10^{-3} = 5{,}0\\times10^{-5}\\,\\text{J}\\] \\[E_{\\text{total}} = 100800\\times5{,}0\\times10^{-5} = 5{,}04\\approx5{,}0\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'Número de pulsos em 24 h',
      hint: '70 × 60 × 24',
      explicacao: '',
      linhas_latex: ['n = 70\\times60\\times24 = 100800\\,\\text{pulsos}'],
    },
    {
      titulo: 'Energia por pulso e energia total',
      hint: 'E_pulso = P·t; E_total = n × E_pulso',
      explicacao: '',
      linhas_latex: [
        'E_{\\text{pulso}} = 0{,}05\\times10^{-3} = 5{,}0\\times10^{-5}\\,\\text{J}',
        'E_{\\text{total}} = 100800\\times5{,}0\\times10^{-5} \\approx 5{,}0\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E_{\\text{total}}\\approx5{,}0\\,\\text{J}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_23', tipo: 'C', nivel: 'avancado',
  tema: 'Comparação de custos — três sistemas',
  enunciado: 'A (20 kW, 10 h/dia), B (15 kW, 16 h/dia), C (25 kW, 8 h/dia), 30 dias, R$0,50/kWh. Qual tem menor custo?',
  alternativas: {
    A: 'A — R$3000',
    B: 'B — R$3600',
    C: 'C — R$3000',
    D: 'A e C empatados — R$3000',
    E: 'B — R$2160'
  },
  gabarito: 'D',
  explicacao: '\\[C_A = 20\\times(10\\times30)\\times0{,}50 = 20\\times300\\times0{,}50 = R\\$\\,3000\\] \\[C_B = 15\\times480\\times0{,}50 = R\\$\\,3600\\] \\[C_C = 25\\times240\\times0{,}50 = R\\$\\,3000\\] A e C empatam com o menor custo.',
  steps: [
    {
      titulo: 'Custo = P × t_total × tarifa',
      hint: 't_total = t_dia × 30 dias',
      explicacao: '',
      linhas_latex: [
        'C_A = 20\\times300\\times0{,}50 = R\\$\\,3000',
        'C_B = 15\\times480\\times0{,}50 = R\\$\\,3600',
        'C_C = 25\\times240\\times0{,}50 = R\\$\\,3000',
      ],
      destaque_latex: '\\boxed{C_A = C_C = R\\$\\,3000\\text{ (menor)}} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_24', tipo: 'C', nivel: 'avancado',
  tema: 'Gerador real — tensão nos terminais',
  enunciado: 'Gerador com \\(\\varepsilon=12\\,\\text{V}\\), \\(r=2\\,\\Omega\\), conectado a \\(R=10\\,\\Omega\\). Qual é a tensão nos terminais?',
  alternativas: { A:'10 V', B:'11 V', C:'12 V', D:'14 V', E:'6 V' },
  gabarito: 'A',
  explicacao: '\\[I = \\frac{\\varepsilon}{R+r} = \\frac{12}{10+2} = \\frac{12}{12} = 1{,}0\\,\\text{A}\\] \\[V_T = \\varepsilon - Ir = 12-1{,}0\\times2 = 10\\,\\text{V}\\]',
  steps: [
    {
      titulo: 'Corrente no circuito',
      hint: 'I = ε/(R+r)',
      explicacao: '',
      linhas_latex: ['I = \\frac{12}{10+2} = 1{,}0\\,\\text{A}'],
    },
    {
      titulo: 'Tensão nos terminais',
      hint: 'V_T = ε − I·r',
      explicacao: '',
      linhas_latex: ['V_T = 12-1{,}0\\times2 = 10\\,\\text{V}'],
      destaque_latex: '\\boxed{V_T = 10\\,\\text{V}} \\quad \\Rightarrow \\text{Alternativa A}',
    },
  ],
},

{
  id: 'fis_c_25', tipo: 'C', nivel: 'avancado',
  tema: 'Efeito Joule — sangue falciforme vs normal',
  enunciado: 'Sangue falciforme tem resistência \\(4\\times\\) maior. Com mesma ddp \\(U\\), qual é \\(P_f/P_n\\)?',
  alternativas: { A:'4', B:'2', C:'1/2', D:'1/4', E:'1' },
  gabarito: 'D',
  explicacao: 'Com \\(U\\) constante e \\(P=U^2/R\\): \\[\\frac{P_f}{P_n} = \\frac{U^2/R_f}{U^2/R_n} = \\frac{R_n}{R_f} = \\frac{R_n}{4R_n} = \\frac{1}{4}\\]',
  steps: [
    {
      titulo: 'P ∝ 1/R com U constante',
      hint: 'P = U²/R; razão elimina U²',
      explicacao: '',
      linhas_latex: [
        '\\frac{P_f}{P_n} = \\frac{R_n}{R_f} = \\frac{R_n}{4R_n} = \\frac{1}{4}',
      ],
      destaque_latex: '\\boxed{P_f = P_n/4} \\quad \\Rightarrow \\text{Alternativa D}',
    },
  ],
},

{
  id: 'fis_c_26', tipo: 'C', nivel: 'basico',
  tema: 'Análise dimensional — potência',
  enunciado: 'Qual relação de unidades é CORRETA para a potência elétrica?',
  alternativas: { A:'1 W = 1 J×s', B:'1 W = 1 J/s', C:'1 W = 1 C/s', D:'1 W = 1 V×C', E:'1 W = 1 A/V' },
  gabarito: 'B',
  explicacao: 'Da definição de potência: \\[[P] = \\frac{[E]}{[t]} = \\frac{\\text{J}}{\\text{s}} = \\text{W}\\] Alternativamente: \\(\\text{W} = \\text{V}\\cdot\\text{A}\\). C (C/s = A) é corrente, não potência.',
  steps: [
    {
      titulo: 'Derivar [W] da definição',
      hint: 'P = ΔE/Δt → [W] = J/s',
      explicacao: '',
      linhas_latex: ['[P] = \\frac{\\text{J}}{\\text{s}} = \\text{W}'],
      destaque_latex: '\\boxed{1\\,\\text{W} = 1\\,\\text{J/s}} \\quad \\Rightarrow \\text{Alternativa B}',
    },
  ],
},

{
  id: 'fis_c_27', tipo: 'C', nivel: 'intermediario',
  tema: 'Energia — veículo elétrico em MJ',
  enunciado: 'Veículo consome 20 kWh/100 km. Viagem de 250 km. Energia em MJ?',
  alternativas: { A:'18 MJ', B:'50 MJ', C:'180 MJ', D:'500 MJ', E:'1800 MJ' },
  gabarito: 'C',
  explicacao: '\\[E = \\frac{20}{100}\\times250 = 50\\,\\text{kWh}\\] \\[E = 50\\times3{,}6 = 180\\,\\text{MJ}\\]',
  steps: [
    {
      titulo: 'Calcular kWh e converter para MJ',
      hint: '1 kWh = 3,6 MJ',
      explicacao: '',
      linhas_latex: [
        'E = \\frac{20\\,\\text{kWh}}{100\\,\\text{km}}\\times250\\,\\text{km} = 50\\,\\text{kWh}',
        'E = 50\\times3{,}6 = 180\\,\\text{MJ}',
      ],
      destaque_latex: '\\boxed{E = 180\\,\\text{MJ}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_28', tipo: 'C', nivel: 'avancado',
  tema: 'Efeito Joule — 10 minutos',
  enunciado: 'Resistor de 200 Ω submetido a 100 V por 10 min. Qual é a energia dissipada?',
  alternativas: { A:'500 J', B:'3000 J', C:'30000 J', D:'300000 J', E:'50 J' },
  gabarito: 'C',
  explicacao: '\\[P = \\frac{(100)^2}{200} = \\frac{10000}{200} = 50\\,\\text{W}\\] \\[E = 50\\times600 = 30000\\,\\text{J}\\]',
  steps: [
    {
      titulo: 'P = U²/R e E = P·t',
      hint: 'P = 10000/200 = 50 W; t = 600 s',
      explicacao: '',
      linhas_latex: [
        'P = \\frac{(100)^2}{200} = 50\\,\\text{W}',
        'E = 50\\times600 = 30000\\,\\text{J}',
      ],
      destaque_latex: '\\boxed{E = 30\\,\\text{kJ}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_29', tipo: 'C', nivel: 'avancado',
  tema: 'Pilhas em série — corrente no circuito',
  enunciado: 'Seis pilhas (\\(\\varepsilon=1{,}5\\,\\text{V}\\), \\(r=0{,}5\\,\\Omega\\)) em série com \\(R=6\\,\\Omega\\). Qual é a corrente?',
  alternativas: { A:'0,5 A', B:'0,75 A', C:'1,0 A', D:'1,5 A', E:'9,0 A' },
  gabarito: 'C',
  explicacao: '\\[\\varepsilon_{\\text{tot}} = 6\\times1{,}5 = 9{,}0\\,\\text{V},\\quad r_{\\text{tot}} = 6\\times0{,}5 = 3{,}0\\,\\Omega\\] \\[I = \\frac{9{,}0}{6+3} = \\frac{9}{9} = 1{,}0\\,\\text{A}\\]',
  steps: [
    {
      titulo: 'Somar f.e.m. e r em série',
      hint: 'ε_tot = 6×1,5; r_tot = 6×0,5',
      explicacao: '',
      linhas_latex: [
        '\\varepsilon_{\\text{tot}} = 9{,}0\\,\\text{V},\\quad r_{\\text{tot}} = 3{,}0\\,\\Omega',
        'I = \\frac{9{,}0}{6+3} = 1{,}0\\,\\text{A}',
      ],
      destaque_latex: '\\boxed{I = 1{,}0\\,\\text{A}} \\quad \\Rightarrow \\text{Alternativa C}',
    },
  ],
},

{
  id: 'fis_c_30', tipo: 'C', nivel: 'avancado',
  tema: 'Conversão completa de energia',
  enunciado: 'Aparelho de 2,0 kW operando 3 h. Expresse a energia em kWh, J, MJ e cal. (1 cal = 4,2 J)',
  alternativas: {
    A: '6 kWh = 2,16×10⁷ J = 21,6 MJ = 5,14×10⁶ cal',
    B: '6 kWh = 2,16×10⁶ J = 2,16 MJ = 5,14×10⁵ cal',
    C: '6 kWh = 2,16×10⁶ J = 21,6 MJ = 5,14×10⁶ cal',
    D: '6 kWh = 2,16×10⁷ J = 2,16 MJ = 5,14×10⁵ cal',
    E: '6 kWh = 2,16×10⁸ J = 216 MJ = 5,14×10⁷ cal'
  },
  gabarito: 'A',
  explicacao: '\\[E = 2{,}0\\times3 = 6\\,\\text{kWh}\\] \\[E = 6\\times3{,}6\\times10^6 = 2{,}16\\times10^7\\,\\text{J} = 21{,}6\\,\\text{MJ}\\] \\[E = \\frac{2{,}16\\times10^7}{4{,}2} \\approx 5{,}14\\times10^6\\,\\text{cal}\\]',
  steps: [
    {
      titulo: 'kWh, J e MJ',
      hint: '1 kWh = 3,6×10⁶ J = 3,6 MJ',
      explicacao: '',
      linhas_latex: [
        'E = 6\\,\\text{kWh} = 6\\times3{,}6\\times10^6 = 2{,}16\\times10^7\\,\\text{J} = 21{,}6\\,\\text{MJ}',
      ],
    },
    {
      titulo: 'Converter para calorias',
      hint: 'E(cal) = E(J) / 4,2',
      explicacao: '',
      linhas_latex: [
        'E = \\frac{2{,}16\\times10^7}{4{,}2} \\approx 5{,}14\\times10^6\\,\\text{cal}',
      ],
      destaque_latex: '\\boxed{6\\,\\text{kWh}=2{,}16{\\times}10^7\\,\\text{J}=21{,}6\\,\\text{MJ}=5{,}14{\\times}10^6\\,\\text{cal}} \\Rightarrow \\text{A}',
    },
  ],
},

// ════════════════════════════════════════════════════════════
// TIPO A — CERTO / ERRADO
// ════════════════════════════════════════════════════════════

{
  id: 'fis_a_01', tipo: 'A', nivel: 'basico',
  tema: 'mAh — unidade de carga, não potência',
  enunciado: 'A unidade mAh (miliampère-hora) é uma unidade de potência elétrica.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Análise dimensional: \\[\\text{mAh} = 10^{-3}\\,\\text{A}\\times3600\\,\\text{s} = 3{,}6\\,\\text{C}\\] mAh equivale a coulombs → é unidade de **carga elétrica**. Potência é medida em watts (\\(\\text{W} = \\text{J/s} = \\text{V}\\cdot\\text{A}\\)). Carga (C) e potência (W) são grandezas distintas.',
},

{
  id: 'fis_a_02', tipo: 'A', nivel: 'basico',
  tema: 'Efeito Joule em qualquer condutor',
  enunciado: 'O Efeito Joule ocorre exclusivamente em resistores convencionais.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. \\(P = I^2R\\) vale para qualquer elemento com \\(R > 0\\) percorrido por corrente — fios, resistência interna de baterias, bobinas, etc. Apenas supercondutores (\\(R = 0\\)) são isentos. A afirmativa restringe indevidamente o fenômeno.',
},

{
  id: 'fis_a_03', tipo: 'A', nivel: 'basico',
  tema: 'kWh — unidade de energia',
  enunciado: 'O kWh é uma unidade de potência elétrica equivalente a 1000 watts.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. \\[1\\,\\text{kWh} = 10^3\\,\\text{W}\\times3600\\,\\text{s} = 3{,}6\\times10^6\\,\\text{J}\\] kWh é unidade de **energia** (joules), não de potência (watts). Confundir energia com potência é um erro conceitual fundamental.',
},

{
  id: 'fis_a_04', tipo: 'A', nivel: 'basico',
  tema: 'Série — correntes não somam',
  enunciado: 'Em geradores em série, as correntes fornecidas por cada gerador somam-se, assim como as f.e.m.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Em série há uma única malha — a corrente \\(I\\) é a mesma em todos os pontos. O que se soma são as f.e.m.: \\[\\varepsilon_{\\text{tot}} = \\sum\\varepsilon_i, \\quad I = \\frac{\\varepsilon_{\\text{tot}}}{R+r_{\\text{tot}}}\\] A soma de correntes ocorre na associação **paralela**.',
},

{
  id: 'fis_a_05', tipo: 'A', nivel: 'intermediario',
  tema: 'P ∝ V² — triplicar V nona a potência',
  enunciado: 'Ao triplicar a tensão (\\(R\\) constante), a potência dissipada triplica.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Como \\(P\\propto V^2\\): \\[P^{\\prime} = \\frac{(3V)^2}{R} = \\frac{9V^2}{R} = 9P\\] Triplicar \\(V\\) **nona** a potência (\\(3^2=9\\)), não a triplica. A relação é quadrática.',
},

{
  id: 'fis_a_06', tipo: 'A', nivel: 'intermediario',
  tema: 'Paralelo — tensão igual em todos os ramos',
  enunciado: 'Em paralelo, a tensão sobre cada resistor é inversamente proporcional à sua resistência.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Em paralelo: \\(V_{R_1} = V_{R_2} = V_{\\text{fonte}}\\). Todos os ramos têm a **mesma** tensão. O que varia inversamente com \\(R\\) é a corrente: \\(I=V/R\\). A afirmativa confunde a propriedade da corrente com a da tensão.',
},

{
  id: 'fis_a_07', tipo: 'A', nivel: 'intermediario',
  tema: 'Mesma energia com potências diferentes',
  enunciado: 'Dois aparelhos com potências diferentes podem consumir a mesma energia total.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. \\(E = P\\cdot t\\) — a energia depende do produto, não da potência isolada. Exemplo: \\[E_A = 2\\,\\text{kW}\\times3\\,\\text{h} = 6\\,\\text{kWh}\\] \\[E_B = 3\\,\\text{kW}\\times2\\,\\text{h} = 6\\,\\text{kWh}\\] Potências distintas resultam na mesma energia se os tempos forem inversamente proporcionais.',
},

{
  id: 'fis_a_08', tipo: 'A', nivel: 'intermediario',
  tema: 'Joule ocorre em CC e CA',
  enunciado: 'O Efeito Joule ocorre apenas em corrente alternada (CA).',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O Efeito Joule ocorre em CC e CA. Para CC: \\(P=I^2R\\) com \\(I\\) constante. Para CA: \\(P=I_{\\text{ef}}^2R\\) com \\(I_{\\text{ef}}\\) sendo o valor RMS. A dissipação depende do quadrado da corrente — não de sua variação temporal.',
},

{
  id: 'fis_a_09', tipo: 'A', nivel: 'avancado',
  tema: 'Motor ideal — η = 100%',
  enunciado: 'Um motor com rendimento de 100% não dissipa calor por Efeito Joule.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Por definição: \\[\\eta = 1{,}0 \\implies P_{\\text{útil}} = P_{\\text{total}}\\] Pela conservação de energia: \\[P_{\\text{calor}} = P_{\\text{total}}-P_{\\text{útil}} = 0\\] Fisicamente equivale a \\(R=0\\) (supercondutor ideal). O enunciado define um **modelo ideal** — matematicamente correto.',
},

{
  id: 'fis_a_10', tipo: 'A', nivel: 'avancado',
  tema: 'J/s ≠ kWh — grandezas distintas',
  enunciado: 'As unidades J/s e kWh são equivalentes, pois ambas representam potência elétrica.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. São grandezas **diferentes**: \\[\\text{J/s} = \\text{W} \\quad (\\textbf{potência})\\] \\[\\text{kWh} = 3{,}6\\times10^6\\,\\text{J} \\quad (\\textbf{energia})\\] A relação entre elas é \\(E = P\\cdot t\\) — produto de potência por tempo resulta em energia. Grandezas distintas nunca são equivalentes.',
},

]; // fim QUESTOES_FIS
