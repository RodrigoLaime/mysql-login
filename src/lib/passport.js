const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//para realizar consultas a la db
const pool = require('database');

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { fullname } = req.body;
  const newUser = {
    username,
    password,
    fullname
  };
  //en user agregar el nuevo usuario
  await pool.query('INSERT INTO users SET ?', [newUser]);
}));

/* passport.serializeUser((usr, done) => {
  d
})
 */