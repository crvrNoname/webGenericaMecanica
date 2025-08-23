// src/js/main.js
import { initNav } from './modules/nav.js';
import { renderHomeServices, renderServicesPage } from './modules/services.js';
import { initQuoteForm, initScheduleForm } from './modules/form.js';
import { initWhatsAppLinks, setCurrentYear } from './modules/contact.js';
import { initThemeSwitcher } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[main] cargado');

  initThemeSwitcher();         // ← importante para logos + favicon + color
  initNav();

  initWhatsAppLinks({ phone: '+56988934851' });
  setCurrentYear();

  const b = document.body;
  if (b.classList.contains('page--home')) {
    renderHomeServices('#services-grid');
  }
  if (b.classList.contains('page--servicios')) {
    renderServicesPage('#services-grid-mecanica', '#services-grid-electronica');
  }
  if (b.classList.contains('page--cotiza')) {
    initQuoteForm('#quoteForm', '#quoteMsg', '#quoteServiceSelect', '#quoteWhatsApp', { phone: '+56988934851' });
  }
  if (b.classList.contains('page--agendar')) {
    initScheduleForm('#scheduleForm', '#scheduleMsg', '#scheduleServiceSelect', '#scheduleWhatsApp', { phone: '+56988934851' });
  }
});
