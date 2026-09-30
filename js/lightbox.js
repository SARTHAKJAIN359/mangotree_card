/**
 * Lightbox Dialog Controller
 * Manages the award recognition certificate modal dialog.
 */
import { openDialog, setupDialog } from './dialogs.js';

export function initLightbox() {
  const lightbox = document.getElementById('lightbox-dialog');
  const trigger = document.getElementById('recognition-card');

  if (lightbox && trigger) {
    setupDialog(lightbox);
    trigger.addEventListener('click', () => {
      openDialog(lightbox, trigger);
    });
  }
}
