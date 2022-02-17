const uidGenerator = require('node-unique-id-generator');

class Book {
  constructor(title = '', authors = '', description = '', favorite ='', fileCover = '', fileName = '', fileBook = '', id = uidGenerator.generateUniqueId()) {
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

module.exports = Book;
