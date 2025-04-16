@echo off
echo ===== Mark My Tech Website Setup and Launch =====
echo.
echo This script will install dependencies and start the website
echo.

:: Check if Node.js is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: Display Node.js version
echo Using Node.js version:
node --version
echo.

:: Check if npm is installed
WHERE npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed or not in your PATH.
    echo Please install Node.js (with npm) from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
echo This may take a few minutes, please be patient.
echo.
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies.
    echo.
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

:: Start development server
echo Starting the website development server...
echo.
echo When the server is running, open your web browser and navigate to:
echo http://localhost:5000
echo.
echo To stop the server, press Ctrl+C in this terminal.
echo.
call npm run dev

pause