// src/js/modules/theme.js
const THEME_KEY = 'mi-sitio:theme';
const DEFAULT_THEME = 'actual';

function getBasePrefix() {
  // 1) meta explícito
  const meta = document.getElementById('site-base');
  const val = meta?.getAttribute('data-base') || '';
  if (val) return val.replace(/\/+$/, '');

  // 2) auto-detección para GitHub Pages (usuario.github.io/REPO/…)
  if (location.hostname.endsWith('github.io')) {
    const seg = location.pathname.split('/').filter(Boolean)[0];
    return seg ? `/${seg}` : '';
  }
  // 3) local / raíz
  return '';
}

export function applyTheme(theme) {
  const t = theme || DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(THEME_KEY, t); } catch {}

  // marca botones activos
  document.querySelectorAll('.js-theme').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === t ? 'true' : 'false');
  });

  // actualiza meta theme-color (móviles)
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#000';
    meta.setAttribute('content', bg);
  }

  // favicon por tema
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

// 🔗 cambia el archivo del favicon según el tema (usa el mismo prefijo)
function updateFaviconForTheme(theme) {
  let link = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
           || document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }

  const base = getBasePrefix();
  const map = {
    actual:    `${base}/assets/img/favicon.svg`,
    propuesta: `${base}/assets/img/favicon-dark.svg`,
    scania:    `${base}/assets/img/favicon-scania.svg`,
  };

  const href = (map[theme] || map.actual) + `?v=${Date.now()}`; // cache-busting
  link.href = href;

  let shortcut = document.querySelector('link[rel="shortcut icon"]');
  if (!shortcut) {
    shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    document.head.appendChild(shortcut);
  }
  shortcut.href = href;
}
