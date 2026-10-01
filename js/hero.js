/**
 * Hero & Bottom Action Bar Controller
 * Handles hero initialization and conditional visibility of the sticky mobile action bar.
 */
import { CONFIG } from './config.js';

export function initHero() {
  // Populate Hero Content from Single Source of Truth
  const nameEl = document.getElementById('hero-name');
  const roleEl = document.getElementById('hero-role');
  const companyEl = document.getElementById('hero-company');
  const logoEl = document.getElementById('brand-logo');
  const portraitEl = document.getElementById('portrait-img');
  
  // Wire WhatsApp & Phone Links
  const heroWhatsapp = document.getElementById('cta-whatsapp-hero');
  const barWhatsapp = document.getElementById('cta-whatsapp-bar');
  const heroCall = document.getElementById('cta-call-hero');
  const barCall = document.getElementById('cta-call-bar');

  if (nameEl) nameEl.textContent = CONFIG.profile.name;
  if (roleEl) roleEl.textContent = CONFIG.profile.title;
  if (companyEl) companyEl.textContent = CONFIG.profile.company;
  if (logoEl) {
    logoEl.src = './assets/img/logo-mangotree.png';
    logoEl.alt = `${CONFIG.profile.company} Logo`;
  }
  if (portraitEl) {
    portraitEl.src = './assets/img/portrait-amit-jain.png';
    portraitEl.alt = `Portrait of ${CONFIG.profile.name}`;
  }

  // Exact URLs wired from config
  if (heroWhatsapp) heroWhatsapp.href = CONFIG.profile.whatsapp;
  if (barWhatsapp) barWhatsapp.href = CONFIG.profile.whatsapp;
  if (heroCall) heroCall.href = `tel:${CONFIG.profile.phoneE164}`;
  if (barCall) barCall.href = `tel:${CONFIG.profile.phoneE164}`;

  // Initialize IntersectionObserver for Conditional Mobile Action Bar
  initMobileActionBar();
}

function initMobileActionBar() {
  const heroActions = document.getElementById('hero-actions');
  const actionBar = document.getElementById('mobile-action-bar');

  if (!heroActions || !actionBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Bar appears when hero actions scroll completely out of view above the viewport
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        actionBar.classList.add('is-visible');
        actionBar.setAttribute('aria-hidden', 'false');
        actionBar.removeAttribute('inert');
      } else {
        actionBar.classList.remove('is-visible');
        actionBar.setAttribute('aria-hidden', 'true');
        actionBar.setAttribute('inert', '');
      }
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: '0px'
  });

  observer.observe(heroActions);
}
