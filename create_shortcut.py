import subprocess
import os

bat_path = r"C:\Users\ER01\Desktop\hos bill pay.bat"
lnk_path = r"C:\Users\ER01\Desktop\hos bill pay.lnk"
target_path = r"C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard\start_server.bat"
working_dir = r"C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard"
icon_path = r"C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard\logo.ico"

# 1. Delete old bat file
if os.path.exists(bat_path):
    try:
        os.remove(bat_path)
        print(f"Deleted old bat file: {bat_path}")
    except Exception as e:
        print(f"Error deleting bat file: {e}")
else:
    print("Old bat file not found, proceeding...")

# 2. Create LNK shortcut via PowerShell
ps_command = f"""
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut('{lnk_path}')
$Shortcut.TargetPath = '{target_path}'
$Shortcut.WorkingDirectory = '{working_dir}'
$Shortcut.IconLocation = '{icon_path}'
$Shortcut.Save()
"""

try:
    result = subprocess.run(["powershell", "-Command", ps_command], capture_output=True, text=True, check=True)
    print("Shortcut created successfully!")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    print(f"Error creating shortcut: {e}")
    print(e.stderr)
