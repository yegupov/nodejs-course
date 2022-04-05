const express = require('express');
// const formData = require("express-form-data");   -  NEED DELETE
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error');

const frontRouter = require('./routes/index');
// const contactRouter = require('./routes/contact');
const userApiRouter = require('./routes/api/user');
const booksApiRouter = require('./routes/api/books');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use('/public', express.static(__dirname+"/public"));

app.use('/', frontRouter);
// app.use('/contact', contactRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
