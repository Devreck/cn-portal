/**
 * theme.js — Gerenciador de tema claro/escuro
 * Inclua este script NO <head> SEM defer para evitar flash.
 */

// ── Aplica o tema salvo imediatamente (antes de renderizar) ──
(function () {
  const saved = localStorage.getItem('cn_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

// ── Alterna entre claro e escuro ──
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('cn_theme', isDark ? 'dark' : 'light');
  _syncToggleBtns(isDark);
}

function _syncToggleBtns(isDark) {
  document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Modo claro' : 'Modo escuro';
  });
}

// ── Sincroniza ícone quando o DOM estiver pronto ──
document.addEventListener('DOMContentLoaded', function () {
  _syncToggleBtns(document.documentElement.classList.contains('dark'));
});
