require('dotenv').config(); // Load environment variables from .env file
// Import required modules
const express = require('express');


// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my Express app!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});