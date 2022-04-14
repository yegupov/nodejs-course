const express                 = require('express')
const app                     = express()
const flash                   = require('connect-flash')  // Сообщения, которые сохраняются в сессии и доступны в обработчике маршрута, на который выполняется следующий переход
const session                 = require('express-session') // Создает middleware для обработки сессий
const bodyParser              = require("body-parser") // удобный парсинг входящих пар-ров, которые мы будем обрабатывать в коде на стороне бэкенда
const passport                = require('passport') // защита роутов и поддержка авторизации в определенных эндпоинтах
const mongoose                = require('mongoose') // пакет для эффективной работы с MongoDB - специальная ODM-библиотека для работы с MongoDB, которая позволяет сопоставлять объекты классов и документы коллекций из базы данных
const initializePassport      = require('./config/passport')
const errorMiddleware         = require('./middleware/error')
const frontRouter             = require('./routes/index')
const userApiRouter           = require('./routes/api/user')
const booksApiRouter          = require('./routes/api/books')
const socket                  = require('socket.io')

const PORT = process.env.PORT || 3000
const UserDB = process.env.DB_USERNAME || 'root'
const PasswordDB = process.env.DB_PASSWORD || 'qwerty123'
const NameDB = process.env.DB_NAME || 'library_db'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

// Passport Config
initializePassport(passport)

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use('/public', express.static(__dirname+"/public"))
app.use(session({
  secret: process.env.COOKIE_SECRET || 'verygoodsecret',
  resave: false,                                     // don't save session if unmodified
  saveUninitialized: false,                          // don't create session until something stored
}))
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// Connect flash messages
app.use(flash());

// Routes
app.use('/', frontRouter)
app.use('/api/books', booksApiRouter)
app.use('/api/user', userApiRouter)

app.use(errorMiddleware)

async function start() {
  try {

    await mongoose.connect(HostDb, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      // Socket
      const io = socket(server)
      io.on('connection', (socket) => {
          const {id} = socket;
          console.log(`Socket connected: ${id}`);

          // Recieve event - сообщение для всех
          socket.on('comment', (data) => {
            console.log('Comment data : ', data);
            // data.time = Date()
            socket.broadcast.emit('comment', data)
          })

          // socket.on('typing', (data) => {
          //   socket.broadcast.emit('typing', data)
          // })

          // socket.on('message-to-all', (author, msg) => {
          //   console.log(`Server msg: ${author}, ${message}`);
          //   msg.type = 'all';
          //   socket.broadcast.emit('message-to-all', msg);
          //   socket.emit('message-to-all', msg);
          // });

          socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
          });
      });

    })
  } catch (e) {
    console.log(e);
  }
}

start();
