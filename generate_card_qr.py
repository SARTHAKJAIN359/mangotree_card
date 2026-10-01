#!/usr/bin/env python3
"""
QR Code Generator for MangoTree Digital Business Card
Generates a dedicated high-resolution QR code pointing to the final digital business card URL.
"""

import sys
import subprocess

try:
    import qrcode
    from PIL import Image
except ImportError:
    print("Installing qrcode and pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "qrcode[pil]"])
    import qrcode
    from PIL import Image

def generate_qr(target_url="https://sarthakjain359.github.io/mangotree_card/", output_path="assets/img/qr-card-final.png"):
    print(f"Generating QR code for: {target_url}")
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=16,
        border=4,
    )
    qr.add_data(target_url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#0F3D2A", back_color="#FFFFFF")
    img.save(output_path)
    print(f"Saved dedicated digital card QR code to: {output_path}")

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://sarthakjain359.github.io/mangotree_card/"
    out = sys.argv[2] if len(sys.argv) > 2 else "assets/img/qr-card-final.png"
    generate_qr(url, out)
