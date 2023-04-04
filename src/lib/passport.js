const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//para realizar consultas a la db
const pool = require('../database');
//para cifrar contraseña
const helpers = require('../lib/helpers');

//signin
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  console.log(req.body);

  // consultar si existe un usuario
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  //si devuelve muchas filas o encuentra un usuario
  if (rows.length > 0) {
    //guardar usuario en variable
    const user = rows[0];
    //validar contraseña, compara contraseñas
    const validPassword = await helpers.matchPassword(password, user.password);
    //si la contraseña coinside
    if (validPassword) {
      //termina con el proceso, error en null le pasamos el user un mensaje flash
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'incorrect password'));
    }
    //si no encuentra un usuario
  } else {
    return done(null, false, req.flash('message', 'The userName does not exist'))
  }

}))


//signup
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

  //cifrar contraseña
  newUser.password = await helpers.encryptPassword(password);

  //en user agregar el nuevo usuario
  const result = await pool.query('INSERT INTO users SET ?', [newUser]);
  //le pasamos el id del resultado a newUser
  newUser.id = result.insertId;
  //donde va a continuar despues de recivir la respuesta
  return done(null, newUser);
}));


//serializando los datos en memoria
//serialize: se guarda el id del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserialize: optiene el id guardado para obtener los datos
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  //null para el error y retorna del rows el indice 0
  done(null, rows[0]);
})