# Architecture and Wireframes

## 1. Page Architecture & ASCII Wireframes

### Mobile (320px - 430px)
```text
+--------------------------------+
| [Logo]                         |
|                                |
|        [Portrait Arch]         |
|        (overlaps green)        |
|                                |
| Amit Jain                      |
| Founder & CEO                  |
|                                |
| "Aam ke aam,                   |
|  guthliyon ke daam."           |
|                                |
| [      WhatsApp (Primary)    ] |
| [ Call ] [ Save ] [ Share ]    |
+--------------------------------+
| ABOUT                          |
| 2-3 lines of approved facts.   |
+--------------------------------+
| SERVICES (Bento 2-col)         |
| [ Life  ] [ Health ] (Large)   |
| [ Child ] [ Accid. ] (Small)   |
| [ Retire] [ Resid. ] (Small)   |
| [ Mutual] [ Travel ] (Small)   |
+--------------------------------+
| INSURERS WE WORK WITH          |
| [HDFC] [LIC] [Bupa] [Star]     |
| (Horizontal Scroll Rail)       |
+--------------------------------+
| RECOGNITION                    |
| [ Award Thumbnail ]            |
| Tap to view in lightbox        |
+--------------------------------+
| CONNECT & SHARE                |
| [ Expandable Scan/QR ]         |
| [Insta] [FB] [YouTube]         |
+--------------------------------+
| [ Review us on Google ]        |
+--------------------------------+
| LOCATION & HOURS               |
| Address & Timings              |
| [ Get Directions ]             |
+--------------------------------+
| [Expandable Disclaimer]        |
| Footer                         |
+--------------------------------+
* Sticky Bottom Bar (Appears when Hero CTA scrolls out)
  [ WhatsApp | Call | Save | Share ]
```

### Desktop (1280px+)
```text
+-------------------------------------------------------------+
| Stem                                                        |
|  |  [Logo]                       [Portrait Arch]            |
|  |  Amit Jain                    (Right Aligned)            |
|  |  Founder & CEO                                           |
|  |                                                          |
|  |  "Aam ke aam,                                            |
|  |   guthliyon ke daam."                                    |
|  |                                                          |
|  |  [ WhatsApp (Primary) ]                                  |
|  |  [ Call ] [ Save ] [ Share ]                             |
|  |                                                          |
|  O  ABOUT                                                   |
|  |  2-3 lines...                                            |
|  |                                                          |
|  O  SERVICES (Bento 4-col)                                  |
|  |  [ Life (Large) ] [ Health (Large)]                      |
|  |  [Child] [Accid.] [Retire] [Resid.]                      |
|  |  [Mutual] [Travel]                                       |
|  |                                                          |
|  O  INSURERS WE WORK WITH (Rail)                            |
|  |  [HDFC] [LIC] [Bupa] [Star]                              |
|  |                                                          |
|  O  RECOGNITION               CONNECT (QR visible)          |
|  |  [ Award Thumb ]           [ QR Code ]                   |
|  |                            [Insta] [FB] [YT]             |
|  |                                                          |
|  O  LOCATION & HOURS                                        |
|  |  Address...                                              |
|  |  [ Get Directions ]        [ Google Review ]             |
|  |                                                          |
|  +  Footer & Disclaimer                                     |
+-------------------------------------------------------------+
```

## 2. User Journeys
- **WhatsApp:** Tap -> Opens `wa.me` link with prepopulated message (if configured).
- **Call:** Tap -> Triggers native OS phone dialer (`tel:`).
- **Save Contact:** Tap -> Generates vCard in-browser, triggers download/contact-save. Displays success toast.
- **Share:** Tap -> Opens native Web Share sheet (mobile) or custom dialog (desktop).
- **Review:** Tap -> Opens Google Maps review link in new tab.
- **Scan QR (Mobile):** Tap expandable area -> Unfurls QR code for another device to scan.
- **View Award:** Tap credential card -> Opens `<dialog>` lightbox, locks body scroll.

## 3. Component Tree
- `App` (Main Container)
  - `HeroSection` (Logo, Portrait, Text)
  - `ActionCluster` (Primary + Secondary CTAs)
  - `AboutSection`
  - `ServicesBento` (ServiceTiles)
  - `PartnersRail`
  - `RecognitionCard` (Triggers `LightboxDialog`)
  - `ConnectSection` (SocialIcons, QRPanel)
  - `LocationCard`
  - `StickyBottomBar` (IntersectionObserver driven)
  - `ShareDialog` / `Toast`

## 4. Proposed File Structure
```text
index.html
404.html
css/
  tokens.css       # Variables, fonts
  base.css         # Resets, typography, globals
  layout.css       # Grid, stem, sections
  components.css   # Buttons, cards, bento
  motion.css       # Animations, reduced-motion
js/
  config.js        # Data payload
  main.js          # Initialization
  reveal.js        # Scroll observer, stem drawing
  dialogs.js       # Lightbox & share modal
  share.js         # Web share + fallback
  vcard.js         # vCard generation
  toast.js         # Notifications
assets/
  source/          # Read-only
  img/             # Optimized webp/avif
  fonts/           # WOFF2
  icons/           # sprite.svg
  amit-jain.vcf    # Fallback static vCard
docs/              # Planning documents
```
