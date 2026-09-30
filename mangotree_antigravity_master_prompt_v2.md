# MangoTree Digital Card — Antigravity Master Playbook (v2)

**What this file is:** an upgraded version of your original prompt, split into four parts so Antigravity actually follows it:

| Part | For whom | What you do with it |
|---|---|---|
| **1. Operator Playbook** | You | Read once. Setup checklist, workflow, hosting decision, pro tips. |
| **2. Project Rules** | The agent (always-on) | Save as `.agent/rules/mangotree.md` |
| **3. Kickoff Prompt (Phase 0)** | The agent | Paste as your first message, in **Planning mode** |
| **4. Phase Prompts (1–7)** | The agent | Paste one at a time, after you approve each stage |
| **5. Appendix** | Agent + you | Code patterns, tokens, snippets, QA matrix, deploy commands |

**Why the split?** The original was ~1,800 lines in one message. Long single prompts get diluted: hard constraints (exact URLs, "don't fabricate", "Share ≠ Follow") compete with nice-to-haves. Now the hard constraints live in a small always-on rules file, and the big brief is broken into approve-able phases.

---

# PART 1 — OPERATOR PLAYBOOK (for you)

## 1.1 Before you open Antigravity (15-minute checklist)

**Folder layout to create first** (so the agent never has to guess what an asset is):

```text
mangotree-card/
├── .agent/
│   └── rules/mangotree.md            ← Part 2 of this file
├── reference/                        ← YOU add screenshots (see below)
│   ├── prudent-mobile-01.png …
│   └── mangotree-site-home.png …
├── assets/
│   └── source/                       ← UNTOUCHED originals. Agent must never edit these.
│       ├── logo-mangotree.(svg|png)
│       ├── portrait-amit-jain.jpg
│       ├── award-recognition.jpg
│       ├── qr-mangotree.png
│       ├── partner-lic.png
│       ├── partner-niva-bupa.png
│       ├── partner-star-health.png
│       └── partner-hdfc-ergo.png
└── docs/
```

**Rename every uploaded image with the names above** and drop them in `assets/source/`. Your original prompt says "I have provided the following assets" — but the agent can only use files it can see in the workspace.

**Take reference screenshots yourself** (phone width, full-page scroll, plus a few close-ups) of:
1. The Prudent card page you like
2. The current MangoTree website (home, services, footer disclaimer)

Antigravity's browser agent can visit URLs, but sites can block automation, load lazily, or render differently. Screenshots in `/reference/` are a guaranteed fallback and let you point at exact details ("this card layout, not that one").

**Decide these 5 things now (they block the plan otherwise):**

| # | Decision | My recommendation |
|---|---|---|
| 1 | Final public URL | Use a **subdomain of a domain you already own**, e.g. `card.mangotreeinsurance.com` (free: one DNS CNAME record). It stays yours forever even if you change hosts. |
| 2 | Hosting | **GitHub Pages** (see 1.4). Not Vercel free — see the licence warning. |
| 3 | Google Maps link | Open your business on Google Maps → Share → copy link. Give it to the agent. Never let it invent one. |
| 4 | Display name | Card says "Amit Jain"; the certificate says "Amit Kumar Jain". Confirm the name on the card and in the contact file. |
| 5 | Regulatory IDs | If you're required to show any (IRDAI agent/POSP/corporate-agent number, AMFI ARN, etc.), have them ready. Show **only** what you can prove. |

> ⚠️ **QR warning:** your supplied QR encodes *some* URL. If it points to your old website or a URL you'll change, it will break silently in printed material. Scan it now. If it doesn't point to the final card URL, generate a new one **after** the URL is final (Phase 7).

## 1.2 Antigravity setup

1. **Open the `mangotree-card` folder as the workspace** (rules/workflows are per-workspace).
2. Put Part 2 into `.agent/rules/mangotree.md`. Current Antigravity builds also read workspace rule files such as `AGENTS.md`/`GEMINI.md`; check *Settings → Customizations/Rules* in your version, since the UI evolves. If unsure, also paste Part 2 at the top of your first message.
3. **Autonomy setting:** choose the balanced "Review-driven" profile (agent works, but asks before risky terminal commands). Do **not** give it unattended `git push`/deploy rights.
4. **Mode:** use **Planning** mode for Phases 0–1 and anything structural (share/vCard/dialogs). Use **Fast** mode for small tweaks ("make the tagline 2px bigger").
5. **Model:** pick the strongest model available to you for Phases 0 and 2 (design decisions). A lighter/faster one is fine for polish tweaks.

## 1.3 The working loop (per phase)

```text
Paste phase prompt → agent writes Implementation Plan + Task List artifacts
→ YOU review the plan (leave comments on the artifact) → approve
→ agent builds → agent verifies in the browser and attaches screenshots (Walkthrough)
→ YOU check on a REAL PHONE → git commit → next phase
```

Rules of thumb:
- **One phase = one commit = one tag** (`v0.1-foundation`, `v0.2-hero`…). If the agent breaks something, you roll back in seconds.
- **Never approve a plan you skimmed.** The plan is where design mistakes are cheap to fix.
- **Comment, don't rewrite.** Point at specifics: "Hero: portrait too small; CTA row must be visible without scroll at 375×667."
- **Deploy on day one** (Phase 1 pushes an empty skeleton to GitHub Pages). Path bugs are found in minutes, not at the end.
- **Test on a real phone every phase.** Antigravity's browser can't reproduce iOS Safari behaviour — and vCard download and bottom-sheet behaviour differ on iOS. Open your live URL on an iPhone *and* an Android phone.

## 1.4 Hosting: GitHub Pages vs Vercel

