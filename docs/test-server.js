const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Get the file path
  let filePath = '.' + req.url;
  
  // Default to index.html if the path is '/'
  if (filePath === './' || filePath === '.') {
    filePath = './index.html';
  }
  
  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set the content type based on the file extension
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // For SPA routing, serve index.html for any non-file route
        if (!extname || !mimeTypes[extname]) {
          console.log(`File not found: ${filePath}, serving index.html instead`);
          fs.readFile('./index.html', (err, indexContent) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading index.html');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(indexContent, 'utf-8');
            }
          });
          return;
        }
        
        // File not found
        res.writeHead(404);
        res.end('File not found');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`
-------------------------------------------------------
Local GitHub Pages Test Server
-------------------------------------------------------
Server running at http://localhost:${PORT}/
- All static files are served normally
- All other routes redirect to index.html (for SPA routing)
- Press Ctrl+C to stop the server
-------------------------------------------------------
`);
});