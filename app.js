const express = require('express');
const app = express();
require('dotenv').config();

const { connectDB } = require('./db/connection');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');
const { notFoundMiddleware } = require('./middlewares/notFound');
const authRoutes = require('./routes/auth');

app.use('/e-commerce/v1', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`server connected to ${port}`)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
