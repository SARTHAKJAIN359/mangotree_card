# Content and Asset Map

## 1. Approved Content Map (Single Source of Truth)
This data will live strictly in `js/config.js`.

- **Name:** Amit Jain *(Note: Certificate says "Amit Kumar Jain" - see Open Questions)*
- **Title:** Founder & CEO
- **Company:** MangoTree Insurance & Investments
- **Tagline:** Aam ke aam, guthliyon ke daam. *(Markup: `lang="hi-Latn"`)*
- **Phone:** 9911502502 -> `tel:+919911502502`
- **WhatsApp:** `https://wa.me/919911502502`
- **Email:** `mailto:mangotreeinsurance@gmail.com`
- **Website:** `https://www.mangotreeinsurance.com/`
- **Address:** 324, Cloud-9 Towers, Vaishali, Ghaziabad - 201010
- **Hours:** Mon-Sun: 9 AM-7 PM
- **Google Review:** `https://g.page/r/CfZoMek3yZ3lEBM/review`
- **Instagram:** `https://www.instagram.com/mangotreeinsurance`
- **Facebook:** `https://www.facebook.com/mangotreeinsurancee`
- **YouTube:** `https://youtube.com/@mangotreeinsuranceinvestment?si=_3bppY8iTiJeYnHM`
- **Maps URL:** [PENDING APPROVAL]

**Approved Services (8):**
Life Insurance · Health Insurance · Children Future · Accident Insurance · Retirement Insurance · Residential Insurance · Mutual Funds · Travel Insurance.

## 2. Asset Map

| Original File | Purpose | Treatment & Optimisation |
| :--- | :--- | :--- |
| `logo-mangotree.png` | Hero logo, OG image base | `assets/img/logo.webp` (lossless or SVG if vector is provided) |
| `portrait-amit-jain.png` | Hero image | `assets/img/portrait.webp` (480/720/1080w), fetchpriority="high" |
| `award-recognition.png` | Recognition section | `assets/img/award-thumb.webp` & `award-full.webp` |
| `qr-mangotree.png` | Scan & Share section | `assets/img/qr-mangotree.png` (lossless, unmodified) |
| `partner-*.jpeg` | Insurer ecosystem rail | `assets/img/partner-*.webp` (2x for retina) |

## 3. Missing Information & Open Questions
1. **Google Maps URL:** Required for the "Get Directions" CTA.
2. **Name Clarification:** The config says "Amit Jain", but the award certificate says "Amit Kumar Jain". Should we stick to "Amit Jain" for the main display and vCard?
3. **Reference Screenshots:** The `/reference/` folder was missing from the workspace, and the Prudent URL was inaccessible (403). Analysis was done based on standard industry patterns.
4. **Brand Colours (Exact Hex):** Since Python/Node were unavailable in the environment to sample the logo, please provide the exact HEX codes for the Mango (orange) and Leaf (green) from the logo, or approve the starting proposal in `04-design-and-motion-system.md`.
5. **Disclaimer Text:** Please confirm if the proposed compact disclaimer in `01-reference-analysis.md` is approved, or provide the exact text from the main site.
