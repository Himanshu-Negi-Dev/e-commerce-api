const mongoose = require('mongoose');

const connectDB = (uri) => {
  await mongoose.connect(uri);
}

module.exports = { connectDB }