const express = require('express');
const router = express.Router();

const bookViews = {
    views: [
      {
        bookId: '001',
        qtyViews: 0
      },
      {
        bookId: '002',
        qtyViews: 0
      },
      {
        bookId: '003',
        qtyViews: 0
      }
    ]
};

router.get('/:bookId', (req, res) => {  // get counter value
    const {views} = bookViews;
    const {bookId} = req.params;
    console.log('bookId : ', bookId);

    const currentBook = views.find(book => book.bookId === bookId)
    console.log('currentBook = ', currentBook);
    res.json(currentBook);
});

router.post('/:bookId/incr', (req, res) => {  // increase the counter
    const {views} = bookViews;

    const {bookId} = req.params;
    console.log('bookId : ', bookId);

    const currentBook = views.find(book => book.bookId === bookId)
    currentBook.qtyViews++
    console.log('currentBook = ', currentBook);

    res.status(201);
    res.json(views);
});

module.exports = router;
