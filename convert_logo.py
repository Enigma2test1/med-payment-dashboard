import os
from PIL import Image

png_path = r"C:\Users\ER01\.gemini\antigravity\brain\7600e93e-2be6-4196-bfcf-0417e72eaae4\logo_b_1781932263940.png"
ico_path = r"C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard\logo.ico"
favicon_path = r"C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard\favicon.ico"

if os.path.exists(png_path):
    print("PNG found. Converting to ICO...")
    img = Image.open(png_path)
    
    # Save as logo.ico for shortcut
    img.save(ico_path, format="ICO", sizes=[(256, 256), (128, 128), (64, 64), (32, 32), (16, 16)])
    print(f"Saved: {ico_path}")
    
    # Save as favicon.ico for browser
    img.save(favicon_path, format="ICO", sizes=[(32, 32), (16, 16)])
    print(f"Saved: {favicon_path}")
else:
    print(f"Error: {png_path} not found.")
