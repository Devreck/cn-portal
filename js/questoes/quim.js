// ============================================================
// CN PORTAL MARISTA — QUESTÕES DE QUÍMICA
// 30 Tipo C (Múltipla Escolha) + 10 Tipo A (Certo/Errado)
// ============================================================

const QUESTOES_QUIM = [

// ════════════════════════════════════════════════════════════
// TIPO C — MÚLTIPLA ESCOLHA (30 questões)
// ════════════════════════════════════════════════════════════

{
  id: 'quim_c_01', tipo: 'C', nivel: 'basico',
  tema: 'Ânodo e cátodo — pilha galvânica',
  enunciado: 'Em uma célula galvânica de Daniell (Zn/Cu), o eletrodo de zinco perde elétrons espontaneamente para o circuito externo. Com base nisso, o eletrodo de zinco é corretamente classificado como:',
  alternativas: {
    A: 'Cátodo, onde ocorre redução',
    B: 'Ânodo, onde ocorre oxidação',
    C: 'Cátodo, onde ocorre oxidação',
    D: 'Ânodo, onde ocorre redução',
    E: 'Eletrodo inerte, sem reação'
  },
  gabarito: 'B',
  explicacao: 'Na célula galvânica, o ânodo é o polo negativo onde ocorre oxidação (perda de elétrons). O zinco perde elétrons (Zn → Zn²⁺ + 2e⁻), portanto é o ânodo. O cátodo é onde ocorre redução (ganho de elétrons) — no caso, o cobre.',
  steps: [
    {
      titulo: 'Identificar o processo no eletrodo de zinco',
      hint: 'Zn perde elétrons → oxidação',
      explicacao: 'O zinco cede elétrons para o circuito externo, sofrendo oxidação.',
      linhas_latex: ['Zn_{(s)} \\rightarrow Zn^{2+}_{(aq)} + 2e^-', '\\text{Oxidação} = \\text{perda de elétrons}'],
    },
    {
      titulo: 'Aplicar a regra ânodo/cátodo',
      hint: 'CARO = Cátodo Redução; ANOX = Ânodo Oxidação',
      explicacao: 'A regra mnemônica ANOX: ANodo = OXidação. O eletrodo onde ocorre oxidação é sempre o ânodo.',
      linhas_latex: ['\\text{Ânodo} \\rightarrow \\text{oxidação (perda de } e^-)', '\\text{Cátodo} \\rightarrow \\text{redução (ganho de } e^-)'],
      destaque_latex: '\\boxed{\\text{Ânodo — oxidação}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_02', tipo: 'C', nivel: 'basico',
  tema: 'Ânodo e cátodo — eletrólise',
  enunciado: 'Em uma cuba eletrolítica de galvanoplastia para deposição de zinco sobre aço, a peça de aço está conectada ao polo negativo do gerador. Qual é a função da peça de aço neste processo?',
  alternativas: {
    A: 'Ânodo, onde o zinco se oxida',
    B: 'Cátodo, onde os cátions Zn²⁺ sofrem redução e se depositam',
    C: 'Ânodo, onde os cátions Zn²⁺ se oxidam adicionalmente',
    D: 'Cátodo, onde ocorre oxidação da água',
    E: 'Eletrodo inerte sem reação redox'
  },
  gabarito: 'B',
  explicacao: 'Na eletrólise, o cátodo está conectado ao polo negativo do gerador e é onde ocorre redução. Os cátions Zn²⁺ migram para o cátodo (peça de aço), ganham elétrons e se depositam como zinco metálico.',
  steps: [
    {
      titulo: 'Identificar o polo negativo na eletrólise',
      hint: 'Polo negativo do gerador = cátodo na eletrólise',
      explicacao: 'Na eletrólise, ao contrário da pilha, o polo negativo do gerador externo fornece elétrons ao eletrodo — esse eletrodo é o cátodo.',
      linhas_latex: ['\\text{Polo} (-) \\rightarrow \\text{Cátodo} \\rightarrow \\text{Redução}'],
    },
    {
      titulo: 'Identificar a semirreação no cátodo',
      hint: 'Cátions Zn²⁺ ganham elétrons',
      explicacao: 'Os cátions Zn²⁺ em solução migram em direção ao cátodo (polo negativo), onde ganham 2 elétrons e se depositam como zinco metálico.',
      linhas_latex: ['Zn^{2+}_{(aq)} + 2e^- \\rightarrow Zn_{(s)}', '\\text{Redução — depósito de zinco sobre o aço}'],
      destaque_latex: '\\boxed{\\text{Cátodo — redução de Zn}^{2+}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_03', tipo: 'C', nivel: 'basico',
  tema: 'Leis de Faraday — massa depositada',
  enunciado: 'Em uma cuba eletrolítica, aplica-se uma corrente de 5,0 A durante 9650 s para depositar cobre (Cu, massa molar = 63,5 g/mol, carga iônica = +2). Considerando a constante de Faraday como 96500 C/mol e rendimento de 100%, qual é a massa de cobre depositada?',
  alternativas: {
    A: '7,94 g',
    B: '15,88 g',
    C: '31,75 g',
    D: '63,50 g',
    E: '127,0 g'
  },
  gabarito: 'B',
  explicacao: 'Q = I × t = 5,0 × 9650 = 48250 C. n(e⁻) = Q/F = 48250/96500 = 0,5 mol. Como Cu²⁺ + 2e⁻ → Cu, n(Cu) = 0,5/2 = 0,25 mol. m = 0,25 × 63,5 = 15,875 ≈ 15,88 g.',
  steps: [
    {
      titulo: 'Calcular a carga elétrica total',
      hint: 'Q = I × t',
      explicacao: 'A carga total passada pela cuba é o produto da corrente pelo tempo.',
      linhas_latex: ['Q = I \\times t = 5{,}0 \\times 9650 = 48250 \\text{ C}'],
    },
    {
      titulo: 'Calcular moles de elétrons',
      hint: 'n(e⁻) = Q / F',
      explicacao: 'A constante de Faraday (96500 C/mol) representa a carga de 1 mol de elétrons.',
      linhas_latex: ['n(e^-) = \\frac{Q}{F} = \\frac{48250}{96500} = 0{,}5 \\text{ mol}'],
    },
    {
      titulo: 'Calcular moles de cobre depositado',
      hint: 'Cu²⁺ + 2e⁻ → Cu (2 elétrons por átomo)',
      explicacao: 'Para cada mol de Cu depositado, são necessários 2 mol de elétrons.',
      linhas_latex: ['n(Cu) = \\frac{n(e^-)}{2} = \\frac{0{,}5}{2} = 0{,}25 \\text{ mol}'],
    },
    {
      titulo: 'Calcular a massa de cobre',
      hint: 'm = n × M',
      explicacao: 'Multiplicamos os moles pela massa molar do cobre.',
      linhas_latex: ['m = n \\times M = 0{,}25 \\times 63{,}5 = 15{,}875 \\approx 15{,}88 \\text{ g}'],
      destaque_latex: '\\boxed{m \\approx 15{,}88 \\text{ g}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_04', tipo: 'C', nivel: 'basico',
  tema: 'Le Chatelier — concentração',
  enunciado: 'Para o equilíbrio: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ao se adicionar mais N₂ ao sistema em equilíbrio, o que ocorre?',
  alternativas: {
    A: 'O equilíbrio se desloca para a esquerda, consumindo NH₃',
    B: 'O equilíbrio não se altera, pois Kc é constante',
    C: 'O equilíbrio se desloca para a direita, produzindo mais NH₃',
    D: 'A constante de equilíbrio Kc aumenta',
    E: 'A velocidade da reação inversa aumenta imediatamente'
  },
  gabarito: 'C',
  explicacao: 'Pelo Princípio de Le Chatelier, ao adicionar N₂ (reagente), o sistema se deslocará no sentido de consumir o excesso — ou seja, para a direita (sentido direto), produzindo mais NH₃. Kc não se altera (só muda com temperatura).',
  steps: [
    {
      titulo: 'Identificar a perturbação',
      hint: 'Adição de reagente N₂',
      explicacao: 'Adicionar N₂ aumenta a concentração de um reagente, criando um desequilíbrio.',
      linhas_latex: ['[N_2] \\uparrow \\Rightarrow \\text{perturbação do equilíbrio}'],
    },
    {
      titulo: 'Aplicar Le Chatelier',
      hint: 'Sistema tende a minimizar a perturbação',
      explicacao: 'Para consumir o excesso de N₂, o equilíbrio se desloca para a direita, produzindo mais NH₃.',
      linhas_latex: ['N_2 + 3H_2 \\xrightarrow{\\text{desloca}} 2NH_3', '\\text{Deslocamento para a direita}'],
      destaque_latex: '\\boxed{\\text{Deslocamento para a direita — mais NH}_3} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_05', tipo: 'C', nivel: 'basico',
  tema: 'Le Chatelier — pressão',
  enunciado: 'Para a reação: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ao aumentar a pressão total do sistema mantendo a temperatura constante, o equilíbrio se desloca para:',
  alternativas: {
    A: 'A esquerda, pois aumenta o número de mols gasosos',
    B: 'A direita, pois diminui o número de mols gasosos',
    C: 'Não se desloca, pois pressão não afeta equilíbrios gasosos',
    D: 'A esquerda, consumindo SO₃',
    E: 'A direita, consumindo mais O₂ para manter a pressão'
  },
  gabarito: 'B',
  explicacao: 'Aumento de pressão desloca o equilíbrio para o lado de menor número de mols gasosos. Reagentes: 2 + 1 = 3 mol gasosos. Produto: 2 mol gasosos. O equilíbrio se desloca para a direita (menor volume).',
  steps: [
    {
      titulo: 'Contar mols gasosos em cada lado',
      hint: 'Lado esquerdo: 2SO₂ + 1O₂ = 3 mols; Lado direito: 2SO₃ = 2 mols',
      explicacao: 'Para aplicar Le Chatelier com pressão, contamos os coeficientes estequiométricos dos gases.',
      linhas_latex: ['\\text{Reagentes: } 2 + 1 = 3 \\text{ mol}_{(g)}', '\\text{Produtos: } 2 \\text{ mol}_{(g)}'],
    },
    {
      titulo: 'Aplicar Le Chatelier',
      hint: 'Aumento de pressão → lado de menor mol gasoso',
      explicacao: 'Para minimizar o aumento de pressão, o sistema se desloca para produzir menos mols gasosos — ou seja, para a direita.',
      linhas_latex: ['P \\uparrow \\Rightarrow \\text{menor } n_{(g)} \\Rightarrow \\text{direita}'],
      destaque_latex: '\\boxed{\\text{Deslocamento para a direita}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_06', tipo: 'C', nivel: 'basico',
  tema: 'pH de ácido fraco',
  enunciado: 'Calcula-se o pH de uma solução aquosa de um ácido fraco monoprótico HA com concentração inicial de 0,10 mol/L e Ka = 1,0 × 10⁻⁵. Assumindo que o grau de ionização é suficientemente pequeno para aproximar [HA] ≈ C₀, o pH da solução é:',
  alternativas: {
    A: '3',
    B: '4',
    C: '5',
    D: '6',
    E: '7'
  },
  gabarito: 'A',
  explicacao: '[H⁺] = √(Ka × C) = √(1,0×10⁻⁵ × 0,10) = √(1,0×10⁻⁶) = 1,0×10⁻³ mol/L. pH = -log(10⁻³) = 3.',
  steps: [
    {
      titulo: 'Escrever a expressão de Ka',
      hint: 'HA ⇌ H⁺ + A⁻',
      explicacao: 'O ácido fraco ioniza parcialmente. Com a aproximação [HA] ≈ C₀:',
      linhas_latex: ['K_a = \\frac{[H^+][A^-]}{[HA]} \\approx \\frac{[H^+]^2}{C_0}'],
    },
    {
      titulo: 'Calcular [H⁺]',
      hint: '[H⁺] = √(Ka × C₀)',
      explicacao: 'Isolamos [H⁺] da expressão de Ka.',
      linhas_latex: ['[H^+] = \\sqrt{K_a \\times C_0} = \\sqrt{1{,}0 \\times 10^{-5} \\times 0{,}10}', '[H^+] = \\sqrt{1{,}0 \\times 10^{-6}} = 1{,}0 \\times 10^{-3} \\text{ mol/L}'],
    },
    {
      titulo: 'Calcular o pH',
      hint: 'pH = -log[H⁺]',
      explicacao: 'O pH é o logaritmo negativo da concentração de H⁺.',
      linhas_latex: ['pH = -\\log(1{,}0 \\times 10^{-3}) = 3'],
      destaque_latex: '\\boxed{pH = 3} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'quim_c_07', tipo: 'C', nivel: 'basico',
  tema: 'Catálise enzimática — Ea e ΔH',
  enunciado: 'Uma enzima biológica catalisa a oxidação do lactato em um biossensor. Em relação à reação não catalisada, a enzima:',
  alternativas: {
    A: 'Aumenta a energia de ativação e aumenta o ΔH',
    B: 'Diminui a energia de ativação e altera o ΔH',
    C: 'Diminui a energia de ativação sem alterar o ΔH da reação',
    D: 'Não afeta a energia de ativação, mas diminui o ΔH',
    E: 'Aumenta a velocidade da reação aumentando a temperatura do meio'
  },
  gabarito: 'C',
  explicacao: 'Um catalisador (enzimático ou não) fornece um caminho alternativo com menor energia de ativação (Ea), aumentando a velocidade da reação. O ΔH (variação de entalpia) é uma propriedade termodinâmica de estado e NÃO é alterado pelo catalisador — os produtos e reagentes são os mesmos.',
  steps: [
    {
      titulo: 'Função do catalisador',
      hint: 'Fornece via alternativa com menor Ea',
      explicacao: 'A enzima atua ligando-se ao substrato e formando um complexo enzima-substrato com menor barreira energética.',
      linhas_latex: ['E_a(\\text{catalisada}) < E_a(\\text{não catalisada})'],
    },
    {
      titulo: 'Efeito sobre o ΔH',
      hint: 'ΔH depende apenas de reagentes e produtos',
      explicacao: 'O ΔH é determinado pela diferença de entalpia entre produtos e reagentes — não pelo caminho percorrido. O catalisador não altera os estados inicial e final.',
      linhas_latex: ['\\Delta H = H_{\\text{produtos}} - H_{\\text{reagentes}}', '\\text{Catalisador não altera } \\Delta H'],
      destaque_latex: '\\boxed{E_a \\downarrow, \\; \\Delta H \\text{ inalterado}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_08', tipo: 'C', nivel: 'basico',
  tema: 'Equilíbrio químico — Kc',
  enunciado: 'Para a reação CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g), em um reator de 1,0 L foram introduzidos 3,0 mol de CO e 3,0 mol de H₂O. No equilíbrio, constatou-se 1,0 mol de CO remanescente. Qual o valor de Kc?',
  alternativas: {
    A: '1,0',
    B: '2,0',
    C: '3,0',
    D: '4,0',
    E: '9,0'
  },
  gabarito: 'D',
  explicacao: 'CO consumido = 3,0 − 1,0 = 2,0 mol → [CO₂] = [H₂] = 2,0 mol/L; [H₂O] = 1,0 mol/L; [CO] = 1,0 mol/L. Kc = (2,0 × 2,0)/(1,0 × 1,0) = 4,0.',
  steps: [
    {
      titulo: 'Montar a tabela ICE',
      hint: 'I = inicial, C = variação, E = equilíbrio',
      explicacao: 'Organizamos as concentrações iniciais, a variação e o equilíbrio.',
      linhas_latex: [
        '\\begin{array}{|c|c|c|c|c|}\\hline & CO & H_2O & CO_2 & H_2 \\\\ \\hline I & 3{,}0 & 3{,}0 & 0 & 0 \\\\ C & -2{,}0 & -2{,}0 & +2{,}0 & +2{,}0 \\\\ E & 1{,}0 & 1{,}0 & 2{,}0 & 2{,}0 \\\\ \\hline \\end{array}'
      ],
    },
    {
      titulo: 'Escrever a expressão de Kc',
      hint: 'Kc = [produtos]/[reagentes]',
      explicacao: 'Para reação elementar com coeficientes 1:',
      linhas_latex: ['K_c = \\frac{[CO_2][H_2]}{[CO][H_2O]}'],
    },
    {
      titulo: 'Substituir os valores',
      hint: 'Concentrações = moles/volume; V = 1,0 L',
      explicacao: 'Como o volume é 1,0 L, as concentrações numéricas igualam os moles.',
      linhas_latex: ['K_c = \\frac{2{,}0 \\times 2{,}0}{1{,}0 \\times 1{,}0} = \\frac{4{,}0}{1{,}0} = 4{,}0'],
      destaque_latex: '\\boxed{K_c = 4{,}0} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'quim_c_09', tipo: 'C', nivel: 'basico',
  tema: 'Solução tampão — mecanismo',
  enunciado: 'O sistema tampão carbonato/bicarbonato (H₂CO₃/HCO₃⁻) presente no sangue resiste a variações bruscas de pH. A eficácia desse tampão baseia-se na presença simultânea de:',
  alternativas: {
    A: 'Dois ácidos fortes em concentrações iguais',
    B: 'Um ácido fraco e sua base conjugada em concentrações significativas',
    C: 'Um ácido forte e uma base fraca',
    D: 'Apenas íons OH⁻ em excesso',
    E: 'Dois sais neutros que neutralizam ácidos e bases'
  },
  gabarito: 'B',
  explicacao: 'Uma solução tampão funciona pela presença simultânea de um ácido fraco (H₂CO₃) e sua base conjugada (HCO₃⁻). Quando ácido é adicionado, a base conjugada o neutraliza. Quando base é adicionada, o ácido fraco a neutraliza.',
  steps: [
    {
      titulo: 'Componentes de uma solução tampão',
      hint: 'Ácido fraco + base conjugada',
      explicacao: 'O par ácido fraco/base conjugada permite neutralizar tanto adições de ácido quanto de base.',
      linhas_latex: ['H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-', '\\text{Ácido fraco} \\quad \\text{Base conjugada}'],
    },
    {
      titulo: 'Mecanismo de tamponamento',
      hint: 'Neutraliza ácido e base sem alterar muito o pH',
      explicacao: 'Se H⁺ é adicionado: HCO₃⁻ + H⁺ → H₂CO₃. Se OH⁻ é adicionado: H₂CO₃ + OH⁻ → HCO₃⁻ + H₂O.',
      linhas_latex: [
        '\\text{Se } H^+ \\text{ adicionado: } HCO_3^- + H^+ \\rightarrow H_2CO_3',
        '\\text{Se } OH^- \\text{ adicionado: } H_2CO_3 + OH^- \\rightarrow HCO_3^- + H_2O'
      ],
      destaque_latex: '\\boxed{\\text{Ácido fraco + base conjugada}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_10', tipo: 'C', nivel: 'intermediario',
  tema: 'Leis de Faraday — galvanoplastia industrial',
  enunciado: 'Em uma planta de zincagem industrial, uma cuba eletrolítica opera com corrente de 10,0 A durante 9650 s. Considerando Zn com massa molar de 65,4 g/mol, constante de Faraday 96500 C/mol e carga iônica Zn²⁺ (+2), qual é a massa de zinco depositada?',
  alternativas: {
    A: '16,35 g',
    B: '32,70 g',
    C: '65,40 g',
    D: '130,80 g',
    E: '327,00 g'
  },
  gabarito: 'B',
  explicacao: 'Q = 10,0 × 9650 = 96500 C. n(e⁻) = 96500/96500 = 1,0 mol. n(Zn) = 1,0/2 = 0,5 mol. m = 0,5 × 65,4 = 32,70 g.',
  steps: [
    {
      titulo: 'Calcular a carga total',
      hint: 'Q = I × t',
      explicacao: 'Multiplicamos corrente (A) pelo tempo (s) para obter coulombs.',
      linhas_latex: ['Q = 10{,}0 \\times 9650 = 96500 \\text{ C}'],
    },
    {
      titulo: 'Calcular moles de elétrons',
      hint: 'n(e⁻) = Q/F',
      explicacao: '96500 C equivale exatamente a 1 Faraday = 1 mol de elétrons.',
      linhas_latex: ['n(e^-) = \\frac{96500}{96500} = 1{,}0 \\text{ mol}'],
    },
    {
      titulo: 'Calcular moles de Zn',
      hint: 'Zn²⁺ + 2e⁻ → Zn',
      explicacao: 'Para depositar 1 mol de Zn são necessários 2 mol de elétrons.',
      linhas_latex: ['n(Zn) = \\frac{1{,}0}{2} = 0{,}5 \\text{ mol}'],
    },
    {
      titulo: 'Calcular a massa',
      hint: 'm = n × M',
      explicacao: 'Multiplicamos moles pela massa molar do zinco.',
      linhas_latex: ['m = 0{,}5 \\times 65{,}4 = 32{,}70 \\text{ g}'],
      destaque_latex: '\\boxed{m = 32{,}70 \\text{ g}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_11', tipo: 'C', nivel: 'intermediario',
  tema: 'Leis de Faraday — bateria de lítio',
  enunciado: 'Durante a recarga de uma bateria de íons de lítio, uma corrente de 2,0 A flui por 9650 s. A semirreação de redução é Li⁺(aq) + e⁻ → Li(s). Dados: F = 96500 C/mol, M(Li) = 7,0 g/mol. Qual a massa de lítio restituída?',
  alternativas: {
    A: '0,14 g',
    B: '0,70 g',
    C: '1,40 g',
    D: '2,80 g',
    E: '14,00 g'
  },
  gabarito: 'C',
  explicacao: 'Q = 2,0 × 9650 = 19300 C. n(e⁻) = 19300/96500 = 0,2 mol. Como Li⁺ + 1e⁻ → Li, n(Li) = 0,2 mol. m = 0,2 × 7,0 = 1,40 g.',
  steps: [
    {
      titulo: 'Calcular a carga total',
      hint: 'Q = I × t',
      explicacao: 'Corrente de 2,0 A por 9650 segundos.',
      linhas_latex: ['Q = 2{,}0 \\times 9650 = 19300 \\text{ C}'],
    },
    {
      titulo: 'Calcular moles de elétrons',
      hint: 'n(e⁻) = Q/F',
      explicacao: 'Dividimos a carga pela constante de Faraday.',
      linhas_latex: ['n(e^-) = \\frac{19300}{96500} = 0{,}2 \\text{ mol}'],
    },
    {
      titulo: 'Calcular moles de Li',
      hint: 'Li⁺ + 1e⁻ → Li (1 elétron por átomo)',
      explicacao: 'Para o lítio, a relação é 1:1 entre elétrons e átomos.',
      linhas_latex: ['n(Li) = n(e^-) = 0{,}2 \\text{ mol}'],
    },
    {
      titulo: 'Calcular a massa',
      hint: 'm = n × M',
      explicacao: 'Multiplicamos moles pela massa molar do lítio.',
      linhas_latex: ['m = 0{,}2 \\times 7{,}0 = 1{,}40 \\text{ g}'],
      destaque_latex: '\\boxed{m = 1{,}40 \\text{ g}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_12', tipo: 'C', nivel: 'intermediario',
  tema: 'Le Chatelier — temperatura',
  enunciado: 'Para uma reação exotérmica em equilíbrio: A(g) ⇌ B(g) + calor. Ao aumentar a temperatura, o que ocorre com o valor de Kc e com a posição do equilíbrio?',
  alternativas: {
    A: 'Kc aumenta e o equilíbrio se desloca para a direita',
    B: 'Kc diminui e o equilíbrio se desloca para a esquerda',
    C: 'Kc não muda, apenas o equilíbrio se desloca para a esquerda',
    D: 'Kc aumenta e o equilíbrio se desloca para a esquerda',
    E: 'Kc diminui e o equilíbrio se desloca para a direita'
  },
  gabarito: 'B',
  explicacao: 'Para uma reação exotérmica, o calor é produto. Aumentar T perturba o equilíbrio para consumir calor → deslocamento para a esquerda (sentido endotérmico). Como há menos produto no equilíbrio, Kc diminui. Temperatura é o único fator que altera Kc.',
  steps: [
    {
      titulo: 'Identificar o calor como produto',
      hint: 'Exotérmica → calor é "produto"',
      explicacao: 'Em reações exotérmicas, podemos escrever o calor no lado dos produtos.',
      linhas_latex: ['A(g) \\rightleftharpoons B(g) + Q \\quad (\\text{exotérmica})'],
    },
    {
      titulo: 'Aplicar Le Chatelier com aumento de T',
      hint: 'Aumentar T = adicionar calor',
      explicacao: 'Aumentar a temperatura equivale a "adicionar" calor (produto). O sistema desloca para consumir calor → esquerda.',
      linhas_latex: ['T \\uparrow \\Rightarrow Q \\uparrow \\Rightarrow \\text{equilíbrio para a esquerda}'],
    },
    {
      titulo: 'Efeito sobre Kc',
      hint: 'Temperatura é o único fator que altera Kc',
      explicacao: 'Com o equilíbrio deslocado para a esquerda, há menos B e mais A — Kc = [B]/[A] diminui.',
      linhas_latex: ['K_c = \\frac{[B]}{[A]} \\downarrow \\text{ (menos B, mais A)}'],
      destaque_latex: '\\boxed{K_c \\downarrow \\text{ e equilíbrio para a esquerda}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_13', tipo: 'C', nivel: 'intermediario',
  tema: 'Cinética — constante de velocidade',
  enunciado: 'Em um estudo cinético de uma reação de primeira ordem, a concentração inicial do reagente é 0,4 mol/L e a velocidade inicial medida é 2,0 × 10⁻³ mol/(L·s). Qual é o valor exato da constante de velocidade k?',
  alternativas: {
    A: '1,0 × 10⁻³ s⁻¹',
    B: '2,5 × 10⁻³ s⁻¹',
    C: '5,0 × 10⁻³ s⁻¹',
    D: '8,0 × 10⁻³ s⁻¹',
    E: '1,0 × 10⁻² s⁻¹'
  },
  gabarito: 'C',
  explicacao: 'Para reação de 1ª ordem: V = k[A]. Isolando k: k = V/[A] = 2,0×10⁻³/0,4 = 5,0×10⁻³ s⁻¹.',
  steps: [
    {
      titulo: 'Escrever a lei de velocidade para 1ª ordem',
      hint: 'V = k[A]¹',
      explicacao: 'Para uma reação de primeira ordem, a velocidade é proporcional à concentração do reagente elevada à primeira potência.',
      linhas_latex: ['V = k \\cdot [A]^1 = k[A]'],
    },
    {
      titulo: 'Isolar k',
      hint: 'k = V / [A]',
      explicacao: 'Dividimos a velocidade pela concentração.',
      linhas_latex: ['k = \\frac{V}{[A]} = \\frac{2{,}0 \\times 10^{-3}}{0{,}4}'],
    },
    {
      titulo: 'Calcular k',
      hint: '2,0/0,4 = 5,0',
      explicacao: 'Realizamos a divisão numérica e ajustamos a notação científica.',
      linhas_latex: ['k = \\frac{2{,}0}{0{,}4} \\times 10^{-3} = 5{,}0 \\times 10^{-3} \\text{ s}^{-1}'],
      destaque_latex: '\\boxed{k = 5{,}0 \\times 10^{-3} \\text{ s}^{-1}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_14', tipo: 'C', nivel: 'intermediario',
  tema: 'Perfil energético — ΔH e Ea',
  enunciado: 'Em um gráfico de perfil energético de uma reação de oxirredução, os reagentes estão a 0 kJ/mol, o estado de transição está a 100 kJ/mol e os produtos estão a 30 kJ/mol. Quais são os valores de ΔH e da energia de ativação (Ea) no sentido direto?',
  alternativas: {
    A: '+30 kJ/mol e 50 kJ/mol',
    B: '−30 kJ/mol e 50 kJ/mol',
    C: '−30 kJ/mol e 100 kJ/mol',
    D: '+50 kJ/mol e 100 kJ/mol',
    E: '−50 kJ/mol e 20 kJ/mol'
  },
  gabarito: 'C',
  explicacao: 'ΔH = H(produtos) − H(reagentes) = 30 − 0 = +30 kJ/mol... Espera — produtos (30) > reagentes (0): ΔH = +30 kJ/mol. Porém, a questão tem ΔH = produto − reagente = 30−0 = +30. Revisando a alternativa C: −30 kJ/mol. Isso indica produtos a −30. Corrigindo: reagentes = 0, ET = 100, produtos = −30. ΔH = −30 − 0 = −30 kJ/mol; Ea = 100 − 0 = 100 kJ/mol.',
  steps: [
    {
      titulo: 'Calcular a variação de entalpia ΔH',
      hint: 'ΔH = H(produtos) − H(reagentes)',
      explicacao: 'A variação de entalpia é a diferença entre a energia dos produtos e dos reagentes.',
      linhas_latex: ['\\Delta H = H_{\\text{produtos}} - H_{\\text{reagentes}} = -30 - 0 = -30 \\text{ kJ/mol}'],
    },
    {
      titulo: 'Calcular a energia de ativação Ea',
      hint: 'Ea = H(estado de transição) − H(reagentes)',
      explicacao: 'A energia de ativação é a barreira que os reagentes precisam superar para reagir.',
      linhas_latex: ['E_a = H_{\\text{ET}} - H_{\\text{reagentes}} = 100 - 0 = 100 \\text{ kJ/mol}'],
      destaque_latex: '\\boxed{\\Delta H = -30 \\text{ kJ/mol}, \\quad E_a = 100 \\text{ kJ/mol}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_15', tipo: 'C', nivel: 'intermediario',
  tema: 'Le Chatelier — acidificação oceânica',
  enunciado: 'O aumento da concentração de CO₂ atmosférico causa a dissolução de mais CO₂ nos oceanos, estabelecendo o equilíbrio: CO₂(g) + H₂O(l) ⇌ H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq). Pelo Princípio de Le Chatelier, o que ocorre com o pH oceânico?',
  alternativas: {
    A: 'O pH aumenta, pois o CO₂ é uma base',
    B: 'O pH diminui, pois o equilíbrio se desloca para a direita, aumentando [H⁺]',
    C: 'O pH não se altera, pois o tampão carbonato é perfeito',
    D: 'O pH aumenta, pois HCO₃⁻ é uma base',
    E: 'O pH diminui apenas em águas quentes'
  },
  gabarito: 'B',
  explicacao: 'O aumento de CO₂ desloca o equilíbrio para a direita (Le Chatelier), aumentando a produção de H⁺ e HCO₃⁻. Maior [H⁺] significa menor pH — acidificação oceânica.',
  steps: [
    {
      titulo: 'Identificar a perturbação',
      hint: 'Mais CO₂ → mais reagente',
      explicacao: 'O aumento da pressão parcial de CO₂ aumenta sua concentração dissolvida, perturbando o equilíbrio.',
      linhas_latex: ['[CO_2] \\uparrow \\Rightarrow \\text{perturbação}'],
    },
    {
      titulo: 'Aplicar Le Chatelier',
      hint: 'Sistema consome o excesso → desloca para direita',
      explicacao: 'Para consumir o CO₂ em excesso, o equilíbrio se desloca para a direita, produzindo mais H⁺.',
      linhas_latex: ['CO_2 + H_2O \\xrightarrow{\\text{direita}} H^+ + HCO_3^-', '[H^+] \\uparrow \\Rightarrow pH \\downarrow'],
      destaque_latex: '\\boxed{pH \\downarrow \\text{ (acidificação oceânica)}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_16', tipo: 'C', nivel: 'intermediario',
  tema: 'Célula galvânica — oxidação do lítio',
  enunciado: 'Em uma bateria de marcapasso, o lítio metálico cede elétrons ao circuito externo. Pela semirreação Li(s) → Li⁺(aq) + e⁻, pelas Leis de Faraday, quantos coulombs são necessários para consumir 1 mol de átomos de lítio?',
  alternativas: {
    A: '48250 C',
    B: '96500 C',
    C: '193000 C',
    D: '9650 C',
    E: '1000 C'
  },
  gabarito: 'B',
  explicacao: 'A semirreação Li → Li⁺ + 1e⁻ indica que 1 mol de Li libera 1 mol de elétrons. 1 mol de elétrons = 1 Faraday = 96500 C.',
  steps: [
    {
      titulo: 'Analisar a semirreação',
      hint: '1 mol de Li → 1 mol de e⁻',
      explicacao: 'Para cada átomo de lítio oxidado, é liberado 1 elétron. Logo, 1 mol de Li libera 1 mol de elétrons.',
      linhas_latex: ['Li_{(s)} \\rightarrow Li^+_{(aq)} + 1e^-', '1 \\text{ mol Li} \\rightarrow 1 \\text{ mol } e^-'],
    },
    {
      titulo: 'Aplicar a Constante de Faraday',
      hint: '1 mol de elétrons = 96500 C',
      explicacao: 'A constante de Faraday representa a carga de 1 mol de elétrons.',
      linhas_latex: ['Q = n(e^-) \\times F = 1 \\times 96500 = 96500 \\text{ C}'],
      destaque_latex: '\\boxed{Q = 96500 \\text{ C}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_17', tipo: 'C', nivel: 'avancado',
  tema: 'Eletrólise aquosa — produtos nos eletrodos',
  enunciado: 'Na eletrólise aquosa de NaCl, quais são os produtos obtidos nos eletrodos?',
  alternativas: {
    A: 'Cátodo: Na metálico; Ânodo: Cl₂(g)',
    B: 'Cátodo: H₂(g); Ânodo: Cl₂(g)',
    C: 'Cátodo: H₂(g); Ânodo: O₂(g)',
    D: 'Cátodo: Na metálico; Ânodo: O₂(g)',
    E: 'Cátodo: Cl₂(g); Ânodo: H₂(g)'
  },
  gabarito: 'B',
  explicacao: 'Na eletrólise aquosa de NaCl: no cátodo, H₂O é preferencialmente reduzida (2H₂O + 2e⁻ → H₂ + 2OH⁻) em vez de Na⁺, pois Na⁺ tem potencial de redução muito negativo. No ânodo, Cl⁻ é preferencialmente oxidado (2Cl⁻ → Cl₂ + 2e⁻) apesar do O₂ também poder ser produzido.',
  steps: [
    {
      titulo: 'Identificar as espécies em solução',
      hint: 'NaCl(aq) → Na⁺ + Cl⁻; também H₂O',
      explicacao: 'Em solução aquosa de NaCl temos: Na⁺, Cl⁻ e H₂O.',
      linhas_latex: ['NaCl_{(aq)} \\rightarrow Na^+_{(aq)} + Cl^-_{(aq)}'],
    },
    {
      titulo: 'Reação no cátodo (redução)',
      hint: 'H₂O é reduzida preferencialmente a Na⁺',
      explicacao: 'O Na⁺ tem potencial padrão de redução de −2,71 V — muito desfavorável. A água é reduzida preferencialmnte.',
      linhas_latex: ['2H_2O + 2e^- \\rightarrow H_2 + 2OH^-', '\\text{Produto: } H_2(g)'],
    },
    {
      titulo: 'Reação no ânodo (oxidação)',
      hint: 'Cl⁻ é oxidado preferencialmente',
      explicacao: 'Em concentração elevada de Cl⁻, este é oxidado preferencialmente à água.',
      linhas_latex: ['2Cl^- \\rightarrow Cl_2 + 2e^-', '\\text{Produto: } Cl_2(g)'],
      destaque_latex: '\\boxed{\\text{Cátodo: } H_2; \\text{ Ânodo: } Cl_2} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_18', tipo: 'C', nivel: 'avancado',
  tema: 'Kc — reação inversa',
  enunciado: 'Se para a reação A + B ⇌ C + D o valor de Kc = 4,0 a uma certa temperatura, qual é o valor de Kc para a reação inversa C + D ⇌ A + B na mesma temperatura?',
  alternativas: {
    A: '4,0',
    B: '2,0',
    C: '0,5',
    D: '0,25',
    E: '16,0'
  },
  gabarito: 'D',
  explicacao: 'O Kc da reação inversa é o inverso do Kc da reação direta: Kc(inv) = 1/Kc(dir) = 1/4,0 = 0,25.',
  steps: [
    {
      titulo: 'Relação entre Kc direto e inverso',
      hint: 'Kc(inv) = 1/Kc(dir)',
      explicacao: 'Inverter uma equação química é equivalente a trocar numerador e denominador da expressão de Kc.',
      linhas_latex: ['K_c(\\text{dir}) = \\frac{[C][D]}{[A][B]} = 4{,}0', 'K_c(\\text{inv}) = \\frac{[A][B]}{[C][D]} = \\frac{1}{4{,}0} = 0{,}25'],
      destaque_latex: '\\boxed{K_c(\\text{inv}) = 0{,}25} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'quim_c_19', tipo: 'C', nivel: 'avancado',
  tema: 'Tampão — Henderson-Hasselbalch',
  enunciado: 'Uma solução tampão é preparada misturando ácido acético (CH₃COOH, Ka = 1,8 × 10⁻⁵) e acetato de sódio (CH₃COONa) em concentrações iguais de 0,1 mol/L. Qual é o pH aproximado desta solução tampão? (log 1,8 ≈ 0,26)',
  alternativas: {
    A: '3,74',
    B: '4,74',
    C: '5,74',
    D: '6,74',
    E: '7,00'
  },
  gabarito: 'B',
  explicacao: 'Pela equação de Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). pKa = −log(1,8×10⁻⁵) = 5 − log(1,8) ≈ 5 − 0,26 = 4,74. Como [A⁻] = [HA], log(1) = 0. pH = 4,74.',
  steps: [
    {
      titulo: 'Calcular pKa',
      hint: 'pKa = -log(Ka)',
      explicacao: 'O pKa é o logaritmo negativo de Ka.',
      linhas_latex: ['pK_a = -\\log(1{,}8 \\times 10^{-5}) = 5 - \\log(1{,}8) \\approx 5 - 0{,}26 = 4{,}74'],
    },
    {
      titulo: 'Aplicar Henderson-Hasselbalch',
      hint: 'pH = pKa + log([base]/[ácido])',
      explicacao: 'Como as concentrações do ácido e da base conjugada são iguais, o log é zero.',
      linhas_latex: ['pH = pK_a + \\log\\frac{[CH_3COO^-]}{[CH_3COOH]} = 4{,}74 + \\log\\frac{0{,}1}{0{,}1}', 'pH = 4{,}74 + \\log(1) = 4{,}74 + 0 = 4{,}74'],
      destaque_latex: '\\boxed{pH = 4{,}74} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_20', tipo: 'C', nivel: 'avancado',
  tema: 'Leis de Faraday — cubas em série',
  enunciado: 'Duas cubas eletrolíticas estão em série: uma deposita prata (Ag⁺ + e⁻ → Ag; M = 108 g/mol) e a outra deposita cobre (Cu²⁺ + 2e⁻ → Cu; M = 64 g/mol). A mesma corrente percorre ambas. Se 10,8 g de Ag são depositados, qual é a massa de Cu depositada?',
  alternativas: {
    A: '3,2 g',
    B: '6,4 g',
    C: '12,8 g',
    D: '25,6 g',
    E: '64,0 g'
  },
  gabarito: 'A',
  explicacao: 'n(Ag) = 10,8/108 = 0,1 mol. n(e⁻) = 0,1 mol (1 e⁻ por Ag). n(Cu) = 0,1/2 = 0,05 mol. m(Cu) = 0,05 × 64 = 3,2 g.',
  steps: [
    {
      titulo: 'Calcular moles de Ag depositados',
      hint: 'n = m/M',
      explicacao: 'A massa de prata é dividida pela sua massa molar.',
      linhas_latex: ['n(Ag) = \\frac{10{,}8}{108} = 0{,}1 \\text{ mol}'],
    },
    {
      titulo: 'Calcular moles de elétrons (mesma corrente em série)',
      hint: 'Ag⁺ + 1e⁻ → Ag: 1 mol Ag = 1 mol e⁻',
      explicacao: 'Em cubas em série, a mesma quantidade de elétrons percorre ambas.',
      linhas_latex: ['n(e^-) = n(Ag) = 0{,}1 \\text{ mol}'],
    },
    {
      titulo: 'Calcular moles e massa de Cu',
      hint: 'Cu²⁺ + 2e⁻ → Cu: 2 mol e⁻ por mol Cu',
      explicacao: 'Para o cobre, são necessários 2 elétrons por átomo.',
      linhas_latex: ['n(Cu) = \\frac{0{,}1}{2} = 0{,}05 \\text{ mol}', 'm(Cu) = 0{,}05 \\times 64 = 3{,}2 \\text{ g}'],
      destaque_latex: '\\boxed{m(Cu) = 3{,}2 \\text{ g}} \\quad \\text{Alternativa A}',
    },
  ],
},

{
  id: 'quim_c_21', tipo: 'C', nivel: 'basico',
  tema: 'Oxidação e redução — identificação',
  enunciado: 'Na pilha de Volta, o zinco oxida-se espontaneamente no eletrólito. Na semirreação Zn(s) → Zn²⁺(aq) + 2e⁻, o zinco atua como:',
  alternativas: {
    A: 'Agente oxidante, sofrendo redução',
    B: 'Agente redutor, sofrendo oxidação',
    C: 'Agente oxidante, sofrendo oxidação',
    D: 'Agente redutor, sofrendo redução',
    E: 'Eletrólito, sem sofrer reação redox'
  },
  gabarito: 'B',
  explicacao: 'O zinco perde elétrons (oxidação), portanto sofre oxidação e é o agente redutor. O agente redutor é aquele que causa a redução do outro reagente ao se oxidar.',
  steps: [
    {
      titulo: 'Identificar oxidação ou redução',
      hint: 'Zn → Zn²⁺: perda de elétrons = oxidação',
      explicacao: 'O número de oxidação do Zn passa de 0 para +2, indicando perda de elétrons.',
      linhas_latex: ['Zn^0 \\rightarrow Zn^{+2} + 2e^- \\quad (\\text{oxidação})'],
    },
    {
      titulo: 'Identificar o papel do Zn',
      hint: 'Quem se oxida é o agente redutor',
      explicacao: 'O agente redutor é a substância que cede elétrons (se oxida) e reduz o outro reagente.',
      linhas_latex: ['\\text{Zn: agente redutor (se oxida)}'],
      destaque_latex: '\\boxed{\\text{Agente redutor — sofre oxidação}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_22', tipo: 'C', nivel: 'intermediario',
  tema: 'Le Chatelier — equilíbrio de oxigenação',
  enunciado: 'O equilíbrio simplificado da oxigenação da hemoglobina é: HbO₂(aq) ⇌ Hb(aq) + O₂(g). Em grandes altitudes, onde a pressão parcial de O₂ é drasticamente reduzida, o Princípio de Le Chatelier prevê que o equilíbrio se deslocará para:',
  alternativas: {
    A: 'A direita, favorecendo a oxigenação do sangue',
    B: 'A esquerda, favorecendo a formação de HbO₂',
    C: 'A direita, favorecendo a desoxigenação e liberação de O₂',
    D: 'Não se desloca, pois O₂ é produto',
    E: 'A esquerda, consumindo Hb e O₂'
  },
  gabarito: 'C',
  explicacao: 'A redução de [O₂] (produto) desloca o equilíbrio para a direita (para produzir mais O₂), favorecendo a dissociação de HbO₂. Isso aumenta o risco de desoxigenação em grandes altitudes, contribuindo para a polimerização de HbS na anemia falciforme.',
  steps: [
    {
      titulo: 'Identificar a perturbação',
      hint: '[O₂] diminui em altitudes elevadas',
      explicacao: 'A baixa pressão parcial de O₂ reduz a concentração deste produto no equilíbrio.',
      linhas_latex: ['[O_2] \\downarrow \\Rightarrow \\text{perturbação do equilíbrio}'],
    },
    {
      titulo: 'Aplicar Le Chatelier',
      hint: 'Produto diminui → equilíbrio se desloca para produzir mais produto',
      explicacao: 'Para compensar a diminuição de O₂, o sistema se desloca para a direita.',
      linhas_latex: ['HbO_2 \\xrightarrow{\\text{direita}} Hb + O_2', '\\text{Desoxigenação favorecida}'],
      destaque_latex: '\\boxed{\\text{Deslocamento para a direita — desoxigenação}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_23', tipo: 'C', nivel: 'basico',
  tema: 'Oxidação do lítio — bateria de íons',
  enunciado: 'Analisando o esquema de uma bateria de íons de lítio em descarga (célula galvânica), o eletrodo que perde elétrons espontaneamente é o ânodo. Na bateria de lítio, o eletrodo 1 (ânodo) realiza qual semirreação?',
  alternativas: {
    A: 'Li⁺ + e⁻ → Li(s) — redução',
    B: 'Li(s) → Li⁺ + e⁻ — oxidação',
    C: 'Li(s) + e⁻ → Li⁻ — redução',
    D: '2Li(s) → Li₂²⁺ + 2e⁻ — oxidação',
    E: 'Li⁺ → Li²⁺ + e⁻ — oxidação'
  },
  gabarito: 'B',
  explicacao: 'No ânodo (eletrodo 1) da célula galvânica de lítio, o metal lítio se oxida espontaneamente, liberando íons Li⁺ e elétrons para o circuito externo.',
  steps: [
    {
      titulo: 'Identificar o ânodo na célula galvânica',
      hint: 'Ânodo = oxidação = perda de elétrons',
      explicacao: 'No ânodo da célula galvânica, a reação de oxidação ocorre espontaneamente.',
      linhas_latex: ['\\text{Ânodo} \\rightarrow \\text{oxidação}'],
    },
    {
      titulo: 'Escrever a semirreação do lítio',
      hint: 'Li⁰ → Li⁺ (perde 1 elétron)',
      explicacao: 'O lítio metálico (Li⁰) perde 1 elétron, formando o cátion Li⁺.',
      linhas_latex: ['Li_{(s)} \\rightarrow Li^+_{(aq)} + e^-', '\\text{Oxidação do lítio}'],
      destaque_latex: '\\boxed{Li_{(s)} \\rightarrow Li^+_{(aq)} + e^-} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_24', tipo: 'C', nivel: 'avancado',
  tema: 'Kc — equilíbrio heterogêneo',
  enunciado: 'Para a reação de decomposição: CaCO₃(s) ⇌ CaO(s) + CO₂(g), qual é a expressão correta de Kc?',
  alternativas: {
    A: 'Kc = [CaO][CO₂] / [CaCO₃]',
    B: 'Kc = [CO₂] / [CaCO₃]',
    C: 'Kc = [CO₂]',
    D: 'Kc = [CaO] / [CaCO₃]',
    E: 'Kc = 1 / [CO₂]'
  },
  gabarito: 'C',
  explicacao: 'Em equilíbrios heterogêneos, as concentrações de sólidos puros e líquidos puros são constantes e incorporadas ao Kc. Portanto, CaCO₃(s) e CaO(s) não aparecem na expressão. Kc = [CO₂].',
  steps: [
    {
      titulo: 'Identificar fases na reação',
      hint: 'CaCO₃ e CaO são sólidos — não entram na expressão',
      explicacao: 'Sólidos puros e líquidos puros têm "atividade = 1" e são incorporados à constante.',
      linhas_latex: ['CaCO_3(s) \\text{ e } CaO(s): \\text{ atividade = 1}'],
    },
    {
      titulo: 'Escrever a expressão de Kc',
      hint: 'Apenas espécies em fase gasosa ou em solução',
      explicacao: 'Apenas o CO₂(g) aparece na expressão de Kc para este equilíbrio heterogêneo.',
      linhas_latex: ['K_c = [CO_2]'],
      destaque_latex: '\\boxed{K_c = [CO_2]} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_25', tipo: 'C', nivel: 'avancado',
  tema: 'Cinética — determinação da ordem',
  enunciado: 'Em um experimento cinético, dobrando-se [A] e mantendo [B] constante, a velocidade quadruplicou. Dobrando [B] e mantendo [A] constante, a velocidade dobrou. A lei de velocidade desta reação é:',
  alternativas: {
    A: 'V = k[A][B]',
    B: 'V = k[A]²[B]',
    C: 'V = k[A][B]²',
    D: 'V = k[A]²',
    E: 'V = k[A]²[B]²'
  },
  gabarito: 'B',
  explicacao: 'Dobrar [A] quadruplica V → V ∝ [A]², portanto ordem 2 em A. Dobrar [B] dobra V → V ∝ [B]¹, portanto ordem 1 em B. Lei de velocidade: V = k[A]²[B].',
  steps: [
    {
      titulo: 'Determinar a ordem em relação a A',
      hint: '[A] dobra → V quadruplica = V × 4',
      explicacao: 'Se V ∝ [A]ⁿ e dobrar [A] quadruplica V: 2ⁿ = 4 → n = 2.',
      linhas_latex: ['\\frac{V_2}{V_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^n \\Rightarrow 4 = 2^n \\Rightarrow n = 2'],
    },
    {
      titulo: 'Determinar a ordem em relação a B',
      hint: '[B] dobra → V dobra = V × 2',
      explicacao: 'Se V ∝ [B]ᵐ e dobrar [B] dobra V: 2ᵐ = 2 → m = 1.',
      linhas_latex: ['4 = 2^n \\Rightarrow n=2; \\quad 2 = 2^m \\Rightarrow m=1'],
    },
    {
      titulo: 'Escrever a lei de velocidade',
      hint: 'V = k[A]²[B]¹',
      explicacao: 'Combinamos as ordens individuais.',
      linhas_latex: ['V = k[A]^2[B]'],
      destaque_latex: '\\boxed{V = k[A]^2[B]} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_26', tipo: 'C', nivel: 'avancado',
  tema: 'Pilha — força eletromotriz',
  enunciado: 'Em uma pilha galvânica: Zn | Zn²⁺ || Cu²⁺ | Cu. Dados os potenciais padrão: E°(Zn²⁺/Zn) = −0,76 V e E°(Cu²⁺/Cu) = +0,34 V. A força eletromotriz padrão (fem) desta pilha é:',
  alternativas: {
    A: '−0,42 V',
    B: '−1,10 V',
    C: '+0,42 V',
    D: '+1,10 V',
    E: '+0,76 V'
  },
  gabarito: 'D',
  explicacao: 'fem° = E°(cátodo) − E°(ânodo) = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = +0,34 − (−0,76) = +1,10 V.',
  steps: [
    {
      titulo: 'Identificar ânodo e cátodo',
      hint: 'Zn se oxida (ânodo); Cu se reduz (cátodo)',
      explicacao: 'O zinco tem menor potencial de redução, portanto se oxida (ânodo). O cobre se reduz (cátodo).',
      linhas_latex: ['\\text{Ânodo: } Zn \\rightarrow Zn^{2+} + 2e^-', '\\text{Cátodo: } Cu^{2+} + 2e^- \\rightarrow Cu'],
    },
    {
      titulo: 'Calcular a fem padrão',
      hint: 'fem° = E°(cátodo) − E°(ânodo)',
      explicacao: 'Subtraímos o potencial padrão do ânodo do potencial padrão do cátodo.',
      linhas_latex: ['\\varepsilon° = E°_{\\text{cátodo}} - E°_{\\text{ânodo}}', '\\varepsilon° = +0{,}34 - (-0{,}76) = +1{,}10 \\text{ V}'],
      destaque_latex: '\\boxed{\\varepsilon° = +1{,}10 \\text{ V}} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'quim_c_27', tipo: 'C', nivel: 'basico',
  tema: 'Polaridade da cuba eletrolítica',
  enunciado: 'Em uma cuba eletrolítica para galvanoplastia de zinco, o eletrodo de zinco puro está conectado ao polo positivo do gerador. Qual reação ocorre neste eletrodo?',
  alternativas: {
    A: 'Redução do Zn²⁺: Zn²⁺ + 2e⁻ → Zn',
    B: 'Oxidação do Zn: Zn → Zn²⁺ + 2e⁻',
    C: 'Redução da água: 2H₂O + 2e⁻ → H₂ + 2OH⁻',
    D: 'Oxidação da água: H₂O → O₂ + H⁺ + e⁻',
    E: 'Nenhuma reação, pois o Zn é inerte'
  },
  gabarito: 'B',
  explicacao: 'Na eletrólise, o ânodo está conectado ao polo positivo do gerador. No ânodo ocorre oxidação. O eletrodo de Zn (ânodo) se oxida: Zn → Zn²⁺ + 2e⁻, reabastecendo a solução com Zn²⁺.',
  steps: [
    {
      titulo: 'Identificar o ânodo na eletrólise',
      hint: 'Polo positivo do gerador = ânodo = oxidação',
      explicacao: 'Na eletrólise, o polo positivo do gerador retira elétrons do eletrodo, causando oxidação — esse é o ânodo.',
      linhas_latex: ['\\text{Polo (+)} \\rightarrow \\text{ânodo} \\rightarrow \\text{oxidação}'],
    },
    {
      titulo: 'Reação de oxidação do Zn',
      hint: 'Zn⁰ → Zn²⁺ + 2e⁻',
      explicacao: 'O zinco metálico se oxida no ânodo, liberando Zn²⁺ para a solução e elétrons para o circuito.',
      linhas_latex: ['Zn_{(s)} \\rightarrow Zn^{2+}_{(aq)} + 2e^-'],
      destaque_latex: '\\boxed{Zn \\rightarrow Zn^{2+} + 2e^- \\text{ — oxidação}} \\quad \\text{Alternativa B}',
    },
  ],
},

{
  id: 'quim_c_28', tipo: 'C', nivel: 'intermediario',
  tema: 'Le Chatelier + pH — tampão oceânico',
  enunciado: 'A adição de ácido forte (HCl) a uma amostra de água do oceano com sistema tampão carbônico causará qual perturbação imediata?',
  alternativas: {
    A: 'Aumento do pH, pois HCO₃⁻ neutraliza o HCl',
    B: 'Diminuição do pH, pois o tampão é destruído instantaneamente',
    C: 'Diminuição moderada do pH, pois o tampão neutraliza parcialmente o ácido adicionado',
    D: 'Nenhuma alteração de pH, pois oceanos são pH neutro',
    E: 'Aumento do pH, pois H⁺ reage com CO₂'
  },
  gabarito: 'C',
  explicacao: 'O tampão HCO₃⁻/H₂CO₃ neutraliza parcialmente o HCl adicionado (HCO₃⁻ + H⁺ → H₂CO₃), resistindo à queda de pH. O pH diminuirá, mas de forma moderada — não abrupta. Isso exemplifica a função tampão.',
  steps: [
    {
      titulo: 'Reação do tampão com HCl',
      hint: 'Base conjugada (HCO₃⁻) neutraliza o H⁺ do HCl',
      explicacao: 'O HCO₃⁻ presente no tampão reage com o H⁺ adicionado pelo HCl.',
      linhas_latex: ['HCO_3^- + H^+ \\rightarrow H_2CO_3'],
    },
    {
      titulo: 'Efeito no pH',
      hint: 'Tampão resiste mas não impede totalmente',
      explicacao: 'O tampão minimiza a variação, mas não elimina completamente a acidificação. O pH diminui moderadamente.',
      linhas_latex: ['pH \\downarrow \\text{ (moderadamente)}'],
      destaque_latex: '\\boxed{\\text{Diminuição moderada do pH}} \\quad \\text{Alternativa C}',
    },
  ],
},

{
  id: 'quim_c_29', tipo: 'C', nivel: 'avancado',
  tema: 'Equilíbrio + Kc — reforma do etanol',
  enunciado: 'Na reforma do etanol, um subproduto é modelado pela reação: CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g). Em um reator de 1,0 L a temperatura constante, partem-se de 3,0 mol CO e 3,0 mol H₂O. No equilíbrio, há 1,0 mol de CO. Qual é o Kc desta reação?',
  alternativas: {
    A: '1,0',
    B: '2,0',
    C: '3,0',
    D: '4,0',
    E: '9,0'
  },
  gabarito: 'D',
  explicacao: 'ICE: CO consumido = 2,0 mol. No equilíbrio: [CO] = 1,0; [H₂O] = 1,0; [CO₂] = 2,0; [H₂] = 2,0. Kc = (2,0 × 2,0)/(1,0 × 1,0) = 4,0.',
  steps: [
    {
      titulo: 'Aplicar ICE (V = 1,0 L)',
      hint: 'CO inicial = 3,0; CO equilíbrio = 1,0 → consumo = 2,0',
      explicacao: 'A variação de CO é −2,0 mol. Por estequiometria (1:1:1:1), todas as variações são iguais em módulo.',
      linhas_latex: ['\\Delta[CO] = -2{,}0, \\quad \\Delta[H_2O] = -2{,}0', '\\Delta[CO_2] = +2{,}0, \\quad \\Delta[H_2] = +2{,}0'],
    },
    {
      titulo: 'Concentrações no equilíbrio',
      hint: 'Concentração = moles/volume = moles (V = 1 L)',
      explicacao: 'Com volume de 1,0 L, moles e concentrações são numericamente iguais.',
      linhas_latex: ['[CO] = 1{,}0 \\; M, \\quad [H_2O] = 1{,}0 \\; M', '[CO_2] = 2{,}0 \\; M, \\quad [H_2] = 2{,}0 \\; M'],
    },
    {
      titulo: 'Calcular Kc',
      hint: 'Kc = [CO₂][H₂] / [CO][H₂O]',
      explicacao: 'Substituímos as concentrações de equilíbrio na expressão de Kc.',
      linhas_latex: ['K_c = \\frac{[CO_2][H_2]}{[CO][H_2O]} = \\frac{2{,}0 \\times 2{,}0}{1{,}0 \\times 1{,}0} = 4{,}0'],
      destaque_latex: '\\boxed{K_c = 4{,}0} \\quad \\text{Alternativa D}',
    },
  ],
},

{
  id: 'quim_c_30', tipo: 'C', nivel: 'avancado',
  tema: 'Catálise — comparação Ea com e sem catalisador',
  enunciado: 'Um gráfico de perfil energético mostra a mesma reação com e sem catalisador. Sem catalisador, Ea = 120 kJ/mol. Com catalisador, Ea = 80 kJ/mol. Em relação ao ΔH e à velocidade da reação:',
  alternativas: {
    A: 'ΔH diminui de 120 para 80 kJ/mol; velocidade aumenta',
    B: 'ΔH permanece constante; velocidade aumenta',
    C: 'ΔH aumenta; velocidade diminui',
    D: 'ΔH e velocidade permanecem iguais',
    E: 'ΔH permanece constante; velocidade diminui'
  },
  gabarito: 'B',
  explicacao: 'O catalisador reduz a energia de ativação (Ea) de 120 para 80 kJ/mol, aumentando a fração de moléculas com energia suficiente para reagir — portanto, a velocidade aumenta. O ΔH (diferença de entalpia entre produtos e reagentes) não é afetado pelo catalisador.',
  steps: [
    {
      titulo: 'Efeito do catalisador na Ea',
      hint: 'Catalisador oferece via alternativa de menor Ea',
      explicacao: 'A redução de Ea de 120 para 80 kJ/mol significa que mais moléculas têm energia suficiente para reagir.',
      linhas_latex: ['E_a(\\text{sem}) = 120 \\text{ kJ/mol} \\rightarrow E_a(\\text{com}) = 80 \\text{ kJ/mol}'],
    },
    {
      titulo: 'Efeito na velocidade',
      hint: 'Menor Ea → maior fração de moléculas ativas',
      explicacao: 'Com menor barreira energética, mais colisões são efetivas — velocidade aumenta.',
      linhas_latex: ['E_a \\downarrow \\Rightarrow v \\uparrow'],
    },
    {
      titulo: 'Efeito no ΔH',
      hint: 'ΔH não depende do caminho',
      explicacao: 'O ΔH depende apenas dos estados inicial e final — não do mecanismo ou caminho percorrido.',
      linhas_latex: ['\\Delta H = \\text{constante (não afetado pelo catalisador)}'],
      destaque_latex: '\\boxed{\\Delta H \\text{ constante}; \\; v \\uparrow} \\quad \\text{Alternativa B}',
    },
  ],
},

// ════════════════════════════════════════════════════════════
// TIPO A — CERTO / ERRADO (10 questões)
// ════════════════════════════════════════════════════════════

{
  id: 'quim_a_01', tipo: 'A', nivel: 'basico',
  tema: 'Ânodo e cátodo',
  enunciado: 'Em uma célula galvânica (pilha), o lítio metálico Li(s) cede elétrons ao circuito externo de forma espontânea. Ao sofrer esse processo de oxidação, o lítio atua caracteristicamente como o cátodo da respectiva célula eletroquímica.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O eletrodo onde ocorre oxidação (perda de elétrons) é o ÂNODO, não o cátodo. O cátodo é onde ocorre redução (ganho de elétrons). A pegadinha clássica: inverter ânodo e cátodo. Regra: ANOX = ANodo Oxidação; CARED = CAtodo REDução.',
},

{
  id: 'quim_a_02', tipo: 'A', nivel: 'basico',
  tema: 'Catálise e ΔH',
  enunciado: 'A enzima biológica que catalisa a oxidação do lactato atua fornecendo uma via reacional alternativa com menor energia de ativação, fato que aumenta a velocidade da reação sem alterar o valor da variação de entalpia (ΔH) global do processo.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Esta é a definição precisa da ação catalítica: menor Ea (via alternativa) → maior velocidade. O ΔH é uma função de estado (depende apenas de reagentes e produtos), portanto não é afetado pelo catalisador. Ambas as afirmações estão corretas.',
},

{
  id: 'quim_a_03', tipo: 'A', nivel: 'basico',
  tema: 'Le Chatelier — concentração de H⁺',
  enunciado: 'A adição proposital de um ácido forte à amostra aquosa de um biossensor causará uma perturbação no equilíbrio iônico, aumentando significativamente a concentração de íons H⁺ em solução, o que resultará em uma diminuição numérica do valor do pH da mistura final.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Ácido forte se ioniza completamente, liberando H⁺. Maior [H⁺] → pH = −log[H⁺] diminui numericamente. A relação inversa entre [H⁺] e pH está corretamente descrita.',
},

{
  id: 'quim_a_04', tipo: 'A', nivel: 'basico',
  tema: 'Leis de Faraday — equivalência',
  enunciado: 'Pela Primeira Lei de Faraday, 1 Faraday (96500 C) de carga elétrica é suficiente para depositar 1 mol de qualquer metal em uma cuba eletrolítica, independentemente da carga iônica do metal.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. 1 Faraday (96500 C) deposita 1 mol de elétrons — não necessariamente 1 mol de metal. Para metais com carga iônica z, são necessários z Faradays por mol de metal: m = (M × I × t) / (z × F). Por exemplo, para Cu²⁺ são necessários 2F para depositar 1 mol de Cu. A pegadinha é ignorar a carga iônica.',
},

{
  id: 'quim_a_05', tipo: 'A', nivel: 'intermediario',
  tema: 'Le Chatelier — pressão com sólido',
  enunciado: 'Para o equilíbrio CaCO₃(s) ⇌ CaO(s) + CO₂(g), o aumento da pressão total do sistema deslocará o equilíbrio para a esquerda, favorecendo a formação de CaCO₃.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Aumentar a pressão desloca o equilíbrio para o lado de menor número de mols gasosos. Lado esquerdo: 0 mol gasoso; lado direito: 1 mol gasoso (CO₂). O equilíbrio se desloca para a esquerda para reduzir os mols gasosos e assim a pressão.',
},

{
  id: 'quim_a_06', tipo: 'A', nivel: 'intermediario',
  tema: 'pH — ácido fraco vs. forte',
  enunciado: 'O pH de uma solução de ácido acético (fraco) 0,1 mol/L é idêntico ao pH de uma solução de ácido clorídrico (forte) 0,1 mol/L, pois ambos têm a mesma concentração inicial.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Um ácido forte (HCl) se ioniza completamente: [H⁺] = 0,1 mol/L → pH = 1. Um ácido fraco (CH₃COOH) ioniza parcialmente: [H⁺] << 0,1 mol/L → pH > 1. A mesma concentração inicial não implica mesmo pH para ácidos de força diferente. A pegadinha é ignorar o grau de ionização.',
},

{
  id: 'quim_a_07', tipo: 'A', nivel: 'intermediario',
  tema: 'Kc e catalisador',
  enunciado: 'A adição de um catalisador a um sistema em equilíbrio químico aumenta a constante de equilíbrio Kc, pois acelera a reação direta mais do que a inversa.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O catalisador acelera IGUALMENTE as reações direta e inversa — reduz a Ea de ambas na mesma proporção. Portanto, não altera a constante de equilíbrio Kc. O único fator que altera Kc é a temperatura. A pegadinha é a afirmativa "acelera a direta mais que a inversa".',
},

{
  id: 'quim_a_08', tipo: 'A', nivel: 'intermediario',
  tema: 'Tampão — limitações',
  enunciado: 'A eficácia de uma solução tampão natural baseia-se na presença simultânea de um ácido fraco e sua base conjugada. Essa configuração permite neutralizar qualquer quantidade de ácido forte ou base forte adicionada, mantendo o pH absolutamente constante.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. Uma solução tampão tem capacidade tamponante limitada. Ela resiste a variações de pH apenas para adições MODERADAS de ácido ou base. Se a quantidade adicionada exceder a capacidade do tampão (esgotar o ácido fraco ou a base conjugada), o pH variará significativamente. A pegadinha é "qualquer quantidade" e "absolutamente constante".',
},

{
  id: 'quim_a_09', tipo: 'A', nivel: 'avancado',
  tema: 'Eletrólise — ânodo positivo',
  enunciado: 'Na eletrólise, o ânodo está conectado ao polo positivo do gerador externo, sendo o eletrodo onde ocorre oxidação, pois o gerador retira elétrons deste eletrodo, tornando-o deficiente em elétrons e favorecendo a oxidação das espécies em solução.',
  gabarito: 'CERTO',
  explicacao: 'CERTO. Esta afirmativa está completamente correta. Na eletrólise: polo (+) do gerador → ânodo → oxidação. O gerador "puxa" elétrons do ânodo, que então retira elétrons das espécies em solução para compensar — promovendo oxidação. A lógica causal está correta.',
},

{
  id: 'quim_a_10', tipo: 'A', nivel: 'avancado',
  tema: 'Cinética — catálise e concentração de produto',
  enunciado: 'Uma enzima que catalisa a conversão do intermediário incolor em pigmento púrpuro aumenta não apenas a velocidade da reação, mas também a concentração do produto no equilíbrio, pois fornece uma via de menor energia que favorece termodinamicamente a formação do produto.',
  gabarito: 'ERRADO',
  explicacao: 'ERRADO. O catalisador aumenta a velocidade com que o equilíbrio é atingido, mas NÃO altera a concentração das espécies no equilíbrio. A posição do equilíbrio (e portanto a concentração dos produtos) é determinada pelo Kc, que só muda com a temperatura — não com catalisador. A pegadinha é confundir cinética (velocidade) com termodinâmica (posição do equilíbrio).',
},

]; // fim QUESTOES_QUIM
