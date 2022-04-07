const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  favorite: {
    type: String,
    default: "",
  },
  fileCover: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model('Book', bookSchema);