| | GitHub Pages | Vercel (free "Hobby") | Cloudflare Pages / Netlify |
|---|---|---|---|
| Cost | Free | Free | Free tiers |
| Build step needed | No | No | No |
| Commercial use on free plan | Fine for an informational business page | **Not allowed** — Vercel's Hobby plan is restricted to non-commercial personal use; advertising a product or service counts as commercial | Check current terms, generally more permissive |
| Custom domain + HTTPS | Yes | Yes | Yes |
| Fit for this project | ✅ Best | ❌ Avoid unless you go Pro | ✅ Good alternative |

**Recommendation: GitHub Pages**, with a custom subdomain. Requirements: a **public** repo on a free GitHub account (fine — every detail on the card is public anyway).

Things the agent will not think of:
- GitHub Pages caches assets ~10 minutes. After edits, cache-bust with `?v=2` on CSS/JS URLs.
- Add an empty `.nojekyll` file so Pages doesn't process your files.
- Commit a `CNAME` file containing only your custom domain.
- Pick **one** canonical URL. Don't publish the same card on two hosts (duplicate/confusing shares, QR mismatch).

## 1.5 Pro tips that make this feel premium

1. **Ask for 2–3 design directions before code** (already built into Phase 0). The single biggest cause of "AI-looking" sites is skipping this.
2. **Share previews are half the product.** When someone shares your link on WhatsApp, the *preview image + title* is what people see. Social crawlers don't run JavaScript and need **absolute URLs** for `og:image`. Phase 6 covers this. Test with WhatsApp itself (send the link to yourself) — WhatsApp caches previews aggressively, so add `?v=2` to force a refresh.
3. **NFC:** write the final URL to a cheap NTAG213/215 NFC sticker and put it on a physical card/desk stand. Tap-to-open is a strong "digital card" moment.
4. **Owner edit guide:** ask the agent (Phase 7) to write a `README` section: "To change phone/hours/text, edit `js/config.js` on github.com → Commit → live in ~1 minute." You should never need an IDE for a phone number change.
5. **Zero third-party requests.** Self-host fonts, inline icons, no CDNs, no trackers. Faster, private, no consent banner needed.
6. **Per-service WhatsApp prefill** (optional, needs your approval): each service opens WhatsApp with a ready message, e.g. `https://wa.me/919911502502?text=Hi%20Amit%2C%20I%27d%20like%20to%20know%20about%20Health%20Insurance`. It turns a browsing visitor into a conversation. The base URL stays exactly as supplied; only a text parameter is added.
7. **Real-world analytics without invasion:** if you later want tap counts, use a cookie-free tool (e.g. GoatCounter or Cloudflare Web Analytics). Keep it out of v1.
8. **Content honesty = brand protection.** In insurance/mutual funds, one exaggerated claim is a liability. The rules file makes the agent refuse to invent anything.

---

# PART 2 — PROJECT RULES (save as `.agent/rules/mangotree.md`)

`````markdown
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
`````

---

# PART 3 — KICKOFF PROMPT (Phase 0: Research → Plan → STOP)

> Paste this in **Planning mode**. Attach/refer to `/reference/` and `/assets/source/`.

