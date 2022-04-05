const express = require('express');
const router = express.Router();
const {readFileSync, writeFileSync} = require('fs');
const bookViewsJson = readFileSync('book-views.json', 'utf8');
const bookViews = JSON.parse(bookViewsJson);

/* const bookViews = {
    views: [
      {
        bookId: '001',
        qtyViews: 1
      },
      {
        bookId: '002',
        qtyViews: 3
      },
      {
        bookId: '003',
        qtyViews: 7
      }
    ]
}; */

router.get('/:bookId', (req, res) => {  // get counter value
    const {views} = bookViews;
    const {bookId} = req.params;
    console.log('bookId : ', bookId);

    const currentBook = views.find(book => book.bookId === bookId)
    console.log('currentBook = ', currentBook);
    // res.json(currentBook);
    res.json({
      qtyViews: currentBook.qtyViews
    })
});

router.post('/:bookId/incr', (req, res) => {  // increase the counter
    const {views} = bookViews;

    const {bookId} = req.params;
    console.log('bookId : ', bookId);

    const currentBook = views.find(book => book.bookId === bookId)
    currentBook.qtyViews++
    console.log('currentBook = ', currentBook);

    const newBookViews = JSON.stringify({views});
    writeFileSync('book-views.json', newBookViews);

    res.status(201);
    res.json(views);
});

module.exports = router;
