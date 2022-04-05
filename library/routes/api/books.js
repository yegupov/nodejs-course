const express = require('express');
const router = express.Router();
const {Book} = require('../../models');
const fileMiddleware = require('../../middleware/file');
const http = require('http')

const store = {
  books: [
    {
      id: '001',
      title: 'Node.js в действии',
      authors: 'Майк Кантелон',
      description: 'Цель данной книги — быстро овладеть основами Node.js, помочь вам начать разработку приложений и научить всему, что необходимо знать о "продвинутом" JavaScript.',
      favorite: 'favorite',
      fileCover: 'node_js_v_dejstvii',
      fileName: '2022-02-06-node_js_v_dejstvii',
      fileBook: '2022-02-06-node_js_v_dejstvii.jpg'
    },
    {
      id: '002',
      title: 'Секреты JavaScript ниндзя',
      authors: 'Джон Резиг, Беэр Бибо, Иосип Марас',
      description: 'Написание более эффективного кода с помощью функций, объектов и замыканий. Преодоление скрытых препятствий, которые таит в себе разработка веб-приложений на JavaScript.',
      favorite: 'favorite',
      fileCover: 'sekrety_ja',
      fileName: '2022-02-06-sekrety_ja',
      fileBook: '2022-02-06-sekrety_ja.jpg'
    },
    {
      id: '003',
      title: 'Javascript на примерах. Практика, практика и только практика',
      authors: 'А. Никольский',
      description: 'Эта книга является превосходным учебным пособием для изучения языка программирования J avaScript на примерах. Изложение ведется последовательно: от написания первой программы, до создания полноценных проектов: интерактивных элементов (типа слайдера, диалоговых окон) интернет-магазина, лендинговой страницы и проч.',
      favorite: 'favorite',
      fileCover: 'javascript_na_primerax',
      fileName: '2022-02-06-javascript_na_primerax',
      fileBook: '2022-02-06-javascript_na_primerax.jpg'
    }
  ],
};

router.get('/', (req, res) => {
  const {books} = store;
  res.render("books/index", {
    title: "Books list",
    books
  });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Books | create",
        book: {},
    });
});

router.post(
  '/create',
  fileMiddleware.upload.single('coverimg'),
  (req, res) => {
    const {books} = store;

    let fileCover = '',
        fileName = '',
        fileBook = '';
    if (req.file) {
      fileBook = req.file.filename; // file path: '2022-02-16T13-42-19-book-1.jpg'
      console.log(fileBook);

      fileBookParts = fileBook.split('.');
      fileBookParts.pop();
      fileCover = fileBookParts.join('.');
      fileName = `${(new Date().toISOString().replace(/:/g, '-')).slice(0, -5)}-${fileCover}`;
    }

    const {title, authors, description, favorite} = req.body;

    const newBook = new Book(title, authors, description, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    // console.log('newBook : ', newBook);

    res.status(201);

    res.redirect('/books')
  }
);

router.get(
  '/:id',
  (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
      console.log('id = ', id);

      // get counter value
      const urlCounter = 'http://counterapp:3002/counter/' + id || 'http://127.0.0.1:3002/counter/' + id || 'http://localhost:3002/counter/' + id
      const request = http.get(urlCounter, (response) => {
        const statusCode = response.statusCode
        if (statusCode !== 200) {
          console.error(`Status Code: ${statusCode}`)
          return
        }

        let rawData = ''
        let qtyViews = 0
        response.on('data', (chunk) => rawData += chunk)
        response.on('end', () => {
          let parsedData = JSON.parse(rawData)

          if (parsedData.success === false) {
            console.log('View qty not received');
          } else {
            console.log('View qty : ', parsedData, parsedData.qtyViews)
            qtyViews = parsedData.qtyViews
          }
          res.render("books/view", {
            title: "Books | View",
            book: books[idx],
            qtyViews
          });
        })
      })
      request.on('error', (e) => {
        console.error(`Got error: ${e.message}`)
      })


      // increase the counter of page view
      const optionsCounter = {
        // hostname: 'http://localhost',
        // hostname: 'http://127.0.0.1',
        hostname: 'counterapp',
        port: 3002,
        path: '/counter/' + id + '/incr',
        method: 'POST'
      }

      const reqIncr = http.request(optionsCounter, (res) => {
        let rawData = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          console.log('Increase the counter Body: ', JSON.parse(rawData));
        });

      }).on("error", (err) => {
        console.log("Error: ", err.message);
      });

      // reqIncr.write(data);
      reqIncr.end();

    } else {
      res.status(404).redirect('/404');
    }
  }
);

router.get('/update/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.render("books/update", {
      title: "Books | Update",
      book: books[idx],
    });
  } else {
    res.status(404).redirect('/404');
  }
});

router.post(
  '/update/:id',
  fileMiddleware.upload.single('coverimg'),
  (req, res) => {
    console.log('req.body : ', req.body);
    console.log('req.file : ', req.file);
    /*
    req.file :  {
      fieldname: 'coverimg',
      originalname: 'book-1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'D:\\Dev\\TrainingProjects\\nodejs-course\\public\\img',
      filename: '2022-02-16T13-42-19-book-1.jpg',
      path: 'D:\\Dev\\TrainingProjects\\nodejs-course\\public\\img\\2022-02-16T13-42-19-book-1.jpg',
      size: 28890
    } */

    const {books} = store;

    let fileCover = req.body.fileCover,
        fileName = req.body.fileName,
        fileBook = req.body.fileBook;

    if (req.file) {
      console.log('Need delete Old file : ', fileBook);
      fileMiddleware.delete(fileBook);
      fileBook = req.file.filename; // file path: '2022-02-16T13-42-19-book-1.jpg'
      console.log(fileBook);

      // fileCover = fileBook.split('.').pop().join('.');

      fileBookParts = fileBook.split('.');
      fileBookParts.pop();
      fileCover = fileBookParts.join('.');
      fileName = `${(new Date().toISOString().replace(/:/g, '-')).slice(0, -5)}-${fileCover}`;
      console.log('fileCover / fileName : ', fileCover, fileName);
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
      res.redirect(`/books/${id}`);
    } else {
      res.status(404).redirect('/404');
    }
  }
);

router.post('/delete/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  // console.log('File Book deleted : ', books[idx]['fileBook']);

  if (idx !== -1) {
    fileMiddleware.delete(books[idx]['fileBook']);
    books.splice(idx, 1);
    res.redirect(`/books`);
  } else {
    res.status(404).redirect('/404');
  }
});

module.exports = router;
