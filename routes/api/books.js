const express = require('express');
const router = express.Router();
const Book = require('../../models/book');
const fileMiddleware = require('../../middleware/file');
// const db = require('../../db');

router.get('/', async (req, res) => {
  let books;
  // books = await Book.find().select('-__v');
  if (req.isAuthenticated()) {
    console.log('User Authenticated');
  } else {
    console.log('User Not Authenticated');
  }

  try {
    books = await Book.find().select('-__v');
  } catch (e) {
    res.status(500).json(e)
  }

  res.render("books/index", {
    title: "Books list",
    books: books,
    user: req.user
  });
});

// CREATE render page
router.get('/create', (req, res) => {
  res.render("books/create", {
    title: "Books | create",
    book: {},
  });
});

// CREATE and Save new book
router.post(
  '/create',
  fileMiddleware.upload.single('coverimg'),
  async (req, res) => {

    const {title, authors, description, favorite} = req.body;
    let fileCover = '',
        fileName = '';

    if (req.file) {
      fileName = req.file; // file path: my-image.jpg
      console.log(fileName);

      fileCover = fileName.split('.').pop().join('.');
      fileName = `${new Date().toISOString().replace(/:/g, '-')}-${fileName}`;
    }

    const newBook = new Book({
      title,
      authors,
      description,
      favorite,
      fileCover,
      fileName
    });

    try {
      await newBook.save();
      res.redirect('/api/books');
      // res.json(newBook);
    } catch (e) {
      console.error(e);
      res.status(500).json();
    }
  }
);

// READ - Get one book data and render page
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  let book;

  try {
    book = await Book.findById(id).select('-__v');
    // res.json(book);
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.render("books/view", {
    title: "Books | View",
    book: book
  });
});

// UPDATE page render
router.get('/update/:id', async (req, res) => {
  const {id} = req.params;
  let book;

  try {
    book = await Book.findById(id);
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.render("books/update", {
    title: "Books | Update",
    book: book
  });
});

// UPDATE book and Save
router.post(
  '/update/:id',
  fileMiddleware.upload.single('coverimg'),
  async (req, res) => {

    const {id} = req.params;
    const {title, authors, description, favorite} = req.body;
    let book,
        fileCover = '',
        fileName = '';

    if (req.file) {
      fileName = req.file; // file path: my-image.jpg
      console.log(fileName);

      fileCover = fileName.split('.').pop().join('.');
      fileName = `${(new Date().toISOString().replace(/:/g, '-')).slice(0, -5)}-${fileName}`;
    }

    try {
      await Book.findByIdAndUpdate(id, {title, authors, description, favorite, fileCover, fileName});
    } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
    }

    res.redirect(`/api/books/${id}`);
  }
);

// DELETE book
router.post('/delete/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await Book.deleteOne({_id: id});
    // res.json(true);
  } catch (e) {
    console.error(e);
    res.status(404).redirect('/404');
  }

  res.redirect(`/api/books`);
});

module.exports = router;
