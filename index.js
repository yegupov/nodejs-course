const express = require('express');
// const formData = require("express-form-data");   -  NEED DELETE
// const {Book} = require('./models');
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser());


app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
