const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    const mongoURI = config.get('mongoURI');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Could not connect to MongoDB');
  }
};

module.exports = connectDB;
