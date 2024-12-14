// Import required modules
const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
