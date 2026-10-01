import os
from PIL import Image

def create_favicons():
    try:
        logo = Image.open('assets/img/logo-mangotree.png').convert("RGBA")
        
        # Determine crop to make it square
        # Or just resize it to a square (logo might be rectangular)
        # Let's crop it to square using center crop or pad it
        w, h = logo.size
        size = max(w, h)
        
        # Create a transparent square canvas
        square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        square.paste(logo, ((size - w) // 2, (size - h) // 2))
        
        # apple-touch-icon.png (180x180) - usually needs white bg
        apple = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
        apple_logo = square.resize((140, 140), Image.Resampling.LANCZOS)
        apple.paste(apple_logo, (20, 20), apple_logo)
        apple.convert('RGB').save('assets/img/apple-touch-icon.png', quality=90)
        
        # favicon-32x32.png
        fav32 = square.resize((32, 32), Image.Resampling.LANCZOS)
        fav32.save('assets/img/favicon-32x32.png')
        
        # favicon-16x16.png
        fav16 = square.resize((16, 16), Image.Resampling.LANCZOS)
        fav16.save('assets/img/favicon-16x16.png')
        
        # favicon.ico
        square.save('assets/img/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        
        print("Favicons generated successfully.")
    except Exception as e:
        print("Error generating favicons:", e)

if __name__ == '__main__':
    create_favicons()
