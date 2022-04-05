const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {
      title: "Library | Home page"
    });
});

router.get('/contact', (req, res) => {
    res.render("contact", {
      title: "Library | Contact page"
    });
});

module.exports = router;
