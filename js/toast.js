/**
 * Toast Notification System
 * Accessible ARIA live notifications. No alert() calls.
 */

let toastContainer = null;
let toastTimeout = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-region');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-region';
      toastContainer.className = 'toast-region';
      toastContainer.setAttribute('role', 'status');
      toastContainer.setAttribute('aria-live', 'polite');
      toastContainer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {'info' | 'success' | 'warning'} [type='info'] - Notification style
 * @param {number} [duration=3200] - Duration in ms
 */
export function showToast(message, type = 'info', duration = 3200) {
  const container = ensureToastContainer();
  
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }

  container.innerHTML = `
    <div class="toast-card toast-${type}" role="alert">
      <span class="toast-text">${message}</span>
      <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
    </div>
  `;

  const toastCard = container.querySelector('.toast-card');
  const closeBtn = container.querySelector('.toast-close');

  const dismiss = () => {
    if (!toastCard) return;
    toastCard.classList.add('toast-exit');
    setTimeout(() => {
      container.innerHTML = '';
    }, 200);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', dismiss);
  }

  // Request animation frame for smooth entrance
  requestAnimationFrame(() => {
    toastCard.classList.add('toast-enter');
  });

  toastTimeout = setTimeout(dismiss, duration);
}
