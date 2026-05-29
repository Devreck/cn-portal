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
  explicacao: 'A potência elétrica dissipada por efeito Joule em um resistor ôhmico pode ser calculada pela relação matemática \\(P = \\frac{U^2}{R}\\), onde \\(P\\) representa a potência dissipada, \\(U\\) é a diferença de potencial aplicada e \\(R\\) é a resistência do dispositivo. Substituindo os dados do enunciado na equação, obtemos \\(P = \\frac{20^2}{100} = \\frac{400}{100} = 4,0\\text{ W}\\), confirmando que a alternativa C está correta. A alternativa A está incorreta pois 0,4 W resultaria de um erro dimensional ou da aplicação equivocada da fórmula, enquanto a alternativa B (2,0 W) confunde o valor numérico da corrente elétrica de \\(0,2\\text{ A}\\) multiplicada por um fator incorreto. As alternativas D (40 W) e E (400 W) estão incorretas por falhas na álgebra operacional: 40 W decorre de uma divisão incorreta por 10 em vez de 100, e 400 W representa apenas o termo \\(U^2\\) elevado ao quadrado (\\(20^2 = 400\\)), negligenciando a divisão obrigatória pelo valor da resistência de \\(100\\ \\Omega\\).',
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
  explicacao: 'Para determinar a carga elétrica (\\(Q\\)) liberada por pulso pelo marcapasso, aplicamos a definição de corrente elétrica média, expressa pela relação \\(Q = I \\cdot \\Delta t\\), onde a corrente \\(I = 5{,}0 \\times 10^{-5}\\,\\text{A}\\) multiplicada pelo intervalo de tempo \\(\\Delta t = 1{,}0 \\times 10^{-3}\\,\\text{s}\\) resulta em uma carga de \\(5{,}0 \\times 10^{-8}\\,\\text{C}\\), o que valida a alternativa C como correta. As demais alternativas estão incorretas porque decorrem de erros na manipulação das potências de dez na notação científica durante a multiplicação, cuja regra matemática exige a soma dos expoentes negativos, ou seja, \\(-5 + (-3) = -8\\). A alternativa A (\\(5{,}0 \\times 10^{-2}\\,\\text{C}\\)) e a alternativa E (\\(5{,}0 \\times 10^{-3}\\,\\text{C}\\)) representam valores sobredimensionados que surgiriam de divisões incorretas ou erros grosseiros de escala decimal. Por fim, as alternativas B (\\(5{,}0 \\times 10^{-5}\\,\\text{C}\\)) e D (\\(5{,}0 \\times 10^{-6}\\,\\text{C}\\)) falham ao manter o expoente da corrente praticamente inalterado ou ao realizar uma soma algébrica errônea dos expoentes, desconsiderando a correta aplicação das leis da eletrodinâmica.',
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
  explicacao: 'O gabarito correto é a alternativa C, pois a energia elétrica total (\\(E\\)) armazenada na bateria é obtida pelo produto entre a sua diferença de potencial (\\(V = 2,8\\text{ V}\\)) e a sua carga elétrica total (\\(Q\\)), que deve ser convertida para o Sistema Internacional de Unidades (SI) multiplicando-se a capacidade de \\(1,0\\text{ Ah}\\) por \\(3600\\text{ s/h}\\), resultando em \\(3600\\text{ C}\\); assim, \\(E = V \\cdot Q = 2,8\\text{ V} \\times 3600\\text{ C} = 10080\\text{ J}\\). As alternativas A e E estão incorretas porque desconsideram a conversão de horas para segundos, resultando em valores de \\(2,8\\text{ J}\\) e \\(28\\text{ J}\\), o que viola a homogeneidade dimensional do tempo no cálculo da energia em Joules. A alternativa B está incorreta pois resulta de um erro de conversão ao multiplicar a tensão por \\(36\\) em vez de \\(3600\\), gerando o valor subdimensionado de \\(100,8\\text{ J}\\). Por fim, a alternativa D está incorreta porque assume erroneamente que uma hora possui \\(1000\\) segundos (gerando \\(2800\\text{ J}\\)), ignorando a relação temporal correta do sistema métrico.',
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
  explicacao: 'O gabarito correto é a alternativa C, pois a potência elétrica (\\(P\\)) desenvolvida pelo motor é determinada pelo produto entre a diferença de potencial (\\(U = 400\\text{ V}\\)) e a corrente elétrica (\\(I = 125\\text{ A}\\)), conforme a equação fundamental \\(P = U \\cdot I\\), resultando em \\(50.000\\text{ W}\\), o que equivale a \\(50\\text{ kW}\\). As alternativas A e E estão incorretas porque derivam de uma operação matemática errônea de divisão entre a tensão e a corrente (\\(400 / 125 = 3,2\\)), gerando os valores incorretos de \\(3,2\\text{ W}\\) e \\(3,2\\text{ kW}\\). Por fim, as alternativas B e D estão incorretas devido a erros de multiplicação e de conversão de unidades, nos quais \\(500\\text{ W}\\) representa uma subestimação extrema da potência e \\(500\\text{ kW}\\) resulta de um erro de escala por um fator de dez na conversão de watts para quilowatts.',
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
  explicacao: 'O gabarito correto é a alternativa D, pois a conversão de quilowatt-hora (\\(\\text{kWh}\\)) para joules (\\(\\text{J}\\)) baseia-se na definição de potência e tempo no Sistema Internacional, onde \\(1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3,6 \\times 10^6\\text{ J}\\), o que resulta no cálculo \\(150 \\times 3,6 \\times 10^6\\text{ J} = 5,4 \\times 10^8\\text{ J}\\). As alternativas A e B estão incorretas porque a alternativa A apenas repete o valor numérico de partida sem realizar qualquer conversão de unidades, enquanto a alternativa B apresenta apenas o produto de \\(150 \\times 3,6\\), desconsiderando as potências de dez associadas aos prefixos multiplicativos. Por fim, as alternativas C e E são incorretas porque a C falha na determinação correta da ordem de grandeza ao indicar \\(10^5\\) em vez de \\(10^8\\), e a alternativa E apenas reescreve o valor inicial de \\(150\\) em notação científica (\\(1,5 \\times 10^2\\)) multiplicada por mil, ignorando por completo o fator de conversão temporal de horas para segundos.',
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
  explicacao: 'A alternativa D está correta porque, de acordo com a Primeira Lei de Ohm, a resistência elétrica (\\(R\\)) de um condutor ôhmico é definida pela razão entre a diferença de potencial (\\(U\\)) aplicada e a corrente elétrica (\\(I\\)) que o atravessa, expressa matematicamente por \\(R = \\frac{U}{I}\\). Substituindo os dados do enunciado na equação, obtemos \\(R = \\frac{12}{0,3} = 40\\ \\Omega\\). As demais alternativas estão incorretas porque derivam de equívocos conceituais e operacionais: a alternativa A resulta da inversão matemática da fórmula (\\(\\frac{0,3}{12} = 0,025\\ \\Omega\\)); a alternativa B apresenta o valor numérico correspondente à potência elétrica dissipada em Watts (\\(12 \\times 0,3 = 3,6\\ \\text{W}\\)), e não à resistência; a alternativa C é a mera soma aritmética de grandezas de naturezas físicas distintas (\\(12 + 0,3 = 12,3\\)); e a alternativa E decorre de um erro de posicionamento da vírgula decimal durante a divisão.',
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
  explicacao: 'Na associação em série de geradores elétricos, a força eletromotriz (f.e.m.) equivalente do circuito é obtida pela soma algébrica das f.e.m. individuais de cada pilha, resultando em \\(E_{\\text{total}} = E_1 + E_2 + E_3 + E_4 = 4 \\times 1,5\\text{ V} = 6,0\\text{ V}\\), o que valida a alternativa D como correta. A alternativa A está incorreta pois \\(1,5\\text{ V}\\) representa a f.e.m. de apenas uma única pilha (ou de uma associação em paralelo), enquanto a alternativa B, de \\(3,0\\text{ V}\\), corresponde à associação de apenas duas dessas pilhas em série. Por fim, a alternativa C (\\(4,5\\text{ V}\\)) indica erroneamente a soma de apenas três geradores, e a alternativa E (\\(9,0\\text{ V}\\)) superestima o circuito ao apresentar o valor equivalente a seis pilhas em série, desconsiderando que o sistema é composto por exatamente quatro unidades.',
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
  explicacao: 'O consumo de energia elétrica (\\(E\\)) de um dispositivo, como esta cuba eletrolítica, é determinado pelo produto entre a sua potência ativa (\\(P\\)) e o tempo de operação (\\(\\Delta t\\)), conforme a relação fundamental \\(E = P \\cdot \\Delta t\\). Substituindo os valores fornecidos de potência (\\(5,0\\text{ kW}\\)) e tempo (\\(8\\text{ h}\\)), obtemos \\(E = 5,0 \\cdot 8 = 40\\text{ kWh}\\), o que valida diretamente a alternativa D como o gabarito correto. As demais alternativas estão incorretas porque decorrem de equívocos conceituais e matemáticos: a alternativa A resulta da divisão incorreta da potência pelo tempo (\\(5,0 / 8 = 0,625\\)); a alternativa B desconsidera o fator tempo, repetindo apenas o valor numérico da potência; a alternativa C realiza uma soma fisicamente inconsistente entre grandezas de dimensões distintas (\\(5,0 + 8 = 13\\)); e a alternativa E apresenta um erro de escala por um fator de dez na multiplicação.',
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
  explicacao: 'O gabarito correto é a alternativa D, pois a carga elétrica (\\(Q\\)) armazenada é o produto da corrente pelo tempo (\\(Q = I \\cdot \\Delta t\\)), exigindo a conversão da unidade miliampere-hora (\\(\\text{mAh}\\)) para Coulombs (\\(\\text{C}\\)), que equivale a Ampere-segundo (\\(\\text{A}\\cdot\\text{s}\\)). Como \\(3000\\text{ mAh}\\) é igual a \\(3\\text{ A}\\) e uma hora possui \\(3600\\text{ s}\\), multiplicamos esses valores obtendo \\(Q = 3\\text{ A} \\times 3600\\text{ s} = 10800\\text{ C}\\), tornando o dado de voltagem (\\(3,7\\text{ V}\\)) irrelevante para este cálculo específico. As alternativas A, B e C estão incorretas porque desconsideram a conversão temporal de horas para segundos, sendo que a C apenas iguala numericamente a capacidade em \\(\\text{mAh}\\) diretamente a Coulombs, enquanto A e B cometem erros adicionais de escala decimal. Por fim, a alternativa E está incorreta pois resulta de uma multiplicação direta inadequada por um fator de dez, ignorando completamente a relação física padrão entre as unidades de tempo e corrente.',
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
  explicacao: 'Para determinar a energia total armazenada na bateria em Joules (unidade de energia no Sistema Internacional), devemos utilizar a relação matemática \\(E = q \\cdot U\\), na qual a carga elétrica \\(q\\) precisa ser convertida de miliampere-hora (\\(\\text{mAh}\\)) para Coulombs (\\(\\text{C}\\)), resultando em \\(q = 3000 \\cdot 10^{-3} \\text{ A} \\cdot 3600 \\text{ s} = 10800 \\text{ C}\\). Ao multiplicarmos essa carga pela diferença de potencial de \\(3,7 \\text{ V}\\), encontramos \\(E = 10800 \\text{ C} \\cdot 3,7 \\text{ V} = 39960 \\text{ J}\\), o que justifica o gabarito na alternativa D. A alternativa A está incorreta pois apresenta o valor de \\(11,1\\), que equivale à energia expressa incorretamente em Watt-hora (\\(\\text{Wh}\\)) sem a conversão do tempo para segundos, enquanto a alternativa C provém da multiplicação direta dos valores numéricos dados (\\(3000 \\cdot 3,7 = 11100\\)), ignorando o submúltiplo mili e a conversão de horas. Por fim, as alternativas B e E estão incorretas por representarem erros de escala decimal na conversão das unidades de tempo ou de corrente elétrica, desconsiderando a relação fundamental de que uma hora possui exatamente \\(3600\\) segundos.',
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
  explicacao: 'Para determinar a energia dissipada por efeito Joule em cada pulso do marcapasso, utilizamos a relação da energia como o produto da potência elétrica pelo intervalo de tempo, expressa pela fórmula \\(E = I^2 \\cdot R \\cdot t\\), onde as grandezas devem ser convertidas para as unidades do Sistema Internacional. Convertendo a corrente elétrica para ampères (\\(I = 10\\,\\text{mA} = 10 \\times 10^{-3}\\,\\text{A}\\)) e o tempo para segundos (\\(t = 1{,}0\\,\\text{ms} = 1{,}0 \\times 10^{-3}\\,\\text{s}\\)), realizamos o cálculo: \\(E = (10^{-2}\\,\\text{A})^2 \\cdot 500\\,\\Omega \\cdot 10^{-3}\\,\\text{s} = 10^{-4} \\cdot 500 \\cdot 10^{-3} = 5{,}0 \\times 10^{-5}\\,\\text{J}\\), o que confirma a alternativa B como correta. As demais alternativas estão incorretas porque derivam de erros de cálculo ou de conversão de unidades: a alternativa A resulta de uma divisão incorreta por um fator extra de dez; a alternativa C desconsidera a elevação da corrente ao quadrado na fórmula da potência (\\(P = I \\cdot R\\)); a alternativa D ignora completamente a conversão dos prefixos mili (\\(\\text{m}\\)) da corrente e do tempo; e a alternativa E decorre de um equívoco na manipulação algébrica dos expoentes negativos das potências de dez durante a multiplicação.',
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
  explicacao: 'A alternativa D está correta porque o custo energético industrial é calculado multiplicando-se a potência total pelo tempo de operação e pela tarifa vigente. A potência total das 10 cubas é \\(P_{total} = 10 \\times 3{,}0\\text{ kW} = 30\\text{ kW}\\). O tempo acumulado em 30 dias operando 8 h/dia é \\(t = 30 \\times 8 = 240\\text{ h}\\). Assim, a energia consumida vale \\(E = 30\\text{ kW} \\times 240\\text{ h} = 7200\\text{ kWh}\\), e o custo total resulta em \\(\\text{Custo} = 7200 \\times R\\$\\,0{,}80 = R\\$\\,5760{,}00\\). A alternativa A (\\(R\\$\\,192{,}00\\)) ignora o número de cubas; a B (\\(R\\$\\,576{,}00\\)) despreza o número de dias; a C (\\(R\\$\\,1440{,}00\\)) usa apenas uma cuba; e a E (\\(R\\$\\,7200{,}00\\)) confunde o consumo em kWh com o custo em reais.',
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
  explicacao: 'A alternativa B está correta porque a energia dissipada por Efeito Joule é calculada por \\(E = P \\cdot \\Delta t\\), onde a potência é \\(P = \\frac{U^2}{R} = \\frac{(3{,}0)^2}{150} = \\frac{9}{150} = 0{,}06\\text{ W}\\). Convertendo o tempo para o SI: \\(5\\text{ min} = 300\\text{ s}\\). Assim, \\(E = 0{,}06\\text{ W} \\times 300\\text{ s} = 18\\text{ J}\\), confirmando a alternativa B. A alternativa A (\\(0{,}9\\text{ J}\\)) surge de um erro aritmético; a C (\\(90\\text{ J}\\)) omite a conversão de minutos para segundos; a D (\\(270\\text{ J}\\)) aplica a tensão diretamente sem calcular a potência; e a E (\\(5400\\text{ J}\\)) confunde a unidade de tempo sem converter corretamente.',
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
  explicacao: 'O gabarito correto é a alternativa C, pois a energia consumida ou gerada por um motor de célula a combustível de óxido sólido (SOFC) é calculada pelo produto da potência pelo tempo de operação, expresso pela relação \\(E = P \\cdot \\Delta t\\). Ao convertermos a potência para o Sistema Internacional (\\(50\\text{ kW} = 50.000\\text{ W}\\)) e o tempo para segundos (\\(2\\text{ h} = 7.200\\text{ s}\\)), a multiplicação resulta em \\(E = 50.000\\text{ W} \\cdot 7.200\\text{ s} = 360.000.000\\text{ J}\\), o que equivale exatamente a \\(360\\text{ MJ}\\). A alternativa A está incorreta porque resulta da multiplicação direta e errônea dos valores numéricos sem a devida conversão do tempo para segundos (\\(50 \\cdot 2 = 100\\)), enquanto a alternativa B falha ao aplicar uma conversão de tempo incorreta, subestimando o valor real. Por fim, a alternativa D apresenta o dobro do valor correto por um erro de cálculo operacional, e a alternativa E exibe um erro de escala decimal por um fator de dez (\\(3.600\\text{ MJ}\\)), decorrente de uma conversão inadequada de prefixos métricos.',
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
  explicacao: 'Em uma associação de resistores em paralelo, a diferença de potencial elétrico (tensão) é idêntica em todos os ramos do circuito, o que significa que tanto \\(R_1\\) quanto \\(R_2\\) estão submetidos à tensão de \\(12\\text{ V}\\) da fonte. Aplicando a Primeira Lei de Ohm especificamente ao ramo do resistor \\(R_2\\), calculamos a corrente elétrica como \\(I_2 = \\frac{V}{R_2} = \\frac{12\\text{ V}}{40\\,\\Omega} = 0,3\\text{ A}\\), o que valida a alternativa C como o gabarito correto. As demais alternativas estão incorretas pois a alternativa B (\\(0,2\\text{ A}\\)) representa a corrente que atravessa apenas o resistor \\(R_1\\) (\\(I_1 = \\frac{12\\text{ V}}{60\\,\\Omega}\\)), a alternativa D (\\(0,5\\text{ A}\\)) corresponde à corrente total que entra no circuito (\\(I_{total} = I_1 + I_2\\)), enquanto as alternativas A (\\(0,1\\text{ A}\\)) e E (\\(1,0\\text{ A}\\)) decorrem de erros algébricos ou de interpretação conceitual das propriedades físicas de circuitos em paralelo.',
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
  explicacao: 'O gabarito correto é a alternativa B, pois o rendimento (\\(\\eta\\)) de um motor é definido pela razão entre a potência útil e a potência total de entrada, resultando em \\(\\eta = \\frac{P_{\\text{útil}}}{P_{\\text{entrada}}} = \\frac{400\\,\\text{W}}{500\\,\\text{W}} = 0,8\\) (ou \\(80\\%\\)), enquanto a potência dissipada como calor é a diferença entre a entrada e a útil devido à conservação de energia, ou seja, \\(P_{\\text{dissipada}} = 500\\,\\text{W} - 400\\,\\text{W} = 100\\,\\text{W}\\). A alternativa A está incorreta porque, apesar de apresentar o rendimento correto, indica erroneamente uma dissipação de calor de apenas \\(50\\,\\text{W}\\). A alternativa C está incorreta pois inverte a razão do rendimento, resultando em um impossível \\(125\\%\\), o que violaria a Primeira e a Segunda Lei da Termodinâmica ao propor que o motor gera mais energia do que consome. A alternativa D está incorreta porque confunde o rendimento com a porcentagem de energia dissipada (\\(20\\%\\)) e inverte o valor do calor com o da potência útil. Por fim, a alternativa E está incorreta porque atribui o valor da própria potência útil (\\(400\\,\\text{W}\\)) como sendo a parcela de energia perdida na forma de calor.',
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
  explicacao: 'Para resolver este circuito misto, devemos primeiro calcular a resistência equivalente do trecho em paralelo contendo \\(R_2 = 30\\,\\Omega\\) e \\(R_3 = 15\\,\\Omega\\), utilizando a relação do produto pela soma: \\(R_p = \\frac{30 \\cdot 15}{30 + 15} = 10\\,\\Omega\\). Em seguida, somamos esse resultado ao resistor \\(R_1 = 10\\,\\Omega\\) que está em série, obtendo a resistência equivalente total \\(R_{eq} = R_1 + R_p = 10 + 10 = 20\\,\\Omega\\), o que justifica o gabarito na alternativa B. A alternativa A está incorreta pois desconsidera a soma em série ou representa apenas a etapa do paralelo isolado, enquanto a alternativa C equivale a um erro de cálculo na associação ou à escolha arbitrária do valor de \\(R_2\\). A alternativa D está errada porque resulta da soma direta de todos os resistores (\\(10 + 30 + 15 = 55\\,\\Omega\\)), o que ocorreria apenas se todos estivessem em série, e a alternativa E está incorreta por somar apenas \\(R_2\\) e \\(R_3\\) como se estivessem em série, desconsiderando a presença de \\(R_1\\) e a configuração em paralelo.',
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
  explicacao: 'J}\\) decorre de um erro de escala por um fator de 100, geralmente associado à conversão incorreta de milissegundos para segundos. Por fim, a alternativa E está incorreta pois \\(21{,}6\\text{ J}\\) não condiz com a intermitência dos pulsos, correspondendo a uma estimativa incorreta do tempo ativo do aparelho.',
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
  explicacao: 'A alternativa A está correta porque, ao aplicarmos a Lei de Pouillet para determinar a corrente elétrica do circuito, obtemos \\(i = \\frac{\\varepsilon}{R + r} = \\frac{12\\,\\text{V}}{10\\,\\Omega + 2\\,\\Omega} = 1\\,\\text{A}\\), o que nos permite calcular a tensão útil nos terminais do gerador real pela equação \\(U = \\varepsilon - r \\cdot i = 12\\,\\text{V} - 2\\,\\Omega \\cdot 1\\,\\text{A} = 10\\,\\text{V}\\). A alternativa C está incorreta porque \\(12\\,\\text{V}\\) representa a força eletromotriz total do gerador, valor que só seria igual à tensão nos terminais se o gerador fosse ideal ou estivesse em circuito aberto. As alternativas B e E estão incorretas pois desconsideram a relação matemática exata da queda de tensão interna (\\(r \\cdot i = 2\\,\\text{V}\\)), resultando em valores sem fundamento físico para o circuito apresentado. Por fim, a alternativa D está incorreta porque uma tensão de \\(14\\,\\text{V}\\) é maior que a própria força eletromotriz, o que violaria o princípio da conservação de energia, dado que um gerador real em funcionamento sempre dissipa energia internamente, fazendo com que a tensão de saída seja estritamente menor que a nominal.',
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
  explicacao: 'A potência elétrica dissipada por efeito Joule em um meio condutor submetido a uma diferença de potencial constante \\(U\\) é inversamente proporcional à sua resistência elétrica, conforme a relação matemática \\(P = \\frac{U^2}{R}\\). Dessa forma, como o sangue falciforme apresenta uma resistência quatro vezes maior que o sangue normal (\\(R_f = 4R_n\\)), a potência dissipada por ele sob a mesma ddp será quatro vezes menor, estabelecendo a razão \\(\\frac{P_f}{P_n} = \\frac{R_n}{R_f} = \\frac{1}{4}\\), o que justifica o gabarito na alternativa D. As alternativas A e B estão incorretas pois assumem, de forma equivocada, uma relação de proporcionalidade direta ou linear entre a potência e a resistência, o que só seria válido se a corrente elétrica \\(I\\) fosse mantida constante através da relação \\(P = R \\cdot I^2\\). Por fim, as alternativas C e E estão incorretas porque a alternativa C subestima a redução da potência ao propor uma razão de \\(\\frac{1}{2}\\), enquanto a alternativa E ignora completamente o impacto do aumento da resistência elétrica do sangue falciforme sobre a dissipação de energia por efeito Joule, sugerindo erroneamente que as potências seriam iguais.',
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
  explicacao: 'Para determinar a energia consumida na viagem, calcula-se primeiramente o consumo total em quilowatts-hora (\\(\\text{kWh}\\)) multiplicando a taxa de consumo pela distância de viagem, o que resulta em \\(50\\text{ kWh}\\) (visto que \\(\\frac{20\\text{ kWh}}{100\\text{ km}} \\times 250\\text{ km} = 50\\text{ kWh}\\)). Sabendo que \\(1\\text{ kWh}\\) equivale a \\(3,6\\text{ MJ}\\) (pois \\(1\\text{ kW} \\times 1\\text{ h} = 1000\\text{ W} \\times 3600\\text{ s} = 3,6 \\times 10^6\\text{ J}\\)), multiplicamos \\(50\\text{ kWh}\\) por \\(3,6\\text{ MJ/kWh}\\), obtendo exatamente \\(180\\text{ MJ}\\), o que justifica o gabarito na alternativa C. A alternativa B está incorreta porque apresenta apenas o valor numérico em \\(\\text{kWh}\\) (\\(50\\)), sem realizar a conversão necessária para megajoules, enquanto a alternativa A incorre em um erro de divisão por dez desse valor já convertido. Por fim, as alternativas D e E estão incorretas pois resultam de erros de posicionamento da vírgula decimal ou de fatores multiplicativos incorretos durante a conversão de unidades de energia física.',
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
  explicacao: 'Para determinar a energia térmica dissipada por efeito Joule, primeiramente calculamos a potência elétrica do resistor por meio da equação \\(P = \\frac{U^2}{R}\\), obtendo \\(P = \\frac{100^2}{200} = 50\\text{ W}\\). Multiplicando essa potência pelo intervalo de tempo convertido para segundos no Sistema Internacional (\\(\\Delta t = 10 \\text{ min} = 600\\text{ s}\\)), encontramos a energia dissipada através de \\(E = P \\cdot \\Delta t = 50 \\cdot 600 = 30000\\text{ J}\\), o que justifica o gabarito na alternativa C. A alternativa E está incorreta porque apresenta apenas o valor da potência elétrica (\\(50\\text{ W}\\)) sem considerar o tempo de operação, enquanto a alternativa A falha ao não converter o tempo para segundos, multiplicando a potência diretamente por \\(10\\text{ min}\\). Por fim, as alternativas B e D estão incorretas por conterem erros de cálculo dimensional e de escala decimal, onde a alternativa B considera erroneamente apenas \\(60\\text{ s}\\) de funcionamento e a alternativa D superestima o resultado por um fator de dez.',
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
  explicacao: 'Para determinar a corrente elétrica em um circuito com geradores associados em série, aplicamos a Lei de Pouillet, que estabelece que a corrente (\\(I\\)) é a razão entre a força eletromotriz total e a resistência total do circuito. Como temos seis pilhas em série, a força eletromotriz equivalente é \\(\\varepsilon_{eq} = 6 \\times 1{,}5\\,\\text{V} = 9{,}0\\,\\text{V}\\) e a resistência interna equivalente é \\(r_{eq} = 6 \\times 0{,}5\\,\\Omega = 3{,}0\\,\\Omega\\), totalizando uma resistência de circuito de \\(R_{total} = 6\\,\\Omega + 3\\,\\Omega = 9\\,\\Omega\\), o que resulta em uma corrente de \\(I = \\frac{9\\,\\text{V}}{9\\,\\Omega} = 1{,}0\\,\\text{A}\\), confirmando o gabarito C. As alternativas incorretas decorrem de erros de modelagem física: a alternativa A (\\(0{,}5\\,\\text{A}\\)) considera erroneamente apenas uma única pilha no circuito; a alternativa B (\\(0{,}75\\,\\text{A}\\)) resulta de uma divisão incorreta ou confusão na soma das resistências; a alternativa D (\\(1{,}5\\,\\text{A}\\)) ignora completamente a resistência interna das pilhas no denominador (\\(I = \\frac{9\\,\\text{V}}{6\\,\\Omega}\\)); e a alternativa E (\\(9{,}0\\,\\text{A}\\)) confunde o valor da força eletromotriz total com a corrente elétrica, desconsiderando a oposição à passagem de cargas oferecida pelos resistores.',
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
  explicacao: 'A alternativa A está correta porque, ao calcularmos a energia consumida pelo produto da potência pelo tempo, obtemos \\(E = 2,0\\text{ kW} \\times 3\\text{ h} = 6\\text{ kWh}\\), o que equivale a \\(2,16 \\times 10^7\\text{ J}\\) (visto que \\(1\\text{ kWh} = 3,6 \\times 10^6\\text{ J}\\)), correspondendo diretamente a \\(21,6\\text{ MJ}\\) e, dividindo o valor em Joules por \\(4,2\\), a aproximadamente \\(5,14 \\times 10^6\\text{ cal}\\).',
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
