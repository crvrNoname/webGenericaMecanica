// src/js/modules/theme.js
const THEME_KEY = 'mi-sitio:theme';
const DEFAULT_THEME = 'actual';

export function applyTheme(theme) {
  const t = theme || DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(THEME_KEY, t); } catch {}

  document.querySelectorAll('.js-theme').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === t ? 'true' : 'false');
  });

  // meta theme-color (móviles)
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#000';
    meta.setAttribute('content', bg);
  }

  // 👇 actualiza el favicon según tema
  updateFaviconForTheme(t);
}

export function initThemeSwitcher() {
  let saved = DEFAULT_THEME;
  try { saved = localStorage.getItem(THEME_KEY) || DEFAULT_THEME; } catch {}
  applyTheme(saved);

  document.querySelectorAll('.js-theme').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyTheme(btn.dataset.theme); }
    });
  });
}

// 🔗 cambia el archivo del favicon según el tema
function updateFaviconForTheme(theme) {
  let link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/svg+xml');
    document.head.appendChild(link);
  }

  const map = {
    actual:    '/assets/img/favicon.svg',
    propuesta: '/assets/img/favicon-dark.svg',
    scania:    '/assets/img/favicon-scania.svg'
  };

  // cache-busting para Chrome
  const href = (map[theme] || map.actual) + `?v=${Date.now()}`;
  link.setAttribute('href', href);

  let shortcut = document.querySelector('link[rel="shortcut icon"]');
  if (!shortcut) {
    shortcut = document.createElement('link');
    shortcut.setAttribute('rel', 'shortcut icon');
    document.head.appendChild(shortcut);
  }
  shortcut.setAttribute('href', href);
}

