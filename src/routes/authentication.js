const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')


//ruta para registrar un usuario
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup')
});


router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}))

//loguear un usuario
router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    //para poder enviar mensages a la vista
    failureFlash: true,
  })(req, res, next);
})

//perfil del usuario: proteger ruta con isLoggedIn
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('../views/profile.hbs')
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  //passport nos da un metodo para cerrar sesion logout
  req.logOut(req.user, err => {
    if (err) return next(err);
    res.redirect('/signin');
  });
});

module.exports = router;