const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const flash = require('connect-flash');

//sesion
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');

const passport = require('passport');

//initializations
const app = express();
require('./lib/passport')

//setting
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, './views'))
//configurar plantilla hbs
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
//-middleware que guarda las sesiones en el servidor o en la db
app.use(session({
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database),
}));
//-midleware para enviar mensages a treavez de distintas vistas
app.use(flash());

app.use(morgan('dev'));
//-para haceptar los datos desde el formulario, datos en string
app.use(express.urlencoded({ extended: false }));
//-haceptar datos en formato json
app.use(express.json());

//-iniciar password
app.use(passport.initialize())
app.use(passport.session())


//global variables
app.use((req, res, next) => {
  // toma el menssage agregado y lo hace disponible en todas mis vistas
  app.locals.success = req.flash('success');
  next();
});

//routes
app.use(require('./routes/index'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))
//public
app.use(express.static(path.join(__dirname, './public')));

//starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
/* https://www.youtube.com/watch?v=qJ5R9WTW0_E&t=253s */