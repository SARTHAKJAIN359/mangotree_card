#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Open Graph (OG) Preview Image Generator for MangoTree Digital Business Card
Generates an optimized 1200x630 social preview card for WhatsApp, Facebook, LinkedIn, Twitter, and iMessage.
"""

import os
import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    install('Pillow')
    from PIL import Image, ImageDraw, ImageFont

def get_font(font_names, size):
    for name in font_names:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            pass
    return ImageFont.load_default()

def create_og_image():
    # Standard OG Dimensions
    W, H = 1200, 630

    # Forest Green Background matching --leaf-900 (#0F3D2A)
    bg_color = (15, 61, 42)
    img = Image.new('RGBA', (W, H), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Typography fallbacks
    font_name = get_font([
        'C:\\Windows\\Fonts\\segoeuib.ttf', 'segoeuib.ttf',
        'C:\\Windows\\Fonts\\arialbd.ttf', 'arialbd.ttf',
        'DejaVuSans-Bold.ttf'
    ], 56)

    font_role = get_font([
        'C:\\Windows\\Fonts\\segoeuib.ttf', 'segoeuib.ttf',
        'C:\\Windows\\Fonts\\arialbd.ttf', 'arialbd.ttf',
        'DejaVuSans-Bold.ttf'
    ], 30)

    font_company = get_font([
        'C:\\Windows\\Fonts\\segoeui.ttf', 'segoeui.ttf',
        'C:\\Windows\\Fonts\\arial.ttf', 'arial.ttf',
        'DejaVuSans.ttf'
    ], 28)

    font_tagline = get_font([
        'C:\\Windows\\Fonts\\georgiai.ttf', 'georgiai.ttf',
        'C:\\Windows\\Fonts\\georgia.ttf', 'georgia.ttf',
        'C:\\Windows\\Fonts\\timesi.ttf', 'timesi.ttf'
    ], 24)

    font_contact = get_font([
        'C:\\Windows\\Fonts\\segoeui.ttf', 'segoeui.ttf',
        'C:\\Windows\\Fonts\\arial.ttf', 'arial.ttf',
        'DejaVuSans.ttf'
    ], 22)

    # 1. MangoTree Brand Logo (Framed in a crisp white rounded badge with ample breathing room)
    try:
        logo = Image.open('assets/img/logo-mangotree.png').convert("RGBA")
        l_target_h = 92
        l_ratio = logo.width / logo.height
        l_target_w = int(l_target_h * l_ratio)
        logo_resized = logo.resize((l_target_w, l_target_h), Image.Resampling.LANCZOS)

        # Badge dimensions with padding
        pad_x = 16
        pad_y = 10
        badge_w = l_target_w + pad_x * 2
        badge_h = l_target_h + pad_y * 2
        badge_rad = 12

        badge = Image.new('RGBA', (badge_w, badge_h), (0, 0, 0, 0))
        badge_draw = ImageDraw.Draw(badge)
        badge_draw.rounded_rectangle([0, 0, badge_w - 1, badge_h - 1], radius=badge_rad, fill=(255, 255, 255, 255))
        badge.paste(logo_resized, (pad_x, pad_y), logo_resized)

        badge_x, badge_y = 80, 55
        img.paste(badge, (badge_x, badge_y), badge)
    except Exception as e:
        print("Could not process logo:", e)

    # 2. Left Column Typography (Strictly positioned below logo with generous spacing — ZERO overlap)
    c_white = (255, 255, 255)
    c_gold = (242, 154, 31)   # #F29A1F (Mango Gold)
    c_cream = (243, 236, 221) # #F3ECDD (Soft Paper Cream)
    c_muted = (175, 206, 188) # Soft Leaf Sage

    # Name is comfortably positioned below the badge
    draw.text((80, 212), "Amit Jain", font=font_name, fill=c_white)
    draw.text((80, 284), "Founder & CEO", font=font_role, fill=c_gold)
    draw.text((80, 328), "MangoTree Insurance & Investments", font=font_company, fill=c_cream)

    # Subtle divider rule
    draw.line([(80, 388), (480, 388)], fill=(243, 236, 221, 60), width=1)

    # Verified Tagline and Contact Channels
    draw.text((80, 412), "“Aam ke aam, guthliyon ke daam.”", font=font_tagline, fill=(242, 185, 90))
    draw.text((80, 462), "www.mangotreeinsurance.com", font=font_contact, fill=c_muted)
    draw.text((80, 498), "+91 99115 02502", font=font_contact, fill=c_muted)

    # 3. Founder Portrait (Canopy Arch framed card on the right)
    try:
        portrait = Image.open('assets/img/portrait-amit-jain.png').convert("RGBA")
        p_ratio = portrait.width / portrait.height
        p_height = 530
        p_width = int(p_height * p_ratio)
        portrait_resized = portrait.resize((p_width, p_height), Image.Resampling.LANCZOS)

        # Rounded frame mask
        p_mask = Image.new('L', (p_width, p_height), 0)
        p_mask_draw = ImageDraw.Draw(p_mask)
        p_mask_draw.rounded_rectangle([0, 0, p_width - 1, p_height - 1], radius=28, fill=255)

        p_x = W - p_width - 70
        p_y = H - p_height - 30
        img.paste(portrait_resized, (p_x, p_y), p_mask)

        # Elegant subtle arch border
        p_border = Image.new('RGBA', (p_width, p_height), (0, 0, 0, 0))
        b_draw = ImageDraw.Draw(p_border)
        b_draw.rounded_rectangle([0, 0, p_width - 1, p_height - 1], radius=28, outline=(243, 236, 221, 90), width=2)
        img.paste(p_border, (p_x, p_y), p_border)
    except Exception as e:
        print("Could not process portrait:", e)

    # Save high-quality JPEG
    output_path = 'assets/img/og-image.jpg'
    img.convert('RGB').save(output_path, quality=95)
    print(f"OG Image successfully saved to: {output_path}")

if __name__ == '__main__':
    create_og_image()
