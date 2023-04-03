const express = require('express');
const router = express.Router();

//connecion a la base de datos
const pool = require('../database')

router.get('/add', (req, res) => {
  res.render('../views/links/add.hbs')
});

//CREAR
router.post('/add', async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  //metodo para pasar el dato a la db usarlo con async
  await pool.query('INSERT INTO links set ?', [newLink]);
  //para verificar si se guardo y dar mensaje
  req.flash('success', 'Link add successfully');
  res.redirect('/links');
});

//OBTENER
router.get('/', async (req, res) => {
  const links = await pool.query('SELECT * FROM links');
  res.render('../views/links/list.hbs', { links });
});

//ELIMINAR
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM  links WHERE id = ?', [id]);
  req.flash('success', 'Link remove successfully');
  res.redirect('/links')
});

//EDITAR
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const link = await pool.query('SELECT * FROM  links WHERE id = ?', [id]);
  //renderizar la bista edit y le pasamos los datos correspondiente
  res.render('links/edit', { link: link[0] });
});

router.post('/edit/:id', async (req, res) => {
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