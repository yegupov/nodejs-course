const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// READ - Get all books and render page with books list
router.get('/', async (req, res) => {
  let books = {}

  try {
    books = await Book.find().select('-__v');
  } catch (e) {
    // res.status(500).json(e)
    console.log('Error get books : ', e);
  }

  res.render("index", {
    title: "Library | Home page",
    books: books
  });
});

// READ - Get one book data and render page
router.get('/books/:id', async (req, res) => {
  const {id} = req.params
  let book

  try {
    book = await Book.findById(id).select('-__v')
  } catch (e) {
    console.error(e);
    // res.status(404).redirect('/404');
  }

  res.render("book", {
    title: "Book:",
    book
  });
});

module.exports = router;
