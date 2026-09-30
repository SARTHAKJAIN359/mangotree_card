# Share and vCard Specifications

## 1. vCard (Add to Contacts) Strategy
**Goal:** Widest compatibility across Android and iOS without a server backend.

### Technical Spec (vCard 3.0)
```text
BEGIN:VCARD
VERSION:3.0
N:Jain;Amit;;;
FN:Amit Jain
ORG:MangoTree Insurance & Investments
TITLE:Founder & CEO
TEL;TYPE=WORK,VOICE:+919911502502
EMAIL;TYPE=WORK:mangotreeinsurance@gmail.com
URL:https://www.mangotreeinsurance.com/
ADR;TYPE=WORK:;;324\, Cloud-9 Towers\, Vaishali;Ghaziabad;;201010;India
NOTE:Aam ke aam, guthliyon ke daam.
END:VCARD
```
*(CRLF line endings, escaped commas and semicolons).*

### Client-Side Generation Flow
1. Construct vCard string from `config.js` data.
2. Create `Blob('text/vcard;charset=utf-8')`.
3. Create Object URL (`URL.createObjectURL`).
4. Trigger hidden `<a download="Amit_Jain.vcf">` click.
5. Delay `revokeObjectURL` (~10 seconds) to ensure iOS Safari completes the process.
6. Display ARIA live toast: "Contact card ready".

### Fallback
Provide a pre-generated static `assets/amit-jain.vcf`. If dynamic generation fails, present a "Didn't open? Tap here" link.

### Platform Behaviour
- **Android Chrome:** Downloads and prompts to open with Contacts app.
- **iOS Safari:** Downloads and displays native "Add Contact" preview screen.
- **Desktop:** Downloads file.

## 2. Share System
**Goal:** Allow visitor to share the *card URL* to their own network.

### Native Web Share (`navigator.share`)
- Checks `navigator.share && navigator.canShare()`.
- Only fires on user gesture over HTTPS.
- Fallback: Custom Share Sheet (`<dialog>`).

### Share Matrix & Endpoints

| Platform | Endpoint Pattern | Behaviour | Notes |
| :--- | :--- | :--- | :--- |
| **WhatsApp** | `https://wa.me/?text=[encoded_text]` | Opens chat picker | Reliable |
| **Facebook** | `https://www.facebook.com/sharer/sharer.php?u=[url]` | Opens FB share | Drops text, relies on OG tags |
| **X (Twitter)** | `https://x.com/intent/post?text=[text]&url=[url]` | Drafts tweet | Reliable |
| **Threads** | `https://www.threads.com/intent/post?text=[text]` | Drafts post | Text + URL combined |
| **Instagram** | *None* | Fallback to "Copy Link" | IG explicitly blocks web sharing |
| **Copy Link** | `navigator.clipboard.writeText` | Copies URL | Fallback: `execCommand` |

## 3. QR Code Strategy
- **Display:** Unmodified `assets/source/qr-mangotree.png`.
- **Sizing:** rendered at `>=160px`, `image-rendering: pixelated` if needed.
- **Mobile UX:** Collapsed inside an expandable "Scan to share" panel (so it doesn't waste vertical space).
- **Desktop UX:** Prominently displayed alongside Connect section.
