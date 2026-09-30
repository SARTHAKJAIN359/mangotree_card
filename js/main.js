/**
 * Application Entry Point
 * Orchestrates Hero, vCard, Share, Dialogs, and Toast systems.
 */
import { initHero } from './hero.js';
import { initShare, triggerShare } from './share.js';
import { downloadVCard } from './vcard.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Hero data & sticky bar observer
  initHero();

  // 2. Initialize Share modal & verified endpoints
  initShare();

  // 3. Wire Save Contact triggers
  const saveHeroBtn = document.getElementById('cta-save-hero');
  const saveBarBtn = document.getElementById('cta-save-bar');
  if (saveHeroBtn) saveHeroBtn.addEventListener('click', downloadVCard);
  if (saveBarBtn) saveBarBtn.addEventListener('click', downloadVCard);

  // 4. Wire Share triggers
  const shareHeroBtn = document.getElementById('cta-share-hero');
  const shareBarBtn = document.getElementById('cta-share-bar');
  if (shareHeroBtn) shareHeroBtn.addEventListener('click', (e) => triggerShare(e.currentTarget));
  if (shareBarBtn) shareBarBtn.addEventListener('click', (e) => triggerShare(e.currentTarget));
});
