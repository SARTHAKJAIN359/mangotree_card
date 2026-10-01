/**
 * Application Entry Point
 * Orchestrates Hero, vCard, Share, Dialogs, and Toast systems.
 */
import { initHero } from './hero.js';
import { initLightbox } from './lightbox.js';
import { initMarqueeControls, initScrollReveals } from './reveal.js';
import { initShare, triggerShare } from './share.js';
import { initGrowthStem } from './stem.js';
import { downloadVCard } from './vcard.js';

function initApp() {
  // 1. Initialize Hero data & sticky bar observer
  initHero();

  // 2. Initialize Share modal & verified endpoints
  initShare();

  // 3. Initialize Lightbox dialog
  initLightbox();

  // 4. Initialize Phase 5 Motion: Scroll reveals, Growth Stem, & Marquee Controls
  initScrollReveals();
  initGrowthStem();
  initMarqueeControls();

  // 5. Exclusive Accordion & Click-Outside Dismissal for Services
  const track = document.getElementById('services-track');
  const serviceDetails = document.querySelectorAll('.service-details');

  function updateMarqueePauseState() {
    if (!track) return;
    const anyOpen = Array.from(serviceDetails).some(d => d.open);
    track.classList.toggle('has-open-card', anyOpen);
  }

  function closeAllServiceDetails() {
    let closedAny = false;
    serviceDetails.forEach(d => {
      if (d.open) {
        d.open = false;
        closedAny = true;
      }
    });
    if (closedAny) updateMarqueePauseState();
  }

  serviceDetails.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        serviceDetails.forEach(other => {
          if (other !== details && other.open) {
            other.open = false;
          }
        });
      }
      updateMarqueePauseState();
    });
  });

  // Desktop click dismissal: closes when clicking outside details (on card or page)
  document.addEventListener('click', (e) => {
    if (e.target && typeof e.target.closest === 'function' && e.target.closest('.service-details')) return;
    closeAllServiceDetails();
  });

  // Mobile touch dismissal: pointerdown closes card when tapping outside any service tile
  document.addEventListener('pointerdown', (e) => {
    if (e.target && typeof e.target.closest === 'function' && e.target.closest('.service-tile')) return;
    closeAllServiceDetails();
  });

  // Escape key dismissal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllServiceDetails();
    }
  });

  // 5. Wire Save Contact triggers
  const saveHeroBtn = document.getElementById('cta-save-hero');
  const saveBarBtn = document.getElementById('cta-save-bar');
  if (saveHeroBtn) saveHeroBtn.addEventListener('click', downloadVCard);
  if (saveBarBtn) saveBarBtn.addEventListener('click', downloadVCard);

  // 6. Wire Share triggers
  const shareHeroBtn = document.getElementById('cta-share-hero');
  const shareBarBtn = document.getElementById('cta-share-bar');
  if (shareHeroBtn) shareHeroBtn.addEventListener('click', (e) => triggerShare(e.currentTarget));
  if (shareBarBtn) shareBarBtn.addEventListener('click', (e) => triggerShare(e.currentTarget));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
