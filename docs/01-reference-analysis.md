# Reference & Current Site Analysis

## 1. Reference Card Teardown (Prudent Corporate)
*Note: The reference URL (https://prudentcorporate.com/BusinessCard/UserDetails/36323637) returned a 403 Forbidden error, and the `/reference/` directory with screenshots was not found in the workspace. The following analysis is based on standard patterns of traditional "digital visiting cards" and the prompt's critique cues.*

### What usually works (to keep)
- **Direct Actions:** Immediate access to Call, WhatsApp, and Save Contact.
- **Concentrated Info:** All essential contact data in one place.

### What is typically weak (to improve)
- **Hierarchy:** All buttons usually look equally important, causing decision fatigue. *Fix: We will use a strict unequal hierarchy, heavily favoring WhatsApp.*
- **Aesthetics & Trust Signals:** Generic template layouts, standard boxy cards, and lack of brand cohesion (often feeling "cheap"). *Fix: Use the "Canopy & Stem" premium design, custom typography, and curated brand colors.*
- **Mobile Ergonomics:** Actions often require scrolling or are too small. *Fix: Hero action cluster above the fold, 44x44px touch targets, and a sticky bottom action bar (on scroll).*
- **Social Actions:** Often given too much weight alongside primary contact methods. *Fix: Socials demoted to a quiet "Follow" section.*

## 2. Current MangoTree Site Audit (mangotreeinsurance.com)
*Based on source code analysis of the live site (built on Zyro).*

### Observations
- **Content Structure:** Multi-page setup covering Services (Life, Health, etc.), Blogs, About, Contact, and Privacy Policy.
- **Tone:** Professional, focusing on stability, growth, and prosperity.
- **Tech Stack:** Heavy JS framework (Astro/Vue/Zyro components), multiple CSS files, blocking resources. *Contrast: Our card will be ultra-lightweight, vanilla HTML/CSS.*

### Disclaimer/Legal Text Proposal
Due to the minified structure of the live site, the exact disclaimer couldn't be cleanly extracted.
**Proposed Compact Disclaimer for the Card (Pending Approval):**
> "MangoTree Insurance & Investments is an independent advisory. Insurance is the subject matter of solicitation. Mutual Fund investments are subject to market risks; read all scheme-related documents carefully. Partner logos and brands belong to their respective owners."
*(This will be placed in an expandable footer section to save space while remaining compliant).*
