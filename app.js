const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

const { connectDB } = require("./db/connection");
const { CustomErrorAPI } = require("./errors/CustomErrorAPI");
const { asyncWrapper } = require("./middlewares/async");
const { errorHandlerMiddleware } = require("./middlewares/errorHandler");
const authRouter = require('./routes/authRoutes');
require('dotenv').config();

app.use(express.json());
// app.use(cookieParser);
app.get('/', asyncWrapper((req, res)=>{
  console.log(req.cookie);
    res.send("gelloo")
  }
))

app.use('/api/v1', authRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3001,()=>{console.log("Server running")});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
