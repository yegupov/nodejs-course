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

## Task 1 for the lesson «2.1 Express»
Develop a CRUD API to work with the "book" entity. Each book instance must contain the following data structure:  
`{  
  id: "string",  
  title: "string",  
  description: "string",  
  authors: "string",  
  favorite: "string",  
  fileCover: "string",  
  fileName: "string",  
  fileBook: "string"  
}`

## Task 2 for the lesson «2.2 Middleware»
Update the project's routing structure using express.Router().  
Install the **multer** package in the project and create a middleware for loading the book file. Connect and process the created Middleware in the routes for creating data about the book.  
Create a route GET: /api/books/:id/download The method sends a book file for download by its **:id**

## Task 3 for the lesson «2.3 EJS»
Install the ejs template engine in the project  
Develop a multi-page interface for working with the "book" entity using the ejs template engine.

Templates:  
- index - просмотр списка всех книг (вывод заголовков);
- view - информация по конкретной книге;
- create - создание книги;
- update - редактирование книги.

Follow the step-by-step instructions to publish the project from task 2 on Heroku.
