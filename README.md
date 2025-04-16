# Mark My Tech - AI Automation Solutions Website

This is the source code for the Mark My Tech company website, showcasing AI automation consulting services.

## Overview

The website features:
- Modern, responsive design
- Interactive sections highlighting services
- "Who It's For" categorization of target audiences
- Service package descriptions
- Interactive recommendation quiz
- Contact form with backend storage
- Google Calendar integration for booking appointments

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI components
- **Backend**: Node.js, Express, In-memory storage
- **Build Tools**: Vite, ESBuild, TSX
- **Analytics**: Custom analytics implementation for user behavior tracking

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Quick Start

For the easiest way to run the website:

1. **Windows**: Double-click the `run_website.bat` file
2. **Mac/Linux**: Open Terminal in the project folder and run `bash run_website.sh`

These scripts will install all dependencies and start the development server automatically.

### Manual Setup

If you prefer to run commands manually:

1. Open a terminal/command prompt in the project root directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5000`

## Deploying to GitHub Pages

To deploy this website to GitHub Pages:

1. **Prepare the site for static hosting**:
   - **Windows**: Double-click the `prepare_for_github.bat` file
   - **Mac/Linux**: Run `bash prepare_for_github.sh` in your terminal

2. **Push to GitHub**:
   ```bash
   # Initialize a Git repository (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit for GitHub Pages"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/yourusername/repository-name.git
   
   # Push to GitHub
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - Select "main branch /docs folder" as the source
   - Click "Save"

Your site will be available at `https://yourusername.github.io/repository-name/`

> **Note**: The contact form and other backend features will require additional services for functionality on GitHub Pages. Consider using Formspree.io or a similar service to handle form submissions.

## Project Structure

- `client/src/` - Frontend React code
  - `components/` - UI components
  - `pages/` - Page components
  - `lib/` - Utility functions
- `server/` - Backend Express code
- `shared/` - Shared types and schemas

## Contact

For questions about this project, contact:
- Email: praj@markmytech.com
- LinkedIn: [Mark My Tech](https://www.linkedin.com/company/markmytech/)

## License

All rights reserved. This source code is proprietary to Mark My Tech.