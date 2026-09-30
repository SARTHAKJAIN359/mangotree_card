/**
 * Share System
 * Native Web Share with fallback to accessible custom share modal dialog.
 * CRITICAL CONSTRAINT: Only shares the digital card URL. MangoTree profile URLs NEVER appear here.
 */
import { CONFIG, getShareUrl } from './config.js';
import { openDialog, setupDialog } from './dialogs.js';
import { showToast } from './toast.js';

let shareDialog = null;

/**
 * Initializes the share dialog DOM and listeners
 */
export function initShare() {
  shareDialog = document.getElementById('share-dialog');
  if (shareDialog) {
    setupDialog(shareDialog);
    setupShareLinks();
  }

  // Wire Copy Link button
  const copyBtn = document.getElementById('btn-copy-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', handleCopyLink);
  }
}

/**
 * Trigger native share sheet or open custom dialog fallback
 * @param {HTMLElement} [triggerEl]
 */
export async function triggerShare(triggerEl = null) {
  const shareUrl = getShareUrl();
  const shareData = {
    title: CONFIG.share.title,
    text: CONFIG.share.text,
    url: shareUrl
  };

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // 1. Try Native Web Share API if supported on mobile
  if (isMobile && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      showToast('Thanks for sharing!', 'success');
      return;
    } catch (err) {
      // User cancelled share or aborted
      if (err.name === 'AbortError') return;
      console.warn('Native share failed, falling back to modal:', err);
    }
  }

  // 2. Fallback to custom modal dialog (Desktop & unsupported browsers)
  if (shareDialog) {
    const linkInput = document.getElementById('share-url-input');
    if (linkInput) {
      linkInput.value = shareUrl;
    }
    openDialog(shareDialog, triggerEl);
  } else {
    handleCopyLink();
  }
}

/**
 * Sets up verified platform endpoints for sharing THIS PAGE
 */
function setupShareLinks() {
  const shareUrl = getShareUrl();
  const shareText = CONFIG.share.text;

  const links = {
    'share-whatsapp': `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    'share-x': `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    'share-facebook': `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    'share-linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    'share-threads': `https://www.threads.com/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  };

  Object.entries(links).forEach(([id, href]) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = href;
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/**
 * Copies the current digital card link to clipboard
 */
export async function handleCopyLink() {
  const shareUrl = getShareUrl();

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      // Fallback for older browsers / non-HTTPS
      const tempInput = document.createElement('input');
      tempInput.value = shareUrl;
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
    showToast('Card link copied to clipboard!', 'success');
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    showToast('Failed to copy. Please copy the URL manually.', 'warning');
  }
}
