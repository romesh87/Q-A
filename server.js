const express = require('express');

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connecting DB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
