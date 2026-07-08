@echo off
title Medical Supplies Payment Dashboard Server
echo ======================================================================
echo  Medical Supplies Payment Dashboard Server (รอบจ่ายทุกวันที่ 25)
echo ======================================================================
echo.

cd /d "C:\Users\ER01\.gemini\antigravity\scratch\med-payment-dashboard"

:: Check if Python is installed
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python is installed. Starting web server on http://127.0.0.1:8999 ...
    echo.
    echo * To close the server, close this command window. *
    echo.
    start "" http://127.0.0.1:8999
    python server.py
) else (
    echo [Warning] Python was not found on this system.
    echo Opening dashboard file directly in default web browser...
    echo.
    start "" "index.html"
    echo Dashboard opened.
    timeout /t 5 >nul
)
