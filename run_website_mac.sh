#!/bin/bash

echo "===== Mark My Tech Website Setup for macOS ====="
echo
echo "This script will install Node.js if needed, and start the website with macOS-specific settings"
echo "You may be asked for your password for some installation steps"
echo

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH
    if [ -f ~/.zshrc ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -f ~/.bash_profile ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo "Homebrew installed successfully!"
    echo
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js with Homebrew..."
    brew install node
    
    if ! command -v node &> /dev/null; then
        echo "ERROR: Failed to install Node.js."
        echo "Please install Node.js manually from https://nodejs.org/ and try again."
        exit 1
    fi
    
    echo "Node.js installed successfully!"
    echo
fi

# Display Node.js version
echo "Using Node.js version:"
node --version
echo

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed."
    echo "This is unusual as npm usually comes with Node.js."
    echo "Please install Node.js again from https://nodejs.org/ and try again."
    exit 1
fi

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing project dependencies..."
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
fi

# Start development server
echo "Starting the website development server with macOS optimizations..."
echo
echo "When the server is running, open your web browser and navigate to:"
echo "http://localhost:5000"
echo
echo "To stop the server, press Ctrl+C in this terminal."
echo

# Export environment variable to control binding behavior
export MAC_HOST_BINDING=1

# Run the development server
NODE_ENV=development npx tsx server/index.ts

read -p "Press Enter to exit..."