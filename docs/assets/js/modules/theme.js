const THEME_KEY = 'mi-sitio:theme';
const DEFAULT_THEME = 'actual';

function getBasePrefix() {
  const hinted = document.getElementById('site-base')?.getAttribute('data-base') || '';
  const isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(location.hostname);
  if (isLocal) return /\/pages\//.test(location.pathname) ? '..' : '.'; // relativo limpio
  if (hinted)  return hinted.replace(/\/+$/, '');
  if (location.hostname.endsWith('github.io')) {
    const seg = location.pathname.split('/').filter(Boolean)[0];
    return seg ? '/' + seg : '';
  }
  return '';
}

export function applyTheme(theme) {
  const t = theme || DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(THEME_KEY, t); } catch {}

  document.querySelectorAll('.js-theme').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === t ? 'true' : 'false');
  });

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#000';
    meta.setAttribute('content', bg);
  }

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

function updateFaviconForTheme(theme) {
  let link = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
           || document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel  = 'icon';
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
