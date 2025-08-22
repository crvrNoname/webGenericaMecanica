// src/js/main.js
import { initNav } from './modules/nav.js';
import { renderHomeServices, renderServicesPage } from './modules/services.js';
import { initQuoteForm, initScheduleForm } from './modules/form.js';
import { initWhatsAppLinks, setCurrentYear } from './modules/contact.js';
import { initThemeSwitcher } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[main] cargado'); // para verificar en consola

  // Tema + favicon dinámico
  initThemeSwitcher();

  // Navegación
  initNav();

  // WhatsApp y año en footer
  initWhatsAppLinks({ phone: '{{WHATSAPP_E164}}' }); // será sustituido por inject-config
  setCurrentYear();

  // Render condicional por página
  const b = document.body;
  if (b.classList.contains('page--home')) {
    renderHomeServices('#services-grid');
  }
  if (b.classList.contains('page--servicios')) {
    renderServicesPage('#services-grid-mecanica', '#services-grid-electronica');
  }
  if (b.classList.contains('page--cotiza')) {
    initQuoteForm('#quoteForm', '#quoteMsg', '#quoteServiceSelect', '#quoteWhatsApp', { phone: '{{WHATSAPP_E164}}' });
  }
  if (b.classList.contains('page--agendar')) {
    initScheduleForm('#scheduleForm', '#scheduleMsg', '#scheduleServiceSelect', '#scheduleWhatsApp', { phone: '{{WHATSAPP_E164}}' });
  }
});