`````markdown
# MangoTree Insurance & Investments — Premium Digital Business Card

## 1. Your roles
Act as a senior team combined into one: Product Designer, UI/UX Designer, Brand Designer, Interaction/Motion Designer, Frontend Architect, Accessibility Engineer, Performance Engineer.

## 2. The product
A **premium digital identity / smart business card** for **Amit Jain, Founder & CEO, MangoTree Insurance & Investments**. It is *not* a corporate website and *not* a template-looking "digital visiting card". Think: the polish of a modern fintech product, the warmth of a personal advisor, the speed of a native app.

Visitors (mostly on phones, arriving via WhatsApp, QR or NFC) must feel: **professional, trustworthy, modern, personal — and be able to contact, save and share in one tap.**

Tagline (exact, never altered): **Aam ke aam, guthliyon ke daam.**
(This is Hinglish written in Latin script. Mark it up with `lang="hi-Latn"`. Do not translate or add a gloss without asking me.)

Hosting: static files on GitHub Pages. Follow `.agent/rules/mangotree.md` at all times.

## 3. STOP-GATE — this first task is PLANNING ONLY
Do **not** write website code yet. Do research, analysis and planning, produce the deliverables in §11, then **stop and wait for my written approval.**

Research steps:
1. Study my reference screenshots in `/reference/` and, if reachable, the live pages:
   - Reference card (for *functionality & UX patterns only*, never to copy branding/graphics/layout): https://prudentcorporate.com/BusinessCard/UserDetails/36323637
   - Current MangoTree site (content, disclaimers, tone — **not** its layout): https://www.mangotreeinsurance.com/
2. Inspect every file in `/assets/source/` (dimensions, transparency, colours, legibility, file size).
3. From the reference, list what works and what's weak: information order, CTA hierarchy, save-contact, share, social actions, density, motion, trust signals, mobile ergonomics. Be specific and critical.
4. Sample the **exact brand colours from the logo** (report hex values and where each appears).
5. Read the current MangoTree site's disclaimer/legal text and propose a compact way to present it.

## 4. Approved content & data
Single source of truth → will live in `js/config.js`.

```text
NAME:            Amit Jain            (confirm vs certificate name "Amit Kumar Jain")
TITLE:           Founder & CEO
COMPANY:         MangoTree Insurance & Investments
TAGLINE:         Aam ke aam, guthliyon ke daam.
PHONE:           9911502502           (tel link uses +919911502502)
WHATSAPP:        https://wa.me/919911502502
EMAIL:           mailto:mangotreeinsurance@gmail.com
WEBSITE:         https://www.mangotreeinsurance.com/
ADDRESS:         324, Cloud-9 Towers, Vaishali, Ghaziabad - 201010
HOURS:           Mon-Sun: 9 AM-7 PM
GOOGLE_REVIEW:   https://g.page/r/CfZoMek3yZ3lEBM/review
INSTAGRAM:       https://www.instagram.com/mangotreeinsurance
FACEBOOK:        https://www.facebook.com/mangotreeinsurancee
YOUTUBE:         https://youtube.com/@mangotreeinsuranceinvestment?si=_3bppY8iTiJeYnHM
MAPS_URL:        MISSING — ask me. Do not fabricate a Maps link.
```

Services (approved, exactly these 8): Life Insurance · Health Insurance · Children Future · Accident Insurance · Retirement Insurance · Residential Insurance · Mutual Funds · Travel Insurance.

Assets (`/assets/source/`): MangoTree logo · Amit Jain portrait · Award photograph · MangoTree QR · Partner logos: HDFC ERGO, LIC, Niva Bupa, STAR Health.

Award photograph: it shows recognition for **Amit Kumar Jain**, referencing **Delhi-Karkardooma LNI II**, for exemplary performance and qualifying champion conclave. Transcribe only what is legible; do not state who issued it, the year, or any relationship to a partner brand unless it's clearly readable or I confirm.

## 5. CTA hierarchy (deliberately unequal)
1. **Primary — WhatsApp** (visually strongest element on the page)
2. **Secondary — Call**, **Add to Contacts**, **Share**
3. **Trust CTA — Review us on Google** (visually distinct from social links and from Share)
4. **Supporting — Visit Website**, **Get Directions** (only when Maps URL is approved)
5. **Follow** — Instagram, Facebook, YouTube (quiet, icon-led)

**Above the fold at 375×667 px** the visitor must see: logo, portrait, "Amit Jain — Founder & CEO", the tagline, and the WhatsApp, Call, Save, Share actions. No scroll required.

## 6. Design direction — "Canopy & Stem" (recommended default; challenge it if you have a better idea)

**Concept:** MangoTree = growth + protection + financial stability. Express it with *two restrained ideas*, not cartoon mangoes:

1. **The Canopy Arch.** An arch (tree canopy / protective shelter / Indian architectural window) is the recurring shape: the portrait sits in an arch; service tiles have arch-topped icon wells; the modal has arch-topped image framing. One shape, used with discipline.
2. **The Growth Stem.** A thin SVG line runs down the left edge of the page like a stem/branch. It *draws itself as you scroll* and sprouts a small leaf node at each section title. It doubles as a scroll-progress indicator. This is the signature "one distinctive idea".

**Supporting language:** editorial serif headings, fine ledger-style hairlines (financial-statement feel), warm paper background, layered "card-stock" depth via soft shadow and 1px borders. **No** glassmorphism, neumorphism, particle backgrounds, gradient-blob SaaS look, or default Tailwind aesthetics.

**Hero composition (mobile):** deep-green "canopy" field with a soft curved lower edge; logo top-left; portrait in a tall arch, slightly overlapping the field's edge; name + title; tagline set as editorial display type on two lines (*"Aam ke aam,"* / *"guthliyon ke daam."*) with the second clause in the mango accent; then the action cluster: one full-width WhatsApp button, and a row of three (Call · Save · Share).

**Colour (starting proposal — REPLACE with values sampled from the real logo):**

| Token | Starting value | Use |
|---|---|---|
| `--paper` | `#FBF7EF` | page background (warm ivory) |
| `--paper-2` | `#F3ECDD` | recessed areas |
| `--ink` | `#12231A` | primary text |
| `--ink-2` | `#445248` | secondary text |
| `--leaf-900` | `#0F3D2A` | hero field, dark surfaces |
| `--leaf-700` | `#1E6B45` | secondary brand, success |
| `--mango-500` | `#F29A1F` | accent, primary CTA fill (text on it = `--ink`) |
| `--sky-700` | `#1F4E8C` | links, focus ring |
| `--line` | `rgba(18,35,26,.12)` | hairlines |

Rules: mango ≤ ~10% of any screen; never use mango as small text on ivory (fails contrast); check every text/background pair for WCAG AA.

**Typography (max 2 families, self-hosted, subset):**
- Headings: a soft editorial serif — recommend **Fraunces** (variable; limit axes) or **Newsreader**.
- Body/UI: **Manrope** or **DM Sans**. (Avoid defaulting to Inter — it reads as generic.)
- Fluid scale with `clamp()`: hero name ≈ 2rem→3.25rem; H2 ≈ 1.5rem→2.25rem; body 1rem/1.6; captions 0.8125rem.
- Preload only the heading font used above the fold.

**Shape/spacing/elevation system (keep it tiny and consistent):**
- Spacing: 4-pt base → 4, 8, 12, 16, 24, 32, 48, 72.
- Radii: exactly three → `--r-sm 10px`, `--r-md 18px`, `--r-pill 999px` (+ the arch).
- Shadows: exactly three → `--sh-1` (rest), `--sh-2` (raised), `--sh-3` (modal).
- One icon style: 1.5px-stroke line icons, inline SVG sprite. Brand marks (WhatsApp, Instagram, Facebook, YouTube, X, Threads) from a licence-clean set (e.g. Simple Icons, CC0).

**Sections (re-evaluate; keep concise — this is a card, not a brochure):**
1. Hero + action cluster
2. About (2–3 lines max, approved facts only)
3. Services — **not** 8 identical white cards. Propose a bento layout with 2 larger tiles (Life, Health) and 6 smaller ones, grouped by intent (Protect / Plan / Grow). Tap a tile → short expandable detail (1–2 lines) + optional "Ask on WhatsApp" (needs my approval). Mobile: 2-column bento or scroll-snap rail; desktop: 4-column bento.
4. Partner ecosystem — small uniform-height logo rail on neutral cards, original colours, title worded factually (e.g. "Insurers we work with" only if verified; otherwise "Insurance brands").
5. Recognition — credential card + lightbox
6. Connect — QR (desktop/tablet prominent; on mobile collapsed inside an expandable "Scan / Share" area), plus Follow icons
7. Google review CTA (a distinct card, not a social icon)
8. Location & hours (+ Get Directions once Maps URL is approved)
9. Disclaimer (expandable) + minimal footer

