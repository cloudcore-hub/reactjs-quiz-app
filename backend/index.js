const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// Define routes here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
