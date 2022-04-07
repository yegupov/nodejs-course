const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');

const frontRouter = require('./routes/index');
// const contactRouter = require('./routes/contact');
const userApiRouter = require('./routes/api/user');
const booksApiRouter = require('./routes/api/books');

const app = express();

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty123';
const NameDB = process.env.DB_NAME || 'library_db'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.use('/public', express.static(__dirname+"/public"));

app.use('/', frontRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

app.use(errorMiddleware);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
async function start() {
    try {

      await mongoose.connect(HostDb, {
        user: UserDB,
        pass: PasswordDB,
        dbName: NameDB,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
    } catch (e) {
      console.log(e);
    }
}

start();