**Mobile bottom action bar:** evaluate and recommend. My preference: a compact, safe-area-aware bar `WhatsApp | Call | Save | Share` that **appears only after the hero action cluster scrolls out of view** (IntersectionObserver), hides while any dialog/keyboard is open, never covers content (add matching bottom padding). If you find a better pattern, argue for it.

**Desktop:** an intentional composition, not a stretched phone: two-column hero (identity left, portrait arch right), max content width ~1120 px, bento services, QR panel visible, side-by-side credentials and location. Growth stem remains on the left gutter.

## 7. Motion design system (premium, restrained, purposeful)

**Tokens:** `--ease-out: cubic-bezier(.22,1,.36,1)` · `--ease-in-out: cubic-bezier(.65,0,.35,1)` · durations `120 / 220 / 400 / 700 ms`.

**Page-load choreography (total < 1.2 s, never blocks interaction, content readable with JS off):**

| t (ms) | Element | Effect |
|---|---|---|
| 0 | Hero field | already painted (no flash) |
| 80 | Logo | fade in |
| 160 | Portrait arch | `clip-path` reveal bottom→top, 700 ms, ease-out; subtle 1.04→1 scale on the image |
| 400 | Name + title | translateY 12px→0, fade, 400 ms |
| 520 | Tagline | two lines, staggered 90 ms |
| 700 | CTA buttons | stagger 60 ms, fade + 8px rise |

**Scroll:** sections fade/rise (16px, 400 ms) once, via IntersectionObserver (not on every scroll). Growth stem draws with scroll (CSS `animation-timeline: scroll()` where supported, JS rAF fallback); each leaf node pops in (scale .6→1, 220 ms) when its section title enters.

**Micro-interactions:** buttons — hover: 1px lift + shadow step; active: `scale(.98)` 120 ms; focus: 2px ring + 2px offset. Service tile — hover/tap: icon-well arch fills with a soft tint, arrow nudges 4px. Copy/Save success — icon morphs to a check, 200 ms.

**Dialogs:** mobile share sheet slides up (translateY 100%→0, 400 ms ease-out) with backdrop fade; desktop = centred modal, scale .96→1 + fade, 220 ms. Lightbox: image fades/scales in from its thumbnail. Toast: slides up 12px, auto-dismiss 2.8 s, `aria-live="polite"`.

**Forbidden:** parallax, floating/particle backgrounds, infinite loops, bouncy springs, shaking, animation on every scroll frame, insurance clichés (umbrellas/shields flying in).

**Performance guardrails:** animate `transform`/`opacity`/`clip-path` only; `will-change` only during an animation; ≤ 12 simultaneously animating elements; no animation library unless you prove native CSS/WAAPI can't do it (if proposed, justify size and benefit).

**Reduced motion:** under `prefers-reduced-motion: reduce` → no transforms/clip reveals/stem drawing; instant or ≤120 ms fades only.

## 8. Engineering plan requirements

**Stack:** compare (a) vanilla HTML/CSS/ES-modules with no build step vs (b) Vite (vanilla or React). My expectation is (a) — a single page with light interactivity doesn't need a framework. Recommend one and justify (bundle size, maintainability, GitHub Pages fit, animation needs).

**File structure (propose refinements):**

```text
index.html
404.html
CNAME                (only if custom domain)
.nojekyll
robots.txt
site.webmanifest     (optional)
css/  tokens.css  base.css  layout.css  components.css  sections.css  motion.css
js/   config.js  main.js  reveal.js  stem.js  dialogs.js  share.js  vcard.js  toast.js  a11y.js
assets/
  source/   (read-only originals)
  img/      (optimised: portrait, award-thumb, award-full, qr, logos)
  fonts/    (woff2 subsets)
  icons/    (sprite.svg, favicon set)
  amit-jain.vcf   (static fallback of the contact card)
docs/
```

**Config (`js/config.js`)** holds profile, links, services, partners, awards, share text, canonical URL. Components render *from* config. Share text is editable there.

**vCard (Add to Contacts):**
- Generate vCard **3.0** in the browser (widest compatibility), CRLF line endings, properly escaped `, ; \ \n`.
- Fields: `N`, `FN`, `ORG`, `TITLE`, `TEL` (international `+91…`), `EMAIL`, `URL`, `ADR` (street/locality/postal/country — leave region empty unless I approve a value), `NOTE`. Nothing unapproved. Photo embedding: propose only if it stays small (≤ 30 KB).
- Flow: build text → `Blob('text/vcard;charset=utf-8')` → `URL.createObjectURL` → hidden `<a download>` click → **delay** `revokeObjectURL` (~10 s; immediate revoke breaks some iOS versions).
- Also ship a **static** `assets/amit-jain.vcf`; show a small "Didn't open? Tap here" fallback link in the success state.
- Success feedback: toast **"Contact card ready"**, never `alert()`.
- Be honest in copy and docs: browsers can't silently write to the address book. On Android Chrome the file opens with Contacts; on iPhone Safari the user confirms via the "Add Contact" screen; on desktop it downloads. Document what to expect per platform and test it.

