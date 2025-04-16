@echo off
echo ===== Mark My Tech Website Complete Setup =====
echo.
echo This script will download and install Node.js, project dependencies, and start the website
echo You may need to confirm installation steps in popup windows
echo.

:: Check if Node.js is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Downloading and installing Node.js...
    
    :: Create a temporary directory for downloads
    mkdir temp_downloads 2>nul
    cd temp_downloads
    
    :: Download Node.js installer using PowerShell
    echo Downloading Node.js installer...
    powershell -Command "& {(New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi', 'node_installer.msi')}"
    
    IF NOT EXIST node_installer.msi (
        echo ERROR: Failed to download Node.js installer.
        echo Please download and install Node.js manually from https://nodejs.org/ and try again.
        cd ..
        pause
        exit /b 1
    )
    
    :: Run the installer
    echo Installing Node.js...
    start /wait msiexec /i node_installer.msi /quiet /qn
    
    :: Clean up
    cd ..
    rmdir /s /q temp_downloads
    
    :: Verify installation
    WHERE node >nul 2>nul
    IF %ERRORLEVEL% NEQ 0 (
        echo ERROR: Node.js installation failed.
        echo Please install Node.js manually from https://nodejs.org/ and try again.
        echo.
        pause
        exit /b 1
    )
    
    echo Node.js installed successfully!
    echo.
)

:: Display Node.js version
echo Using Node.js version:
node --version
echo.

:: Check if npm is installed
WHERE npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed.
    echo This is unusual as npm usually comes with Node.js.
    echo Please install Node.js again from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: Install dependencies
echo Installing project dependencies...
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