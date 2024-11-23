const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "dist")));

// Read the SSL certificate and key
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create the HTTPS server
https.createServer(options, app).listen(3000, () => {
  console.log('Server running at https://localhost:3000');
});
