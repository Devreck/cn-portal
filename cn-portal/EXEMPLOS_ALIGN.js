// ============================================================
// EXEMPLO DE USO: Equações Profissionais com \align*
// ============================================================

// ============================================================
// EXEMPLOS DE USO: Equações Profissionais com \align*
// Arquivo de referência — NÃO É CÓDIGO EXECUTÁVEL
// ============================================================

// ============================================================
// EXEMPLO 1: Genética com múltiplas linhas alinhadas
// ============================================================
// 
// steps: [
//   {
//     titulo: 'Calcular probabilidade em cruzamento',
//     linhas_latex: [
//       '\\begin{align*}' +
//       'P(A\\_) &= \\frac{3}{4} \\quad \\text{(segregação Aa × Aa)} \\\\' +
//       'P(B\\_) &= \\frac{3}{4} \\quad \\text{(segregação Bb × Bb)} \\\\' +
//       'P(A\\_B\\_) &= P(A\\_) \\times P(B\\_) \\\\' +
//       '&= \\frac{3}{4} \\times \\frac{3}{4} \\\\' +
//       '&= \\frac{9}{16}' +
//       '\\end{align*}'
//     ],
//     destaque_latex: '\\boxed{\\text{Proporção fenótipica} = \\frac{9}{16}}'
//   }
// ]


// ============================================================
// EXEMPLO 2: Química com balanceamento redox
// ============================================================
//
// linhas_latex: [
//   '\\text{Semirreação de oxidação:}',
//   '\\begin{align*}' +
//   'Fe^{2+} &\\xrightarrow{\\text{-2e}^-} Fe^{3+}' +
//   '\\end{align*}',
//   '\\text{Semirreação de redução:}',
//   '\\begin{align*}' +
//   'MnO_4^- + 8H^+ + 5e^- &\\rightarrow Mn^{2+} + 4H_2O' +
//   '\\end{align*}'
// ]


// ============================================================
// EXEMPLO 3: Física com Lei de Ohm e energia
// ============================================================
//
// linhas_latex: [
//   '\\text{Pelos três métodos:}',
//   '\\begin{align*}' +
//   'P &= U \\cdot I \\\\' +
//   'P &= R \\cdot I^2 \\\\' +
//   'P &= \\frac{U^2}{R}' +
//   '\\end{align*}',
//   '\\text{Para R = 10 Ω e I = 2 A:}',
//   '\\begin{align*}' +
//   'U &= R \\cdot I = 10 \\times 2 = 20\\,\\text{V} \\\\' +
//   'P &= R \\cdot I^2 = 10 \\times 4 = 40\\,\\text{W}' +
//   '\\end{align*}'
// ],
// destaque_latex: '\\boxed{P = 40\\,\\text{W}}'


// ============================================================
// EXEMPLO 4: Biologia com Hardy-Weinberg
// ============================================================
//
// linhas_latex: [
//   '\\text{Equilíbrio gênico:}',
//   '\\begin{align*}' +
//   'p + q &= 1 \\quad \\text{(frequência alélica total)} \\\\' +
//   'p^2 + 2pq + q^2 &= 1 \\quad \\text{(frequência genotípica total)} \\\\' +
//   'AA: p^2, \\quad Aa: 2pq, \\quad aa: q^2' +
//   '\\end{align*}',
//   '\\text{Se p = 0,3 e q = 0,7:}',
//   '\\begin{align*}' +
//   'AA &: (0,3)^2 = 0,09 = 9\\% \\\\' +
//   'Aa &: 2(0,3)(0,7) = 0,42 = 42\\% \\\\' +
//   'aa &: (0,7)^2 = 0,49 = 49\\%' +
//   '\\end{align*}'
// ]


// ============================================================
// EXEMPLO 5: Matemática pura com derivadas
// ============================================================
//
// linhas_latex: [
//   '\\begin{align*}' +
//   'N(t) &= N_0 \\cdot e^{rt} \\quad \\text{(crescimento exponencial)} \\\\' +
//   '\\frac{dN}{dt} &= rN(t) \\quad \\text{(taxa de crescimento)} \\\\' +
//   '\\text{Se } N_0 &= 100, r = 0,05 \\text{ e } t = 10\\text{:} \\\\' +
//   'N(10) &= 100 \\cdot e^{0,05 \\times 10} \\\\' +
//   '&= 100 \\cdot e^{0,5} \\\\' +
//   '&\\approx 100 \\times 1,649 \\\\' +
//   '&\\approx 164,9' +
//   '\\end{align*}'
// ],
// destaque_latex: '\\boxed{N(10) \\approx 165\\text{ bactérias}}'


// ============================================================
// DICAS PARA ESTRUTURAR EQUAÇÕES EM ALIGN*
// ============================================================

// 1. USE & PARA ALINHAR:
//    \begin{align*}
//    A &= B \\           ← o & marca onde deve alinhar
//    C &= D
//    \end{align*}

// 2. MÚLTIPLOS ALINHAMENTOS:
//    \begin{align*}
//    A &= B &\quad \text{(razão 1)} \\
//    C &= D &\quad \text{(razão 2)}
//    \end{align*}

// 3. SETAS ENTRE LINHAS:
//    \begin{align*}
//    A &= B \\
//    &\xrightarrow{\text{transformação}}\\
//    &= C
//    \end{align*}

// 4. CASES (DECISÃO):
//    P = \begin{cases}
//      10 & \text{se x > 5} \\
//      5  & \text{se x ≤ 5}
//    \end{cases}

// 5. FRAÇÕES ANINHADAS:
//    \begin{align*}
//    x &= \frac{\frac{a}{b} + \frac{c}{d}}{\frac{e}{f}} \\
//    &= \frac{a}{b} \cdot \frac{f}{e} + \frac{c}{d} \cdot \frac{f}{e}
//    \end{align*}

// 6. MATRIZES:
//    \begin{pmatrix}
//    1 & 2 & 3 \\
//    4 & 5 & 6 \\
//    7 & 8 & 9
//    \end{pmatrix}

// 7. SISTEMAS DE EQUAÇÕES:
//    \begin{cases}
//    x + y &= 5 \\
//    2x - y &= 4
//    \end{cases}
