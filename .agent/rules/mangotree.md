---
trigger: always_on
---

# MangoTree Digital Card — Always-On Rules

## Project
Single-page, static, mobile-first premium digital business card for MangoTree Insurance & Investments (Amit Jain, Founder & CEO). Hosted on GitHub Pages under a repo sub-path or custom domain. No backend.

## Hard constraints (never violate)
1. **Static only.** No server, database, auth, CRM, payments, chat backend, newsletter, appointment scheduling. Do not add features I haven't asked for.
2. **Relative paths only** (`./assets/...`). Must work at `https://user.github.io/repo/` and at a custom domain root.
3. **Never fabricate**: testimonials, ratings, review counts, awards, certifications, licences, statistics, returns, guarantees, "best/No.1" claims, regulatory claims, partner relationships.
4. **Use supplied assets untouched.** Never redraw/recolour/distort the MangoTree logo. Never retouch the portrait. Never edit certificate text. Never regenerate the QR unless I say so. Originals live in `assets/source/` and are read-only; write optimised copies to `assets/img/`.
5. **Two separate systems — never mix them:**
   - *Follow/Connect* = opens MangoTree's own profiles (Instagram, Facebook, YouTube).
   - *Share* = shares the **digital-card page URL** to the visitor's own network. MangoTree's profile URLs must never appear in share code.
6. **Exact URLs** (do not shorten, alter, or "fix"): defined once in `js/config.js`. All UI reads from config. No URL is hard-coded anywhere else.
7. **Do not invent** X/Threads/LinkedIn profiles for MangoTree. Those platforms exist only as *share* targets.
8. **Partner logos** (HDFC ERGO, LIC, Niva Bupa, STAR Health) are third-party brands. Never imply ownership, exclusivity, or a specific product tie-up. Only approved service↔partner mappings.
9. **Privacy:** no cookies, no third-party scripts, no fingerprinting, no data collection. Analytics only if I approve later.
10. No `alert()`. Use toasts and accessible dialogs.

## Engineering standards
- Vanilla HTML + modern CSS + ES modules (unless the approved plan says otherwise). No framework, no Tailwind, no jQuery.
- Semantic HTML first: `<a>` for navigation/links (tel, mailto, wa.me), `<button>` for actions, `<dialog>` for modals/sheets.
- CSS: custom-property tokens, `@layer`, mobile-first, `clamp()` type scale, `svh`/`dvh` units (not `100vh`), `env(safe-area-inset-*)`.
- Animate only `transform`, `opacity`, `clip-path`. Never animate layout properties.
- Every animation has a `prefers-reduced-motion: reduce` alternative (fade only, or none).
- Content visible and usable without JavaScript wherever possible (progressive enhancement).
- External links: `target="_blank" rel="noopener noreferrer"`. tel/mailto: no target.
- Touch targets ≥ 44×44 px. Visible `:focus-visible` states. WCAG AA contrast.
- Images: explicit `width`/`height`, responsive `srcset`, AVIF/WebP + fallback, only the hero portrait is eager (`fetchpriority="high"`); everything else lazy.
- Fonts: self-hosted WOFF2, subset, `font-display: swap`, max 2 families.
- No console errors. No layout shift. No horizontal scroll at 320 px.

## Process
- **Plan → wait for approval → build in phases.** Never jump ahead of the approved phase.
- After each phase: verify in browser at 320/375/390/430/768/1280/1600 px, attach screenshots, list what was tested, list what could NOT be tested (e.g., real iOS Safari).
- If information is missing (Maps URL, IDs, copy), **ask** or leave a clearly marked `TODO(approval)`. Do not guess.