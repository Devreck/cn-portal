/**
 * theme.js — Gerenciador de tema claro/escuro
 * Inclua este script NO <head> SEM defer para evitar flash.
 * O botão usa SVG com CSS show/hide — não precisa de JS para atualizar o ícone.
 */

// ── Aplica o tema salvo imediatamente (antes de renderizar) ──
(function () {
  const saved = localStorage.getItem('cn_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

// ── Alterna entre claro e escuro ──
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveDark = current === 'dark' || (!current && prefersDark);
  const next = effectiveDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cn_theme', next);
}
