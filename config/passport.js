const LocalStrategy         = require('passport-local').Strategy // Паспорт cтратегия для аутентификации с помощью имени пользователя и пароля
const bcrypt                = require('bcryptjs') // Проверка и шифрование пароля
// const db = require('../db')
const User                  = require('../models/user');
const options               = {
                              usernameField: 'username',
                              passwordField: 'password',
                              passReqToCallback: false,
                            }

// Authenticate User
function verify (username, password, done) {
  console.log('User Verify - Username : ', username);
  User.findOne({ username: username }, async (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, {message: 'No user with that Username'}) }

    // if (!db.users.verifyPassword(user, password)) { return done(null, false) }
    // `user` будет сохранен в `req.user`
    // return done(null, user)

    // Match password
    try {
      if (await bcrypt.compare(password, user.password)) {
      // if (password === user.password) {
        // `user` будет сохранен в `req.user`
        return done(null, user)
      }
      else return done(null, false, {message: 'Password incorrect'})
    } catch (e) {
      return done(e)
    }
  })
}

function initialize(passport) {
  //  Добавление стратегии для использования
  passport.use('local', new LocalStrategy(options, verify))

  // Конфигурирование Passport для сохранения пользователя в сессии
  passport.serializeUser( (user, done) => done(null, user.id) )

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
  		if (err) { return done(err) }
      done(err, user);
  	})
  })
}

module.exports = initialize
