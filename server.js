const express = require('express');
const morgan = require('morgan');

const connectDB = require('./config/db');
const users = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'));

app.use('/api/users', users);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
