module.exports = {
  // metodo para proteger rutas si no esta logeado
  isLoggedIn(req, res, next) {
    //method isAuthenticate: devuelve true si el usuario existe
    if (req.isAuthenticated()) {
      //si existe el usuario continuar
      return next()
    }
    //si no existe el usuario
    res.redirect('/signin');
  },

  //proteger rutas si esta logueado
  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      //si no esta autenticado continuar
      return next();
    }
    //si esta autenticado
    return res.redirect('/profile');
  }
}