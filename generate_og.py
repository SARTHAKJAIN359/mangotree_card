import os
import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    install('Pillow')
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    # Dimensions
    W, H = 1200, 630
    
    # Create dark green background
    bg_color = (15, 61, 42) # #0F3D2A
    img = Image.new('RGB', (W, H), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to load portrait
    try:
        portrait = Image.open('assets/img/portrait-amit-jain.png').convert("RGBA")
        # Resize portrait to fit height
        p_ratio = portrait.width / portrait.height
        p_height = 500
        p_width = int(p_height * p_ratio)
        portrait = portrait.resize((p_width, p_height), Image.Resampling.LANCZOS)
        img.paste(portrait, (W - p_width - 60, H - p_height), portrait)
    except Exception as e:
        print("Could not process portrait:", e)
        
    # Try to load logo
    try:
        logo = Image.open('assets/img/logo-mangotree.png').convert("RGBA")
        # Resize logo
        l_ratio = logo.width / logo.height
        l_width = 400
        l_height = int(l_width / l_ratio)
        logo = logo.resize((l_width, l_height), Image.Resampling.LANCZOS)
        img.paste(logo, (80, 80), logo)
    except Exception as e:
        print("Could not process logo:", e)
        
    # Add Text (fallback font if default not available)
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 64)
        font_med = ImageFont.truetype("arial.ttf", 40)
        font_small = ImageFont.truetype("arial.ttf", 30)
    except IOError:
        font_large = ImageFont.load_default()
        font_med = ImageFont.load_default()
        font_small = ImageFont.load_default()
        
    text_color = (255, 255, 255)
    accent_color = (109, 179, 63) # #6DB33F
    
    draw.text((80, 280), "Amit Jain", font=font_large, fill=text_color)
    draw.text((80, 360), "Founder & CEO", font=font_med, fill=accent_color)
    draw.text((80, 420), "MangoTree Insurance & Investments", font=font_med, fill=text_color)
    draw.text((80, 500), "www.mangotreeinsurance.com", font=font_small, fill=(200, 200, 200))
    
    img.save('assets/img/og-image.jpg', quality=90)
    print("OG Image saved to assets/img/og-image.jpg")

if __name__ == '__main__':
    create_og_image()