**Share system (visitor shares the *card URL* to *their own* network):**
- Canonical share URL from config (fall back to `location.origin + location.pathname`). Encode all parameters.
- Bottom sheet (mobile) / modal (desktop) built on `<dialog>` (native focus trap, ESC, inert background). Rows: WhatsApp · Facebook · X · Threads · Copy Link · More (native `navigator.share()` where supported; feature-detect, requires HTTPS + user gesture).
- **Verify each platform's current web-share endpoint at implementation time** and document the result. Candidate endpoints (confirm before using): WhatsApp `https://wa.me/?text=`, Facebook `https://www.facebook.com/sharer/sharer.php?u=`, X `https://x.com/intent/post?text=&url=`, Threads `https://www.threads.com/intent/post?text=`.
- **Instagram has no reliable web share URL.** Do not fake one. Offer honest behaviour: "Copy link — paste it in Instagram" (plus the native share sheet on mobile).
- Copy Link: Clipboard API with a `textarea`/`execCommand` fallback; toast **"Link copied"**.
- Default share message (editable in config): "Check out MangoTree Insurance & Investments for personalised insurance and investment guidance." + card URL. No exaggerated claims.

**Lightbox for the award:** `<dialog>`; thumbnail in a credential card; full image lazy-loaded on open; close button, ESC, backdrop click, focus return to trigger, body scroll locked; image container uses `touch-action: pinch-zoom` so phone users can inspect the certificate; alt text describes only what's visible.

**QR:** use the supplied file unmodified. Display ≥ 160 px (≥ 2× native for retina if possible), keep the quiet zone, no overlays/filters, no CSS blur/opacity. Verify it scans from a screen at every breakpoint, and that it points to the final card URL (report what it encodes).

**Images:** produce optimised copies: portrait (AVIF/WebP/JPEG, 480/720/1080 w), award thumb + full, logos (SVG if available, otherwise WebP/PNG at 2×), QR stays lossless PNG. Explicit `width/height`. Portrait preloaded; LCP < 2 s on mid-range mobile over 4G.

**SEO / social metadata:** `<title>`, meta description, canonical, Open Graph + Twitter card with an **absolute** `og:image` (1200×630, purpose-designed from approved assets), `theme-color`, favicon set (SVG + 180 px apple-touch + 192/512), JSON-LD (`Person` + `InsuranceAgency` with only approved data; `sameAs` = the three profile URLs). Recommend index vs noindex and justify.

**Security:** external-link `rel`, no inline event handlers, no third-party scripts (so a strict CSP `<meta>` is feasible), no secrets, no user data stored. Note GitHub Pages can't set custom headers.

**Accessibility:** `lang="en-IN"` on the page, one `<h1>`, logical heading order, skip link, landmarks, descriptive alt text, dialogs labelled, toast in a live region, 44×44 px targets, visible focus, AA contrast, full keyboard operation, reduced-motion support, sensible screen-reader labels ("Call Amit Jain", "Message on WhatsApp").

**Performance budget (mobile):** Lighthouse Performance ≥ 95 / Accessibility 100 / Best Practices 100 / SEO 100; LCP < 2.0 s; CLS < 0.05; JS ≤ ~15 KB gz; CSS ≤ ~25 KB gz; fonts ≤ 2 files (~60 KB total); page weight < 500 KB before lazy-loaded images.

## 9. Design self-critique (anti-"AI-look" filter)
Before finalising the plan, check every proposed screen against this list and fix violations:
- Is there a visible hierarchy, or do all buttons look equal?
- Are there ≤ 3 radii, ≤ 3 shadows, ≤ 2 font families, a single icon style?
- Is any card grid just N identical white boxes? (Not allowed.)
- Is every decorative element tied to the Canopy/Stem concept? If not, delete it.
- Is mango accent under ~10% of the screen? Any low-contrast text?
- Would this still look right with the tagline at 2 lines on a 320 px screen?
- Could a stranger tell within 3 seconds who this is and how to contact him?

## 10. Things you must NOT do
- Do not clone the Prudent page or reuse its graphics/wording.
- Do not add login/backend/CRM/newsletter/payments/scheduling.
- Do not invent numbers, ratings, awards, partners, licences, X/Threads/LinkedIn profiles for MangoTree.
- Do not create a Maps link; do not shorten or alter any URL above.
- Do not start coding.

