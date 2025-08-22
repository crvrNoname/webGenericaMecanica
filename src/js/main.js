// src/js/main.js (placeholders para número WhatsApp E.164)
import { initNav } from './modules/nav.js';
import { renderHomeServices, renderServicesPage } from './modules/services.js';
import { initQuoteForm, initScheduleForm } from './modules/form.js';
import { initWhatsAppLinks, setCurrentYear } from './modules/contact.js';
// src/js/main.js
import { initThemeSwitcher } from './modules/theme.js';
// ...otros imports/render...
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  // ...tus otros inits...
});


document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initWhatsAppLinks({ phone: '{{WHATSAPP_E164}}' }); // ← reemplaza por número E.164 real
  setCurrentYear();

  if (document.body.classList.contains('page--home')) {
    renderHomeServices('#services-grid');
  }
  if (document.body.classList.contains('page--servicios')) {
    renderServicesPage('#services-grid-mecanica', '#services-grid-electronica');
  }
  if (document.body.classList.contains('page--cotiza')) {
    initQuoteForm('#quoteForm', '#quoteMsg', '#quoteServiceSelect', '#quoteWhatsApp', { phone: '{{WHATSAPP_E164}}' });
  }
  if (document.body.classList.contains('page--agendar')) {
    initScheduleForm('#scheduleForm', '#scheduleMsg', '#scheduleServiceSelect', '#scheduleWhatsApp', { phone: '{{WHATSAPP_E164}}' });
  }
});