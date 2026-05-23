# Correção de Equações Matemáticas e Gráficos nos Steps

## Problema Identificado
As equações matemáticas e gráficos não estavam sendo renderizados corretamente nos steps das questões da página de revisão. As equações não apareciam em matemática profissional (estilo LaTeX `/align`).

## Solução Implementada

### 1. **Carregamento Correto do MathJax** (`revisao.html`)
- ✅ Adicionado carregamento do MathJax 3 com configuração global **ANTES** de qualquer outro script
- ✅ Configuração inclui suporte para:
  - `\align` e `\align*`
  - `\equation` e `\equation*`
  - Delimitadores `\[...\]` para display math
  - Delimitadores `$...$` para inline math
  - Pacotes: `mhchem`, `boldsymbol`, `amsmath`, `amssymb`

```html
<script>
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]'], ['\\begin{align}', '\\end{align}'], ...],
      packages: {'[+]': ['mhchem', 'boldsymbol', 'amsmath', 'amssymb']}
    },
    svg: {
      fontCache: 'global',
      scale: 1.0
    }
  };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```

### 2. **Melhorias no CSS** (`revisao.html`)
- ✅ Estilos para `mjx-container` com cores corretas (branco/claro)
- ✅ Espaçamento adequado em `.step-latex-line` e `.step-latex-destaque`
- ✅ Melhor visualização dos SVGs gerados pelo MathJax

```css
mjx-container { 
  color: var(--text) !important; 
  font-size: 1em !important;
}
mjx-container[display="true"] { 
  display: block !important; 
  margin: 12px auto !important; 
  text-align: center !important; 
}
```

### 3. **Renderização Dinâmica no `questao-renderer.js`**
- ✅ Função `toggleStep()` agora usa `MathJax.typesetPromise()`
- ✅ Função `toggleSteps()` atualizada para renderizar container inteiro
- ✅ Uso de `requestAnimationFrame()` para garantir que o DOM esteja atualizado antes de renderizar
- ✅ Tratamento de erros com `.catch()`

```javascript
// Exemplo: toggleStep
if (!aberto) {
  requestAnimationFrame(() => {
    if (window.MathJax?.typesetPromise) {
      MathJax.typesetPromise([body])
        .then(() => { /* sucesso */ })
        .catch(e => console.warn('MathJax step erro:', e));
    }
  });
}
```

### 4. **Otimização do `visual-renderer.js`**
- ✅ Função `init()` agora espera corretamente pelo MathJax carregado do CDN global
- ✅ Melhor tratamento de promise
- ✅ Compatibilidade com o carregamento assíncrono do MathJax

## Como Usar Equações nos Steps

### Exemplo 1: Equação Simples (Inline)
```javascript
linhas_latex: ['P = \\frac{1}{4} = 25\\%']
```

### Exemplo 2: Múltiplas Equações (Display)
```javascript
linhas_latex: [
  'X^dX \\times XY',
  '\\text{Gametas mãe: } X^d, X',
  '\\text{Gametas pai: } X, Y'
]
```

### Exemplo 3: Equação em Destaque
```javascript
destaque_latex: '\\boxed{P = 25\\%} \\quad \\text{Alternativa B}'
```

### Exemplo 4: Align (Múltiplas Linhas Alinhadas)
```javascript
linhas_latex: [
  '\\begin{align*}\n' +
  'P(A\\_B\\_) &= P(A\\_) \\times P(B\\_) \\\\\n' +
  '&= \\frac{3}{4} \\times \\frac{3}{4} \\\\\n' +
  '&= \\frac{9}{16}\n' +
  '\\end{align*}'
]
```

## Comandos LaTeX Suportados

| Comando | Uso | Exemplo |
|---------|-----|---------|
| `\frac{a}{b}` | Fração | `\frac{1}{4}` |
| `\times` | Multiplicação | `A \times B` |
| `^{}` | Sobrescrito | `X^d` ou `10^3` |
| `_{}` | Subscrito | `a_1` ou `x_i` |
| `\rightarrow` | Seta para direita | `A \rightarrow B` |
| `\leftrightarrow` | Seta dupla | `A \leftrightarrow B` |
| `\text{}` | Texto em modo matemático | `\text{Pai: }` |
| `\boxed{}` | Caixa ao redor | `\boxed{resposta}` |
| `\begin{align*} ... \end{align*}` | Múltiplas linhas alinhadas | Vários passos |
| `\\` | Nova linha em align | Separador de linhas |
| `&` | Ponto de alinhamento em align | Alinha sinais de = |

## Testes Recomendados

1. Abrir uma questão com steps
2. Expandir um step clicando no header
3. Verificar que as equações aparecem renderizadas em SVG (não como texto bruto)
4. Verificar que as cores estão corretas (texto branco/claro no fundo escuro)
5. Testar em diferentes dispositivos (mobile, tablet, desktop)

## Arquivos Modificados

- ✅ `revisao.html` - Adicionado MathJax CDN com configuração global, melhorado CSS
- ✅ `js/engine/questao-renderer.js` - Otimizado `toggleStep()`, `toggleSteps()`, `mostrarFeedback()`
- ✅ `js/engine/visual-renderer.js` - Simplificado `init()` para MathJax global

## Suporte a Gráficos

Os gráficos também funcionam agora:
- Chart.js para gráficos XY
- SVG inline para diagramas (heredogramas, circuitos, etc.)
- Gráficos de energia de reação (renderização SVG customizada)

## Próximos Passos (Opcional)

- [ ] Adicionar mais exemplos com `\align*` nas questões
- [ ] Criar função helper para formatar equações automáticamente
- [ ] Adicionar suporte para TikZ diagrams (se necessário)
- [ ] Implementar cache de SVGs renderizados para performance
