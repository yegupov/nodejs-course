const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const bcrypt         = require('bcryptjs') // Проверка и шифрование пароля
const User           = require('../../models/user');

// router.get('/',
//   function (req, res) {
//     res.render('home', { user: req.user })
//   }
// )

router.get('/login',
  (req, res) => {
    if (req.isAuthenticated()) console.log('User Authenticated');
    else console.log('User Not Authenticated');

    console.log('Session :', req.session);
    console.log('Req flash :', req.flash);

    res.render('user/login', {
      title: "Log in",
      messages: {
        success_msg: req.flash('success_msg'),
        error: req.flash('error')
      }
    })
  }
)

router.post('/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: '/api/user/login',
      failureFlash: true
    },
  ),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/api/books')
  }
)

router.get(
  '/signup',
  (req, res) => {
    res.render('user/signup', {
      title: "Sign up"
    })
  }
)

// CREATE and Save new user
router.post('/signup',
  async (req, res) => {
    console.log("New User - req.user : ", req.body)

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const {username, displayName} = req.body
      // const hashedPassword = req.body.password + '_hash'
      const emails = [{ value: req.body.email }]

      const newUser = new User({
        username,
        displayName,
        password: hashedPassword,
        emails
      })
      console.log('newUser : ', newUser)

      await newUser.save()

      req.flash(
        'success_msg',
        'You are now registered and can log in'
      )

      res.redirect('/api/user/login')

    } catch (e) {
      console.error(e)
      res.status(500).json()
      res.redirect('/api/user/signup')
    }
  }
)

router.get('/logout',
  function (req, res) {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/api/user/login')
  }
)

router.get('/profile',
  function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect('/api/user/login')
    }
    next()
  },
  function (req, res) {
    res.render('user/profile', {
      user: req.user,
      title: "My profile"
    })
  }
)

module.exports = router;
