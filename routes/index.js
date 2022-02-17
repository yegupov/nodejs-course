const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {
      title: "Library | Home page"
    });
});

module.exports = router;
