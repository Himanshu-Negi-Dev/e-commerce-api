const express = require('express');
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');
const { notFoundMiddleware } = require('./middlewares/notFound');
const app = express();
const authRoutes = require('./routes/auth');

app.use('/e-commerce/v1', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(3001, () => console.log('serer running'));