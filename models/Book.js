const uidGenerator = require('node-unique-id-generator');

class Book {
  constructor(id = uidGenerator.generateUniqueId(), title = '', authors = '', description = '', favorite ='', fileCover = '', fileName = '') {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

module.exports = Book;
