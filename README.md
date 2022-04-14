# Library app (Node.js)
Node.js App «Library»: Express.js, Ejs-templating, Multer (upload and delete files).  
View app on Heroku: [`nodexpress-libraryapp`](https://nodexpress-libraryapp.herokuapp.com/)

Netology course: [`Backend-разработка на Node.js`](https://netology.ru/programs/nodejs)  
13.01.2022 - 14.07.2022  
Author: Gennady Yegupov  
My tasks solutions Netology course: [`nodejs-course`](https://github.com/yegupov/nodejs-course/tree/master)

![library-gif-1](https://user-images.githubusercontent.com/44179657/154436316-3eb8645b-8b98-429a-b110-9b235e5a7002.gif)

## Quick Start
To run this app, clone the repository and install dependencies:

```
$ git clone https://github.com/yegupov/nodejs-course.git
$ cd nodejs-course
$ npm install
```

Then start the server:  
`$ docker-compose up`

Navigate to: [`http://localhost:3000`](http://localhost:3000).  
Mongo Express to: [`http://localhost:8081`](http://localhost:8081/).

## Task for the lesson «2.8 Аутентификация. PassportJS»

1. Реализуйте API:

```
GET /api/user/login      страница с формой входа / регистрации
GET /api/user/profile         страница профиля
POST /api/user/login
POST /api/user/signup
```
2. Настройте локальную аутентификацию с помощью PassportJS.
