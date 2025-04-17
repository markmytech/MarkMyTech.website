// This is a utility script to verify that all asset paths are relative in the docs directory
// Run with: node verify-paths.js

const fs = require('fs');
const path = require('path');

// Configuration
const HTML_FILES = ['index.html', '404.html'];
const CSS_FILES = [];
const JS_FILES = [];

// Find all CSS and JS files recursively
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.css') {
        CSS_FILES.push(filePath);
      } else if (ext === '.js') {
        JS_FILES.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Find all CSS and JS files in the assets directory
try {
  findFiles(path.join(__dirname, 'assets'));
} catch (error) {
  console.log('Could not scan assets directory:', error.message);
}

// Helper function to check for absolute paths in a file
function checkForAbsolutePaths(filePath, fileType) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Define patterns to look for based on file type
    let patterns = [];
    
    if (fileType === 'html') {
      patterns = [
        { regex: /href\s*=\s*["']\//g, description: 'Absolute href attribute' },
        { regex: /src\s*=\s*["']\//g, description: 'Absolute src attribute' },
        { regex: /url\(\s*["']?\//g, description: 'Absolute CSS url()' },
      ];
    } else if (fileType === 'css') {
      patterns = [
        { regex: /url\(\s*["']?\//g, description: 'Absolute CSS url()' },
      ];
    } else if (fileType === 'js') {
      patterns = [
        { regex: /["']\//g, description: 'Potential absolute path in string' },
      ];
    }
    
    // Check for each pattern
    let foundIssues = false;
    
    patterns.forEach(({ regex, description }) => {
      const matches = content.match(regex);
      if (matches && matches.length > 0) {
        console.log(`❌ ${filePath}: Found ${matches.length} potential ${description}`);
        
        // Show the first few matches as examples
        const maxExamples = 3;
        const examples = matches.slice(0, maxExamples);
        
        examples.forEach((match, index) => {
          const surrounding = getSurroundingContent(content, match, 20);
          console.log(`   Example ${index + 1}: ... ${surrounding} ...`);
        });
        
        if (matches.length > maxExamples) {
          console.log(`   (and ${matches.length - maxExamples} more...)`);
        }
        
        foundIssues = true;
      }
    });
    
    if (!foundIssues) {
      console.log(`✅ ${filePath}: No absolute paths detected`);
    }
    
    return !foundIssues;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return false;
  }
}

// Helper to get surrounding content for context
function getSurroundingContent(content, match, chars) {
  const index = content.indexOf(match);
  if (index === -1) return 'context not found';
  
  const start = Math.max(0, index - chars);
  const end = Math.min(content.length, index + match.length + chars);
  
  return content.substring(start, end).replace(/\s+/g, ' ');
}

// Check HTML files
console.log('\n=== Checking HTML files ===');
HTML_FILES.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    checkForAbsolutePaths(filePath, 'html');
  } else {
    console.log(`⚠️ ${file} not found`);
  }
});

// Check CSS files
console.log('\n=== Checking CSS files ===');
if (CSS_FILES.length === 0) {
  console.log('No CSS files found to check');
} else {
  CSS_FILES.forEach(file => {
    checkForAbsolutePaths(file, 'css');
  });
}

// Check JS files
console.log('\n=== Checking JS files ===');
if (JS_FILES.length === 0) {
  console.log('No JS files found to check');
} else {
  JS_FILES.forEach(file => {
    checkForAbsolutePaths(file, 'js');
  });
}

console.log('\nPath verification complete');
console.log('If any issues were found, update the paths to be relative (e.g., change /path to ./path)');