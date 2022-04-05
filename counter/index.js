const express = require('express');
// const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3002;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use('/counter', indexRouter);

// app.listen(3002);

app.listen(PORT, () => {
  console.log(`Counter app is running on port ${PORT}`);
});