## 11. Planning deliverables (output, then STOP)
Write these documents in `/docs/` (I've consolidated the original 12 into 6 to keep them useful):

1. `01-reference-analysis.md` — teardown of the reference + what to keep/improve; audit of the current MangoTree site
2. `02-content-and-assets.md` — approved content map, asset map (asset → purpose → treatment), **missing-information list**, open questions
3. `03-architecture.md` — page architecture, mobile + desktop ASCII wireframes (at 320/390/768/1280), user journeys (WhatsApp, call, save, share, review, scan QR, view award), component tree, file structure
4. `04-design-and-motion-system.md` — sampled palette, type, spacing, radii, shadows, buttons/cards, growth-stem spec, motion tokens + choreography, reduced-motion plan, 2 alternative concepts considered and why "Canopy & Stem" (or your improvement) wins
5. `05-share-vcard-spec.md` — VCF, Web Share, per-platform share matrix (verified endpoint, behaviour, fallback), clipboard, QR strategy, browser-behaviour table (Android Chrome / iOS Safari / desktop)
6. `06-deploy-and-qa.md` — GitHub Pages architecture (sub-path safe), SEO/OG plan, security notes, performance budget, QA checklist, acceptance criteria, phased development plan (Phases 1–7 below)

Then give me a **short summary in chat** (product vision, chosen stack + reason, the design concept, top 5 risks, the missing-info list) and **STOP. Wait for my approval.**
`````

---

# PART 4 — PHASE PROMPTS (paste one at a time, after approving the plan)

`````markdown
## PHASE 1 — Foundation + deploy the skeleton
Implement only: repo structure; `js/config.js` (all approved data); `tokens.css`/`base.css` from the approved design system; self-hosted fonts; SVG icon sprite; optimised image pipeline output in `assets/img/`; a minimal `index.html` that renders the hero text + logo using config values; `.nojekyll`, `robots.txt`, favicon. Then give me exact steps to publish to GitHub Pages (and the CNAME step for my subdomain). Verify all paths work from a sub-path (`/repo-name/`) by serving from a subfolder locally. Stop for review.
`````

`````markdown
## PHASE 2 — Hero + action cluster + bottom bar
Build the hero exactly per the approved wireframe: canopy field, arch portrait, name/title, tagline (`lang="hi-Latn"`), WhatsApp primary + Call/Save/Share. Wire WhatsApp/Call now. Implement the conditional mobile action bar (appears after hero CTAs leave the viewport; safe-area aware; hides with dialogs; content padding so nothing is covered). Static states only — no entrance animation yet. Verify the 375×667 above-the-fold requirement and 320 px. Stop for review.
`````

`````markdown
## PHASE 3 — Functional core: Save, Share, Dialogs, Toast
Implement `vcard.js`, `share.js`, `dialogs.js`, `toast.js` per `05-share-vcard-spec.md`: vCard generation + static fallback; share sheet/modal on `<dialog>`; verified platform endpoints; Copy Link; native share; toast system. Provide a test table: each action × Android Chrome / iOS Safari / desktop Chrome/Edge/Firefox, marking which you verified and which I must test on a real device. Confirm no MangoTree profile URL appears in any share code. Stop for review.
`````

`````markdown
## PHASE 4 — Content sections
Build About, Services (bento + expandable details), Partner rail, Recognition card + lightbox, Connect (QR + Follow), Google Review CTA, Location & Hours, Disclaimer (expandable), Footer. Use only approved content and mappings; mark any missing item as `TODO(approval)` in the UI-safe way (hidden, not visible placeholder text). Verify layouts at all seven widths. Stop for review.
`````

`````markdown
## PHASE 5 — Motion pass
Implement the approved motion system: load choreography, scroll reveals, growth stem (scroll-driven CSS with JS fallback), leaf nodes, button/tile micro-interactions, dialog/toast transitions. Add full `prefers-reduced-motion` handling. Profile with DevTools Performance: no long tasks, no layout thrash, 60 fps on throttled CPU (4×). Report measurements. Stop for review.
`````

`````markdown
## PHASE 6 — SEO, social preview, accessibility, performance
Implement meta/OG/Twitter/JSON-LD (absolute URLs from the canonical config), create the 1200×630 OG image from approved assets, favicon set, theme-color. Run Lighthouse (mobile) and an accessibility audit (keyboard-only walkthrough, focus order, contrast, screen-reader labels, dialog behaviour). Fix everything below the budget. Provide the results table. Stop for review.
`````

`````markdown
## PHASE 7 — QA, launch, handover
Run the full QA checklist (Appendix E). Verify QR scans and points to the final URL (if not, tell me exactly what QR to regenerate). Write `README.md` with: owner edit guide (how to change phone/text/hours in `config.js` via github.com), how to update images, deploy/rollback steps, custom-domain/DNS steps, cache-busting tip, NFC-tag tip. Tag `v1.0`. Provide a launch checklist and a short list of recommended future improvements (none implemented).
`````

---

# PART 5 — APPENDIX (patterns the agent should follow)

## A. Design tokens starter (`css/tokens.css`)

```css
@layer tokens, base, layout, components, sections, motion;

@layer tokens {
  :root {
    color-scheme: light;

    /* Color — REPLACE with values sampled from the real logo */
    --paper: #FBF7EF;  --paper-2: #F3ECDD;
    --ink: #12231A;    --ink-2: #445248;
    --leaf-900: #0F3D2A; --leaf-700: #1E6B45;
    --mango-500: #F29A1F; --sky-700: #1F4E8C;
    --line: rgb(18 35 26 / .12);
    --focus: var(--sky-700);

    /* Type */
    --font-display: "Fraunces", Georgia, "Times New Roman", serif;
    --font-ui: "Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --fs-hero: clamp(2rem, 1.2rem + 3.6vw, 3.25rem);
    --fs-h2:   clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem);
    --fs-body: 1rem;
    --fs-small: .8125rem;

    /* Space (4-pt) */
    --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px;
    --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 72px;

    /* Shape + elevation */
    --r-sm: 10px; --r-md: 18px; --r-pill: 999px;
    --sh-1: 0 1px 2px rgb(18 35 26 / .06), 0 2px 8px rgb(18 35 26 / .05);
    --sh-2: 0 4px 14px rgb(18 35 26 / .10);
    --sh-3: 0 18px 48px rgb(18 35 26 / .22);

    /* Motion */
    --ease-out: cubic-bezier(.22, 1, .36, 1);
    --ease-in-out: cubic-bezier(.65, 0, .35, 1);
    --dur-1: 120ms; --dur-2: 220ms; --dur-3: 400ms; --dur-4: 700ms;
  }
}

