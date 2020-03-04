const express = require('express');
const path = require('path');
const morgan = require('morgan');

const connectDB = require('./config/db');
const users = require('./routes/api/users');
const questions = require('./routes/api/questions');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'));

// Static server
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);
app.use('/api/questions', questions);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// Global error handler
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ errors: { msg: `Can't find ${req.originalUrl} in this server` } });
});
