#!/bin/bash

echo "===== Mark My Tech Website Setup and Launch ====="
echo
echo "This script will install dependencies and start the website"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    echo
    read -p "Press Enter to exit..."
    exit 1
fi

# Display Node.js version
echo "Using Node.js version:"
node --version
echo

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed or not in your PATH."
    echo "Please install Node.js (with npm) from https://nodejs.org/ and try again."
    echo
    read -p "Press Enter to exit..."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
echo "This may take a few minutes, please be patient."
echo
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies."
    echo
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Dependencies installed successfully!"
echo

# Start development server
echo "Starting the website development server..."
echo
echo "When the server is running, open your web browser and navigate to:"
echo "http://localhost:5000"
echo
echo "To stop the server, press Ctrl+C in this terminal."
echo
npm run dev

read -p "Press Enter to exit..."