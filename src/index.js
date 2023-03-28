const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

//initializations

const app = express();

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
app.use(morgan('dev'));
//para haceptar los datos desde el formulario, datos en string
app.use(express.urlencoded({ extended: false }));
// haceptar datos en formato json
app.use(express.json());

//global variables
app.use((req, res, next) => {
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