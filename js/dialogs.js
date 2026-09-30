/**
 * Accessible Dialog & Modal Controller
 * Wraps HTML5 <dialog> element with backdrop dismiss, escape key handling, and focus return.
 */

let activeTrigger = null;

/**
 * Open a dialog element modally
 * @param {HTMLDialogElement} dialog 
 * @param {HTMLElement} [triggerEl]
 */
export function openDialog(dialog, triggerEl = null) {
  if (!dialog) return;
  activeTrigger = triggerEl || document.activeElement;

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }

  document.body.classList.add('dialog-open');

  // Focus the close button or first interactive element
  const focusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) {
    focusable.focus();
  }
}

/**
 * Close a dialog element
 * @param {HTMLDialogElement} dialog 
 */
export function closeDialog(dialog) {
  if (!dialog) return;

  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }

  document.body.classList.remove('dialog-open');

  // Return focus to the element that opened the dialog
  if (activeTrigger && typeof activeTrigger.focus === 'function') {
    activeTrigger.focus();
    activeTrigger = null;
  }
}

/**
 * Bind global backdrop dismiss and close button clicks for a dialog
 * @param {HTMLDialogElement} dialog 
 */
export function setupDialog(dialog) {
  if (!dialog) return;

  // Dismiss when clicking the backdrop (target equals dialog element itself)
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeDialog(dialog);
    }
  });

  // Close buttons with [data-close-dialog] attribute
  const closeBtns = dialog.querySelectorAll('[data-close-dialog]');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeDialog(dialog));
  });

  // Handle native cancel event (Escape key)
  dialog.addEventListener('cancel', () => {
    document.body.classList.remove('dialog-open');
    if (activeTrigger && typeof activeTrigger.focus === 'function') {
      activeTrigger.focus();
      activeTrigger = null;
    }
  });
}
