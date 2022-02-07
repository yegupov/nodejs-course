const express = require('express');
const formData = require("express-form-data");
const {Book} = require('./models');
const store = {
  books: [
    {
      id: '001',
      title: 'Node.js в действии.',
      authors: 'Майк Кантелон',
      description: 'Цель анной книги — быстро овладеть основами Node.js, помочь вам начать разработку приложений и научить всему, что необходимо знать о "продвинутом" JavaScript.',
      favorite: 'favorite',
      fileCover: 'my-pic',
      fileName: '2022-02-06-my-pic'
    },
    {
      id: '002',
      title: 'Секреты JavaScript ниндзя.',
      authors: 'Джон Резиг, Беэр Бибо, Иосип Марас',
      description: 'Написание более эффективного кода с помощью функций, объектов и замыканий. Преодоление скрытых препятствий, которые таит в себе разработка веб-приложений на JavaScript.',
      favorite: 'favorite',
      fileCover: 'my-pic',
      fileName: '2022-02-06-my-pic'
    },
    {
      id: '003',
      title: 'Javascript на примерах. Практика, практика и только практика.',
      authors: 'А. Никольский',
      description: 'Эта книга является превосходным учебным пособием для изучения языка программирования J avaScript на примерах. Изложение ведется последовательно: от написания первой программы, до создания полноценных проектов: интерактивных элементов (типа слайдера, диалоговых окон) интернет-магазина, лендинговой страницы и проч.',
      favorite: 'favorite',
      fileCover: 'my-pic',
      fileName: '2022-02-06-my-pic'
    }
  ],
};

const app = express();

app.use(formData.parse());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({
    id: '1',
    mail: 'test@mail.ru'
  });
});

app.get('/api/books/', (req, res) => {
  const {books} = store;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
  const {books} = store;
  const {title, authors, description, favorite, fileCover, fileName} = req.body;

  const newBook = new Book(title, authors, description, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const {books} = store;
  const {title, authors, description, favorite, fileCover, fileName} = req.body;
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
      fileName
    };
    res.json(books[idx]);
  } else {
      res.status(404);
      res.json("Library App | Not found");
  }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
