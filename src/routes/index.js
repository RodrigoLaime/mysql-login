const express = require('express');
const { isNotLoggedIn } = require('../lib/auth')
const router = express.Router();

router.get('/', isNotLoggedIn, (req, res) => {
  res.render('index');
})

module.exports = router;