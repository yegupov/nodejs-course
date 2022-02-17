const express = require('express');
const router = express.Router();
const {Book} = require('../../models');
const fileMiddleware = require('../../middleware/file');

const store = {
  books: [
    {
      id: '001',
      title: 'Node.js в действии.',
      authors: 'Майк Кантелон',
      description: 'Цель данной книги — быстро овладеть основами Node.js, помочь вам начать разработку приложений и научить всему, что необходимо знать о "продвинутом" JavaScript.',
      favorite: 'favorite',
      fileCover: 'node_js_v_dejstvii',
      fileName: '2022-02-06-node_js_v_dejstvii',
      fileBook: '2022-02-06-node_js_v_dejstvii.jpg'
    },
    {
      id: '002',
      title: 'Секреты JavaScript ниндзя.',
      authors: 'Джон Резиг, Беэр Бибо, Иосип Марас',
      description: 'Написание более эффективного кода с помощью функций, объектов и замыканий. Преодоление скрытых препятствий, которые таит в себе разработка веб-приложений на JavaScript.',
      favorite: 'favorite',
      fileCover: 'sekrety_ja',
      fileName: '2022-02-06-sekrety_ja',
      fileBook: '2022-02-06-sekrety_ja.jpg'
    },
    {
      id: '003',
      title: 'Javascript на примерах. Практика, практика и только практика.',
      authors: 'А. Никольский',
      description: 'Эта книга является превосходным учебным пособием для изучения языка программирования J avaScript на примерах. Изложение ведется последовательно: от написания первой программы, до создания полноценных проектов: интерактивных элементов (типа слайдера, диалоговых окон) интернет-магазина, лендинговой страницы и проч.',
      favorite: 'favorite',
      fileCover: 'javascript_na_primerax',
      fileName: '2022-02-06-javascript_na_primerax',
      fileBook: '2022-02-06-javascript_na_primerax.jpg'
    }
  ]
};

router.get('/', (req, res) => {
  const {books} = store;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("Library App | Not found");
  }
});

router.post(
  '/',
  fileMiddleware.upload.single('coverimg'),
  (req, res) => {
    const {books} = store;

    let fileCover = '',
        fileName = '',
        fileBook = '';
    if (req.file) {
      fileBook = req.file; // file path: my-image.jpg
      console.log(fileBook);

      fileCover = fileBook.split('.').pop().join('.');
      fileName = `${new Date().toISOString().replace(/:/g, '-')}-${fileCover}`;
    }

    const {title, authors, description, favorite} = req.body;

    const newBook = new Book(title, authors, description, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
  }
);

router.put(
  '/:id',
  fileMiddleware.upload.single('coverimg'),
  (req, res) => {
    const {books} = store;

    let fileCover = '',
        fileName = '',
        fileBook = '';
    if (req.file) {
      fileBook = req.file; // file path: my-image.jpg
      console.log(fileBook);

      fileCover = fileBook.split('.').pop().join('.');
      fileName = `${(new Date().toISOString().replace(/:/g, '-')).slice(0, -5)}-${fileCover}`;
    }

    const {title, authors, description, favorite} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
      books[idx] = {
        ...books[idx],
        title,
        authors,
        description,
        favorite,
        fileCover,
        fileName,
        fileBook
      };
      res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Library App | Not found");
    }
  }
);

router.delete('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json("Library App | Not found");
  }
});

// загрузка файлов
router.get('/:id/download', (req, res) => {
  const {fileCover, fileBook} = req.body,
        extension = fileBook.split('.').pop();
  res.download(__dirname+`/../../public/img/${fileBook}`, `${fileCover}.${extension}`, err=>{
    if (err) {
      res.status(404).json();
    }
  });
});

module.exports = router;
