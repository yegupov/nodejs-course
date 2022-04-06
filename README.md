# Library app (Node.js)
Node.js App «Library»: Express.js, Ejs-templating, Multer (upload and delete files).  
View app on Heroku: [`nodexpress-libraryapp`](https://nodexpress-libraryapp.herokuapp.com/)

Netology course: [`Backend-разработка на Node.js`](https://netology.ru/programs/nodejs)  
13.01.2022 - 14.07.2022  
Author: Gennady Yegupov  
My tasks solutions Netology course: [`nodejs-course`](https://github.com/yegupov/nodejs-course/tree/master)

![library-gif-1](https://user-images.githubusercontent.com/44179657/154436316-3eb8645b-8b98-429a-b110-9b235e5a7002.gif)

## Run App
Insert into console:  
`npm run dev`

## Task for the lesson «2.6 База данных и хранение данных»

### Insert
**Вставить одну книгу**

`db.books.insertOne(
  {
    title: "Book 1",
    description: "Description book 1",
    authors: "Author 1"
  }
)`

**Вставить две книги**

`db.books.insertMany([
  {
    title: "Book 1",
    description: "Description book 1",
    authors: "Author 1"
  },
  {
    title: "Book 2",
    description: "Description book 2",
    authors: "Author 2"
  }
])`

### Find
`db.books.find({
  title: "Book 2"
} )`

### Update
`db.books.updateOne(
  { _id: "001" },
  { $set: {
    description: "New book description",
    authors: "Author and other"
  } }
)`

## Methods
| Method | Url             | Action                        | Comment                                                        |
| ------ | --------------- | ----------------------------- | -------------------------------------------------------------- |
| POST	 | /api/user/login | авторизация пользователя      | метод всегда возвращает **Code: 201** и статичный объект: { id: 1, mail: "test@mail.ru" } |
| GET	   | /api/books	     | получить все книги	           | получаем массив всех книг                                      |
| GET    | /api/books/:id  | получить книгу по **id**      | получаем объект книги, если запись не найдено вернем **Code: 404** |
| POST   | /api/books      | создать книгу	               | создаем книги и возврашаем ее же вместе с присвоенным **id**   |
| PUT    | /api/books/:id  | редактировать книгу по **id** | редактируем объект книги, если запись не найдено вернем **Code: 404** |
| DELETE | /api/books/:id  | удалить книгу по **id**    	 | удаляем книгу и возвращаем ответ: **'ok'**                     |
| GET    | /api/books/:id/download  | скачать файл книги по **id** | метод отдает на скачиваение файл книги по ее **:id**   |
