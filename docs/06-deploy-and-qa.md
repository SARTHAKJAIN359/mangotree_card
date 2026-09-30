# Deployment and QA Plan

## 1. Engineering Stack
**Proposed:** Vanilla HTML / CSS / ES-Modules.
**Reasoning:** A single-page digital card with no backend, database, or complex state does not require Vite, React, or Astro. Vanilla ensures the absolute smallest bundle size, fastest TTI (Time to Interactive), perfect SEO control, and frictionless deployment to GitHub Pages. CSS variables and `@layer` provide enough structure without Tailwind.

## 2. GitHub Pages Architecture
- Hosted via standard repository or custom domain.
- `index.html` at root.
- Relative paths (`./assets/...`) strictly enforced to ensure it works under a subpath (e.g. `user.github.io/repo/`).
- `.nojekyll` included to prevent GitHub Pages from ignoring folders starting with underscores (just in case).

## 3. SEO & Metadata Plan
- **Index Status:** `index, follow` (assuming this is meant to be public and discoverable).
- **Title Tag:** Amit Jain | Founder & CEO | MangoTree Insurance & Investments
- **Meta Description:** "Aam ke aam, guthliyon ke daam. Contact Amit Jain for life, health, and mutual funds services."
- **Open Graph / Twitter:**
  - `og:title`, `og:description`
  - `og:image`: Absolute URL required. We will create a 1200x630 composition containing the Canopy Arch, portrait, and logo.
- **JSON-LD Schema:** Combination of `@type: Person` and `@type: InsuranceAgency`.

## 4. Performance Budget (Target: Lighthouse 100/100/100/100)
- LCP < 2.0s on Mobile 4G.
- CLS < 0.05.
- JS: <= 15KB (Gzipped).
- CSS: <= 25KB (Gzipped).
- Fonts: 2 WOFF2 subsets (Fraunces, Manrope) <= 60KB total.
- Images: AVIF/WebP lazy loaded, explicit width/height. Portrait eager loaded.

## 5. Security
- Strict CSP `<meta>` (no inline scripts, no 3rd-party domains).
- Links: `target="_blank" rel="noopener noreferrer"`.
- Data: Fully stateless.

## 6. QA Checklist
- [ ] 320px width (iPhone SE) horizontal scroll check.
- [ ] 430px width (iPhone 15 Pro Max) layout check.
- [ ] Desktop (1280px+) layout check.
- [ ] vCard downloads and opens on Android.
- [ ] vCard downloads and opens on iOS Safari.
- [ ] WhatsApp link populates correct number.
- [ ] Share buttons trigger correct endpoints.
- [ ] Axe accessibility audit (0 errors).
- [ ] Reduced motion testing.

## 7. Phased Development Plan
- **Phase 1:** Core HTML Semantics & `config.js` data layer.
- **Phase 2:** CSS Architecture (Tokens, Reset, Layout).
- **Phase 3:** Hero & Action Cluster (Buttons, Canopy design).
- **Phase 4:** Content Sections (Bento, Partner Rail, Recognition).
- **Phase 5:** Interactive Logic (vCard, Share, Lightbox, Stem animation).
- **Phase 6:** Asset Optimization (Images, Fonts, Icons).
- **Phase 7:** Final QA, Accessibility Audit, & Deployment Prep.
