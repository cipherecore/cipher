const express = require('express');
const path = require('path');

const app = express();

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// URL rewriting
app.get('/downloads', (req, res) => {
  res.sendFile(path.join(__dirname, 'downloads.html'));
});

app.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, 'download.html'));
});

// Fallback to index for SPA-like behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