@layer base {
  html { -webkit-text-size-adjust: 100%; scroll-padding-top: 1rem; }
  body { margin: 0; background: var(--paper); color: var(--ink);
         font: 400 var(--fs-body)/1.6 var(--font-ui);
         -webkit-tap-highlight-color: transparent; }
  a, button { touch-action: manipulation; }
  :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
  .hero { min-height: 100svh; }
  img { max-width: 100%; height: auto; }
  body:has(dialog[open]) { overflow: hidden; }
}
```

Viewport tag (needed for safe-area insets): `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`

## B. Central config skeleton (`js/config.js`)

```js
export const CONFIG = Object.freeze({
  canonicalUrl: "",   // set to the final card URL, e.g. "https://card.mangotreeinsurance.com/"
  profile: {
    name: "Amit Jain",
    title: "Founder & CEO",
    company: "MangoTree Insurance & Investments",
    tagline: "Aam ke aam, guthliyon ke daam.",
    phoneDisplay: "9911502502",
    phoneE164: "+919911502502",
    whatsapp: "https://wa.me/919911502502",
    email: "mailto:mangotreeinsurance@gmail.com",
    emailAddress: "mangotreeinsurance@gmail.com",
    website: "https://www.mangotreeinsurance.com/",
    address: { street: "324, Cloud-9 Towers, Vaishali", locality: "Ghaziabad", region: "", postal: "201010", country: "India" },
    hours: "Mon-Sun: 9 AM-7 PM",
    mapsUrl: null,                       // TODO(approval): exact Google Maps link
    googleReview: "https://g.page/r/CfZoMek3yZ3lEBM/review",
  },
  socials: [   // MangoTree's OWN profiles — Follow/Connect only, never used for sharing
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/mangotreeinsurance" },
    { id: "facebook",  label: "Facebook",  url: "https://www.facebook.com/mangotreeinsurancee" },
    { id: "youtube",   label: "YouTube",   url: "https://youtube.com/@mangotreeinsuranceinvestment?si=_3bppY8iTiJeYnHM" },
  ],
  share: {       // the visitor shares THIS PAGE, not MangoTree's profiles
    title: "MangoTree Insurance & Investments — Amit Jain",
    text: "Check out MangoTree Insurance & Investments for personalised insurance and investment guidance.",
  },
  services: [ /* {id, label, group: "protect|plan|grow", blurb, partners: [ids]} — approved mappings only */ ],
  partners: [ /* {id, name, logo, alt} */ ],
  awards:   [ /* {id, thumb, full, caption (only legible/approved text), alt} */ ],
});

export const getShareUrl = () =>
  CONFIG.canonicalUrl || (location.origin + location.pathname);
```

## C. vCard + save (`js/vcard.js`)

```js
const esc = (s = "") => String(s)
  .replace(/\\/g, "\\\\").replace(/\n/g, "\\n")
  .replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildVCard({ profile }) {
  const a = profile.address;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Jain;Amit;;;`,                                   // confirm display name with owner
    `FN:${esc(profile.name)}`,
    `ORG:${esc(profile.company)}`,
    `TITLE:${esc(profile.title)}`,
    `TEL;TYPE=CELL,VOICE:${profile.phoneE164}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.emailAddress}`,
    `URL:${profile.website}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.locality)};${esc(a.region)};${esc(a.postal)};${esc(a.country)}`,
    `NOTE:${esc(profile.company)} — ${esc(profile.hours)}`,   // only approved data
    "END:VCARD",
  ];
  return lines.join("\r\n") + "\r\n";
}

export function downloadVCard(text, filename = "Amit-Jain-MangoTree.vcf") {
  const blob = new Blob([text], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);   // delayed: immediate revoke breaks some iOS versions
}
```

## D. Share targets + native share + copy (`js/share.js`)

```js
import { CONFIG, getShareUrl } from "./config.js";

// VERIFY each endpoint is still current before shipping (they change).
export function shareTargets() {
  const url = getShareUrl();
  const { text } = CONFIG.share;
  const both = encodeURIComponent(`${text} ${url}`);
  const u = encodeURIComponent(url), t = encodeURIComponent(text);
  return {
    whatsapp: `https://wa.me/?text=${both}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    x:        `https://x.com/intent/post?text=${t}&url=${u}`,
    threads:  `https://www.threads.com/intent/post?text=${both}`,
    // Instagram: no reliable web share URL → handled as "Copy link" with honest copy.
  };
}

export async function nativeShare() {
  if (!navigator.share) return false;
  try { await navigator.share({ title: CONFIG.share.title, text: CONFIG.share.text, url: getShareUrl() }); return true; }
  catch (e) { return e?.name === "AbortError"; }   // user cancelled = not an error
}

export async function copyLink() {
  const url = getShareUrl();
  try { await navigator.clipboard.writeText(url); return true; }
  catch {
    const ta = Object.assign(document.createElement("textarea"), { value: url });
    ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  }
}
```

## E. Dialog / bottom-sheet pattern (native `<dialog>`)

```html
<dialog id="share" class="sheet" aria-labelledby="share-title">
  <div class="sheet__panel">
    <h2 id="share-title">Share MangoTree</h2>
    <p>Share this digital profile with your network</p>
    <!-- share rows -->
    <button type="button" data-close aria-label="Close share dialog">Close</button>
  </div>
</dialog>
```

```css
.sheet { border: 0; padding: 0; background: transparent; max-width: none; max-height: none;
         width: 100%; margin: auto 0 0; }                       /* mobile: bottom sheet */
.sheet::backdrop { background: rgb(15 61 42 / .55); opacity: 0; transition: opacity var(--dur-2) var(--ease-out); }
.sheet__panel { background: var(--paper); border-radius: var(--r-md) var(--r-md) 0 0;
                padding: var(--s-5) var(--s-5) calc(var(--s-5) + env(safe-area-inset-bottom)); box-shadow: var(--sh-3);
                transform: translateY(100%); transition: transform var(--dur-3) var(--ease-out); }
.sheet[open] .sheet__panel { transform: none; }
.sheet[open]::backdrop { opacity: 1; }
@starting-style { .sheet[open] .sheet__panel { transform: translateY(100%); } .sheet[open]::backdrop { opacity: 0; } }

