// Simple test server to check Github Pages deployment
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Handle SPA routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// This file is for local testing purposes only
// To use it:
// 1. Install express: npm install express
// 2. Run: node test-server.js
// 3. Open: http://localhost:3000
//
// Note: This file is not used in the actual GitHub Pages deployment
// It's just a convenience for testing the static files locally