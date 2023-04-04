const express = require('express');
const router = express.Router();
/* const pool = require('../database'); */

//connecion a la base de datos
const pool = require('../database')
//para proteger rutas
const { isLoggedIn } = require('../lib/auth');

//agregar datos
router.get('/add', isLoggedIn, (req, res) => {
  res.render('../views/links/add.hbs')
});


//ejemplo de consulta get que devuelve un json()
router.get('/data', async (req, res) => {
  const sql = 'SELECT * FROM links';
  await pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
})
//para ver los links relacionados con un usuario
router.get('/linkss/:id', async (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT links.*, users.username AS nombre_usuario, users.password AS password_usuario FROM links JOIN users ON links.user_id = users.id WHERE links.user_id = ?';
  await pool.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
})

//CREAR
router.post('/add', isLoggedIn, async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id,
  };
  //metodo para pasar el dato a la db usarlo con async
  await pool.query('INSERT INTO links set ?', [newLink]);
  //para verificar si se guardo y dar mensaje
  req.flash('success', 'Link add successfully');
  res.redirect('/links');
});

//OBTENER
router.get('/', isLoggedIn, async (req, res) => {
  //consulta y devuelve todos los datos de la db que esten relacionados con el id del usuario
  const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
  res.render('../views/links/list.hbs', { links });
});

//ELIMINAR
router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM  links WHERE id = ?', [id]);
  req.flash('success', 'Link remove successfully');
  res.redirect('/links')
});

//EDITAR
router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const link = await pool.query('SELECT * FROM  links WHERE id = ?', [id]);
  //renderizar la bista edit y le pasamos los datos correspondiente
  res.render('links/edit', { link: link[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;

  const newLink = {
    title,
    url,
    description,
  };
  req.flash('success', 'Link update successfully');
  // actualizar con el nuevo 'conjunto de datos' y que coninsida con el 'id'
  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  res.redirect('/links')
})


module.exports = router;