@media (min-width: 768px) {                                     /* desktop: centred modal */
  .sheet { width: min(480px, 92vw); margin: auto; }
  .sheet__panel { border-radius: var(--r-md); transform: scale(.96); opacity: 0; transition: transform var(--dur-2) var(--ease-out), opacity var(--dur-2); }
  .sheet[open] .sheet__panel { transform: none; opacity: 1; }
  @starting-style { .sheet[open] .sheet__panel { transform: scale(.96); opacity: 0; } }
}
```

```js
// Backdrop click + focus return (ESC and focus trap are native to <dialog>.showModal()).
export function wireDialog(dialog, opener) {
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => opener?.focus());
  dialog.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => dialog.close()));
}
```

> Note for the agent: `@starting-style` and native dialog transitions are progressive enhancement. Verify support and make sure the dialog still opens/closes correctly (just without animation) where unsupported. For exit animations, use a `closing` class + `transitionend`, or accept an instant close.

## F. Scroll reveal that never hides content without JS

```html
<script>document.documentElement.classList.add("js")</script>  <!-- inline, in <head> -->
```

```css
@layer motion {
  .js [data-reveal] { opacity: 0; transform: translateY(16px);
                      transition: opacity var(--dur-3) var(--ease-out), transform var(--dur-3) var(--ease-out); }
  .js [data-reveal].is-in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    .js [data-reveal] { transform: none; transition: opacity var(--dur-1) linear; }
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
  }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
```

## G. Growth stem (signature element)

```html
<svg class="stem" aria-hidden="true" viewBox="0 0 24 1000" preserveAspectRatio="none">
  <path d="M12 0 C 4 200, 20 400, 12 600 S 4 900, 12 1000" pathLength="1" />
</svg>
```

```css
.stem { position: fixed; inset: 0 auto 0 8px; width: 24px; height: 100svh; pointer-events: none; }
.stem path { fill: none; stroke: var(--leaf-700); stroke-width: 1.5; stroke-dasharray: 1; stroke-dashoffset: 1; }

@supports (animation-timeline: scroll()) {
  .stem path { animation: grow linear both; animation-timeline: scroll(root); }
  @keyframes grow { to { stroke-dashoffset: 0; } }
}
@media (prefers-reduced-motion: reduce) { .stem path { animation: none; stroke-dashoffset: 0; opacity: .35; } }
@media (max-width: 480px) { .stem { opacity: .5; left: 2px; } }   /* keep it whisper-quiet on phones */
```

JS fallback (only when `!CSS.supports("animation-timeline: scroll()")`): on scroll, in `requestAnimationFrame`, set `path.style.strokeDashoffset = 1 - scrollY / (scrollHeight - innerHeight)`.

## H. Deployment commands (GitHub Pages)

```bash
git init && git add . && git commit -m "v0.1 foundation"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
# GitHub → Settings → Pages → Build and deployment → Deploy from a branch → main / (root)
# Live at https://<user>.github.io/<repo>/  (allow ~1–2 minutes)

# Custom subdomain:
# 1) DNS: CNAME  card  →  <user>.github.io
# 2) Add file `CNAME` with one line: card.mangotreeinsurance.com
# 3) Settings → Pages → Custom domain → save → tick "Enforce HTTPS"

# Local test that mimics a sub-path deployment:
mkdir -p /tmp/site/mangotree-card && cp -r . /tmp/site/mangotree-card && npx serve /tmp/site
# open http://localhost:3000/mangotree-card/   (ES modules do NOT work from file:// — always use a server)
```

## I. QA matrix

| Area | Checks |
|---|---|
| **Functional** | WhatsApp opens chat · Call dials +91 number · Email opens composer · Website opens new tab · Google Review lands on the review dialog · Instagram/Facebook/YouTube open the right profiles · Add to Contacts (Android / iPhone / desktop) · Share sheet (each row) · Copy Link + toast · Native "More" · Lightbox (close/ESC/backdrop/focus return/scroll lock) · QR scans and resolves to the final URL |
| **Share integrity** | Grep the code: none of the 3 MangoTree profile URLs appears in `share.js` or the share UI |
| **Responsive** | 320, 375, 390, 430, 768, 1024, 1280, 1600+ · no horizontal scroll · CTAs above fold at 375×667 · bottom bar never covers content · landscape phone |
| **Browsers** | Chrome Android · Safari iOS (real device) · Chrome/Edge/Firefox desktop · Safari desktop |
| **Accessibility** | Keyboard-only run · focus order/visibility · screen reader (VoiceOver/TalkBack) labels · contrast AA · dialogs trap/return focus · reduced-motion on · 200% zoom |
| **Performance** | Lighthouse mobile ≥ 95/100/100/100 · LCP < 2 s · CLS < .05 · budgets from §8 · throttled CPU 4× stays smooth |
| **SEO/Social** | Send link to yourself on WhatsApp → correct title/image/description · OG image absolute URL · canonical correct · JSON-LD valid |
| **Deploy** | Works at sub-path and custom domain · favicon/fonts/images load · hard-refresh works · `404.html` sensible · HTTPS enforced |
| **Content integrity** | Every claim traceable to approved content · no invented numbers/awards/partners · disclaimer present and readable |

## J. Missing-information list (fill before Phase 4)

- [ ] Exact Google Maps link for "Get Directions"
- [ ] Final card URL / custom domain (and re-generate QR if needed)
- [ ] Display name: "Amit Jain" vs "Amit Kumar Jain" (card + contact file)
- [ ] Approved About text (2–3 lines) and any verifiable experience/credential facts
- [ ] Approved service ↔ partner mappings (which insurer for which service)
- [ ] Regulatory identifiers to display (if applicable) and approved disclaimer wording
- [ ] Approval for per-service WhatsApp prefill (optional)
- [ ] Vector (SVG) versions of logos if available
- [ ] Preferred phone display format (e.g. `99115 02502`) — default is exactly `9911502502`
- [ ] State/region for the contact-card address (left empty unless approved)
- [ ] Index vs noindex preference for search engines

---

*End of playbook. Recommended order: Part 1 checklist → save Part 2 → paste Part 3 (Planning mode) → review docs → approve → Phase 1 → … → Phase 7.*
