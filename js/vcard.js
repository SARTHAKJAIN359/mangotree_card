/**
 * vCard 3.0 Contact Generator & Downloader
 * Client-side vCard creation with static fallback for maximum device compatibility.
 */
import { CONFIG } from './config.js';
import { showToast } from './toast.js';

function escapeVCard(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Builds RFC-compliant vCard 3.0 content from single-source-of-truth CONFIG
 * @returns {string}
 */
export function generateVCardString() {
  const p = CONFIG.profile;
  const addressParts = [
    '', // post office box
    '', // extended address
    escapeVCard(p.address.street),
    escapeVCard(p.address.locality),
    escapeVCard(p.address.region),
    escapeVCard(p.address.postal),
    escapeVCard(p.address.country)
  ].join(';');

  // Strict CRLF line terminators per vCard 3.0 spec
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(p.name.split(' ').pop() || 'Jain')};${escapeVCard(p.name.split(' ').slice(0, -1).join(' ') || 'Amit')};;;`,
    `FN:${p.name}`,
    `ORG:${p.company}`,
    `TITLE:${p.title}`,
    `TEL;TYPE=WORK,VOICE:${p.phoneE164}`,
    `EMAIL;TYPE=WORK:${p.emailAddress || p.email.replace('mailto:', '')}`,
    `URL:${p.website}`,
    `ADR;TYPE=WORK:${addressParts}`,
    `NOTE:${escapeVCard(p.tagline)}`,
    'END:VCARD'
  ];

  return lines.join('\r\n') + '\r\n';
}

/**
 * Download the vCard file or fall back to static .vcf file
 */
export function downloadVCard() {
  try {
    const vcardContent = generateVCardString();
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${CONFIG.profile.name.replace(/\s+/g, '_')}.vcf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Keep object URL alive for 12 seconds so iOS Safari finishes file processing
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 12000);

    showToast('Contact card downloaded! Open to save.', 'success');
  } catch (err) {
    console.warn('Dynamic vCard blob failed, using static fallback:', err);
    // Static fallback
    const fallbackLink = document.createElement('a');
    fallbackLink.href = './assets/amit-jain.vcf';
    fallbackLink.download = 'Amit_Jain.vcf';
    fallbackLink.style.display = 'none';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);

    showToast('Downloading contact card...', 'info');
  }
}
