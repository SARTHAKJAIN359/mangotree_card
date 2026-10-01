/**
 * Scroll Reveal, Section Observer & Marquee Controller
 * Observes section entrances to trigger one-time reveals and activate Growth Stem leaf nodes.
 */

export function initScrollReveals() {
  const sections = document.querySelectorAll('.reveal-on-scroll');
  if (!sections.length) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach(sec => sec.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve after one-time reveal
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

export function initMarqueeControls() {
  const track = document.getElementById('services-track');
  const toggleBtn = document.getElementById('btn-toggle-marquee');
  const statusText = document.getElementById('marquee-status-text');

  if (track && toggleBtn && statusText) {
    toggleBtn.addEventListener('click', () => {
      const isPaused = track.classList.toggle('is-paused');
      statusText.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
      toggleBtn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
    });
  }
}
