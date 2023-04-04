## npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport timeago.js connect-flash
 
 express //modulo del backend
 express-handlebars //notor de plantilla
 express-session
 mysql 
 express-mysql-session //permite guardar la sesion dentro de la base de datos
 morgan //permite mostrar las peticiones http por consola
 bcryptjs //sifra las contraseñas
 passport //para la autenticacion
 timeago.js //permite manejas las fechas
 connect-flash //para enviar mensaje entre multiples vistas
 express-validator //valida los datos que nos envia el usuario
 
## falto instalar
npm i passport-local


en el caso de que no te tome el root o la contrasaña en mysql agregar 
<!-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password'; -->
esto cambia la contraseña de mysql