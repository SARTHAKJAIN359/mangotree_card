# MangoTree Digital Business Card 🍃

> **Single-Page, Mobile-First Premium Digital Card for MangoTree Insurance & Investments**  
> Founder & CEO: **Amit Jain**  
> Tagline: *"Aam ke aam, guthliyon ke daam."*

---

## 📌 Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [Owner Edit Guide (Update Info via GitHub.com)](#owner-edit-guide-update-info-via-githubcom)
3. [How to Update Images](#how-to-update-images)
4. [Deployment & Rollback Guide](#deployment--rollback-guide)
5. [Custom Domain & DNS Configuration](#custom-domain--dns-configuration)
6. [Cache-Busting Tip (Instant Updates)](#cache-busting-tip-instant-updates)
7. [NFC Tag Programming Guide (Smart Physical Cards)](#nfc-tag-programming-guide-smart-physical-cards)
8. [QR Code Audit & Regeneration Guide](#qr-code-audit--regeneration-guide)
9. [Pre-Launch & Handover Checklist](#pre-launch--handover-checklist)
10. [Recommended Future Improvements](#recommended-future-improvements)

---

## 1. Overview & Architecture

This digital card is engineered with zero runtime frameworks, zero backend dependencies, and zero trackers. It complies with strict **WCAG AA** accessibility standards, **Lighthouse 100/100** best practices, and GitHub Pages static hosting rules.

- **Stack**: Semantic HTML5, Modern CSS3 (`@layer`, custom tokens, CSS scroll-driven animations with JS fallback), Vanilla ES Modules.
- **Paths**: 100% relative (`./assets/...`, `./css/...`) — runs seamlessly under a repository sub-path (e.g. `https://username.github.io/repo/`) or custom apex/sub-domains.
- **No Backend**: No database, CRM, external trackers, or third-party cookies.
- **Strict Separation of Concerns**:
  - **Follow / Connect**: Links directly to MangoTree's own social profiles (Instagram, Facebook, YouTube).
  - **Share**: Shares the digital business card URL to the visitor's network (WhatsApp, X, Facebook, LinkedIn, Threads, Native Web Share). MangoTree's private profile handles never appear in share targets.

---

## 2. Owner Edit Guide (Update Info via GitHub.com)

You do **not** need a code editor or technical setup to update phone numbers, business hours, services, or text. Everything is controlled from a single configuration file: [`js/config.js`](./js/config.js).

### Step-by-Step Instructions:
1. Log in to [github.com](https://github.com) and open this repository.
2. In the file list, click on the **`js`** folder, then click on **`config.js`**.
3. In the top-right corner of the file viewer, click the **Pencil icon** (✏️ *"Edit this file"*).
4. Update the values inside the quotes (`""`):

```javascript
export const CONFIG = Object.freeze({
  canonicalUrl: "https://sarthakjain359.github.io/mangotree_card/", // Or your custom domain
  profile: {
    name: "Amit Jain",
    title: "Founder & CEO",
    company: "MangoTree Insurance & Investments",
    tagline: "Aam ke aam, guthliyon ke daam.",
    phoneDisplay: "9911502502",                      // Shown in text on the card
    phoneE164: "+919911502502",                      // Used for tap-to-dial & WhatsApp
    whatsapp: "https://wa.me/919911502502",          // Direct WhatsApp link
    emailAddress: "mangotreeinsurance@gmail.com",    // Email address
    website: "https://www.mangotreeinsurance.com/",  // Corporate website
    address: {
      street: "324, Cloud-9 Towers, Vaishali",
      locality: "Ghaziabad",
      postal: "201010",
      country: "India"
    },
    hours: "Mon-Sun: 9:00 AM – 7:00 PM",             // Business hours
    mapsUrl: null,                                   // Set to your exact Google Maps link when ready
    googleReview: "https://g.page/r/CfZoMek3yZ3lEBM/review"
  },
  ...
});
```

5. Scroll down to the bottom of the page to **Commit changes...**.
6. Select **"Commit directly to the main branch"** and click **Commit changes**.
7. GitHub Pages will automatically redeploy the updated card within 60–90 seconds.

---

## 3. How to Update Images

All optimized production images reside in [`assets/img/`](./assets/img/). Untouched original source assets are archived in [`assets/source/`](./assets/source/).

### Image Specifications:
| Image | File Path | Format | Recommended Dimensions | Notes |
|---|---|---|---|---|
| **Logo** | `assets/img/logo-mangotree.png` | PNG (transparent) | ~480×144 px | Natural aspect ratio, crisp typography |
| **Hero Portrait** | `assets/img/portrait-amit-jain.jpeg` | JPEG / WebP | 720×960 px | Framed inside the organic Canopy arch |
| **Award / Certificate** | `assets/img/award-recognition.png` | PNG / JPEG | ~585×1040 px | High resolution for lightbox pinch-to-zoom |
| **Partner Logos** | `assets/img/partner-*.jpeg` | JPEG / PNG | 512×264 px | Equal visual weight on white background |
| **Social OG Preview** | `assets/img/og-image.jpg` | JPEG | 1200×630 px | WhatsApp / iMessage / LinkedIn link preview |
| **Favicons** | `assets/img/favicon-32x32.png` | PNG / ICO | 32×32, 180×180 | Browser tab and iOS home screen icons |

### Replacing an image on GitHub.com:
1. Navigate to `assets/img/` on GitHub.
2. Click **Add file** ➔ **Upload files**.
3. Drag and drop your replacement file **using the exact same filename** (e.g. `portrait-amit-jain.jpeg`).
4. Commit directly to the `main` branch.

---

## 4. Deployment & Rollback Guide

### Initial GitHub Pages Setup:
1. Open repository **Settings** on GitHub.
2. Click **Pages** in the left sidebar (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and `/ (root)`.
4. Click **Save**.
5. Wait ~2 minutes. Your card will be live at `https://<github-username>.github.io/<repo-name>/`.

### Rollback Steps (If a mistake is made):
- **Via GitHub UI**:
  1. Click on **Commits** history on GitHub.
  2. Find the last commit that worked properly.
  3. Click on the commit hash, then click the **...** menu in the top-right and select **Revert this commit**.
  4. Confirm the revert commit. GitHub Pages will redeploy the previous working version within 2 minutes.
- **Via Git Command Line**:
  ```bash
  # Revert the latest commit cleanly
  git revert HEAD
  git push origin main
  ```

---

## 5. Custom Domain & DNS Configuration

To make your digital card accessible at your own branded address (e.g., `card.mangotreeinsurance.com` or `amitjain.in`):

### Option A: Subdomain (Recommended — e.g. `card.mangotreeinsurance.com`)
1. In the root of this repository, create or edit a file named **`CNAME`** containing your subdomain on a single line:
   ```text
   card.mangotreeinsurance.com
   ```
2. Log into your DNS provider (GoDaddy, Cloudflare, Namecheap, BigRock):
   - **Type**: `CNAME`
   - **Name / Host**: `card`
   - **Value / Target**: `<your-github-username>.github.io.`
   - **TTL**: Automatic or 3600 (1 hour)
3. In GitHub Repo ➔ **Settings** ➔ **Pages** ➔ **Custom domain**, enter `card.mangotreeinsurance.com` and click **Save**.
4. Check the box for **"Enforce HTTPS"** (SSL certificate activates automatically within 15–30 minutes).

### Option B: Apex / Root Domain (e.g. `mangotree.in`)
Add 4 DNS `A` records pointing to GitHub Pages IP addresses:
```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## 6. Cache-Busting Tip (Instant Updates)

GitHub Pages and mobile browsers (iOS Safari and Android Chrome) aggressively cache static `.css` and `.js` files for 10–15 minutes.

If you edit `css/` or `js/` files and your smartphone still displays the old version:
1. Open [`index.html`](./index.html) in GitHub.
2. Update the version query string parameter `?v=` on the stylesheet links in the `<head>`:
   ```html
   <!-- Change ?v=3 to ?v=4 -->
   <link rel="stylesheet" href="./css/tokens.css?v=4">
   <link rel="stylesheet" href="./css/base.css?v=4">
   <link rel="stylesheet" href="./css/layout.css?v=4">
   <link rel="stylesheet" href="./css/components.css?v=4">
   <link rel="stylesheet" href="./css/sections.css?v=4">
   <link rel="stylesheet" href="./css/motion.css?v=4">
   ```
3. Commit the change. The incremented version forces every browser and CDN edge node to download the fresh files immediately.

---

## 7. NFC Tag Programming Guide (Smart Physical Cards)

You can write this digital business card URL into physical NFC cards, keyfobs, or phone badges so anyone who taps their smartphone on your card immediately opens your profile.

### Recommended Hardware:
- Any NFC Card or sticker with **NTAG213**, **NTAG215**, or **NTAG216** chip (available on Amazon).

### Step-by-Step Programming with "NFC Tools" (Free App):
1. Install **NFC Tools** on your smartphone:
   - [iOS App Store](https://apps.apple.com/app/nfc-tools/id1252962749)
   - [Google Play Store](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc)
2. Open the app and tap **Write**.
3. Tap **Add a record** ➔ select **URL / URI**.
4. Enter your digital card URL:
   ```text
   https://sarthakjain359.github.io/mangotree_card/
   ```
   *(or your custom domain `https://card.mangotreeinsurance.com/`)*
5. Tap **OK**, then tap **Write / [XX Bytes]**.
6. Hold your physical NFC card against the back of your smartphone until you see the green checkmark (✅ **Write complete**).
7. **Locking Tip**: Only after testing and verifying that the tap opens your card flawlessly, you can optionally choose **Other** ➔ **Lock tag** in NFC Tools to make the card permanent and prevent anyone from overwriting it.

---

## 8. QR Code Audit & Regeneration Guide

### Current QR Code Verification Result:
- **File**: `assets/source/qr-mangotree.png` and `assets/img/qr-mangotree.png`
- **Scanned Content**: `https://qrch.pro/tm63ea8qvbib`
- **Destination**: The supplied QR redirects via QRCodeChimp directly to Amit Jain's **Google Review** page:
  `https://g.page/r/CfZoMek3yZ3lEBM/review`
- **Notice**: This QR code **does not point to the digital card itself**; it is a Google Review QR.

### What QR to Regenerate for Printed Business Cards:
When printing physical business cards or flyers intended to direct visitors to **this digital business card**, generate a clean QR code encoding the canonical card URL:
- **Target URL**: `https://sarthakjain359.github.io/mangotree_card/` (or your custom domain)
- **Error Correction**: Level `Q` (25%) or `H` (30%) if embedding a small center logo, or Level `M` (15%) for standard clean dots.
- **Resolution**: ≥ 1024×1024 px PNG.
- **Quiet Zone**: 4 modules of white padding.

---

## 9. Pre-Launch & Handover Checklist

### Functional QA Matrix:
- [x] **WhatsApp Primary CTA**: Opens `https://wa.me/919911502502` directly.
- [x] **Direct Phone Call**: Dials `+919911502502` (`tel:+919911502502`).
- [x] **Email**: Opens default mail composer to `mangotreeinsurance@gmail.com`.
- [x] **Add to Contacts (vCard)**: Downloads RFC-compliant `Amit_Jain.vcf` with full contact fields, address, and hours; works across Android, iOS Safari, and desktop.
- [x] **Share Sheet**: Native Web Share API on mobile, accessible `<dialog>` fallback on desktop with Copy Link toast notification.
- [x] **Share Target Integrity**: Verified that no MangoTree social channel appears in share targets.
- [x] **Services Accordion**: Single-card expansion with synchronized pulsing, outside-click and Escape key auto-dismiss, automatic marquee pausing while details are read.
- [x] **Industry Recognition Lightbox**: Full certificate zoom with modal trap, backdrop dismissal, and focus return.
- [x] **Responsive Layouts**: 0 horizontal scroll verified across 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1600px.
- [x] **Accessibility**: Zero axe/Lighthouse violations (`aria-hidden` focus fixed, `role="img"` on rating stars, WCAG AA contrast).
- [x] **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support.

---

## 10. Recommended Future Improvements

*(None implemented — for future planning and roadmap consideration)*

1. **Google Maps Place Link**: Update `mapsUrl` in `js/config.js` once the official Google Business profile link is generated to enable a 1-tap "Get Directions" navigation button.
2. **Service-Specific WhatsApp Inquiries**: Optional pre-filled WhatsApp messages for specific services (e.g. `https://wa.me/919911502502?text=Hi%20Amit%2C%20I%20would%20like%20guidance%20on%20Health%20Insurance`).
3. **Dedicated Card QR Code Asset**: Replace the Google Review QR image in `assets/img/qr-mangotree.png` with a dedicated QR pointing to the digital card root.
4. **Offline PWA Support**: Add a minimal Service Worker and Web App Manifest (`manifest.json`) so clients can "Add to Home Screen" as an app icon with instant offline loading.
5. **Multi-Language Selector**: Add Hindi/English language toggle for clients who prefer bilingual Hindi Devanagari script.

---
*Maintained with pride for MangoTree Insurance & Investments • 2026*
