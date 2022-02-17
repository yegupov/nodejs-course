const express = require('express');
// const formData = require("express-form-data");   -  NEED DELETE
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const booksRouter = require('./routes/books');
const userApiRouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
