# Design and Motion System

## 1. Concept: "Canopy & Stem"
**Why it wins:** It avoids generic templates by employing a restrained, thematic metaphor. The **Canopy Arch** provides a consistent, protective shape for imagery and cards. The **Growth Stem** acts as a scroll-progress indicator, reinforcing the "Tree" brand identity without resorting to literal tree illustrations.

### Alternative Concepts Considered (and rejected):
1. **Glass Fintech:** (Glassmorphism, dark blur, neon borders). *Rejected because:* Feels too cold, impersonal, and disconnected from the warm, human element of MangoTree and Amit Jain. Heavy on GPU/Performance.
2. **Minimalist Monolith:** (Harsh black/white, brutalist typography, sharp edges). *Rejected because:* Lacks trust signals and approachability necessary for insurance and family protection services.

## 2. Design Tokens

### Colours (Pending Exact Logo Sampling)
| Token | Value | Usage |
|---|---|---|
| `--paper` | `#FBF7EF` | Page background (warm ivory) |
| `--paper-2` | `#F3ECDD` | Recessed areas (partner cards, etc) |
| `--ink` | `#12231A` | Primary text (very dark green/black) |
| `--ink-2` | `#445248` | Secondary text |
| `--leaf-900` | `#0F3D2A` | Hero canopy field, dark surfaces |
| `--leaf-700` | `#1E6B45` | Secondary brand / Success states |
| `--mango-500`| `#F29A1F` | Accent / Primary CTA fill (Text on it: `--ink`) |
| `--sky-700` | `#1F4E8C` | Links, focus rings |
| `--line` | `rgba(18,35,26,.12)`| Hairline borders |

### Typography
- **Headings:** Fraunces (Variable, subset) or Newsreader. Soft editorial serif for trust.
- **Body/UI:** Manrope or DM Sans. Highly legible at small sizes.
- **Fluid Scale (`clamp()`):**
  - Name: `clamp(2rem, 5vw, 3.25rem)`
  - H2: `clamp(1.5rem, 4vw, 2.25rem)`
  - Body: `1rem` / 1.6 line-height
  - Captions: `0.8125rem`

### Shapes & Spacing
- **Spacing Scale (4pt):** 4, 8, 12, 16, 24, 32, 48, 72px.
- **Radii:** `--r-sm: 10px`, `--r-md: 18px`, `--r-pill: 999px`, plus the signature Canopy Arch.
- **Shadows:**
  - `--sh-1`: Soft ambient (cards)
  - `--sh-2`: Raised (buttons)
  - `--sh-3`: Modal depth

## 3. Motion Choreography
*Tokens: `--ease-out: cubic-bezier(.22,1,.36,1)`, `--ease-in-out: cubic-bezier(.65,0,.35,1)`*

### Page Load Sequence (< 1.2s total)
1. **0ms:** Hero field pre-painted.
2. **80ms:** Logo fades in.
3. **160ms:** Portrait arch `clip-path` reveal (bottom to top, 700ms, ease-out), subtle scale (1.04 to 1).
4. **400ms:** Name + Title translateY (12px to 0) and fade in (400ms).
5. **520ms:** Tagline lines stagger in (90ms apart).
6. **700ms:** CTA buttons stagger in (60ms apart, 8px rise).

### Scroll & Interaction
- **Stem Drawing:** CSS `animation-timeline: scroll()` with JS `requestAnimationFrame` fallback. Leaf nodes pop in (`scale 0.6 -> 1`, 220ms) as section enters.
- **Sections:** Fade and rise (16px, 400ms) once via `IntersectionObserver`.
- **Buttons:** Hover: 1px lift, shadow step. Active: `scale(0.98)` 120ms. Focus: 2px ring + offset.

### Reduced Motion (`prefers-reduced-motion: reduce`)
- All `transform` and `clip-path` animations disabled.
- Stem drawing disabled (fully visible on load).
- All transitions switch to instant or fast fade (<= 120ms).
