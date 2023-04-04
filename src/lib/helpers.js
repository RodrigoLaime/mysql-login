const bcrypt = require('bcryptjs');
const helpers = {};

//generar un cifrado para el primer logueo
helpers.encryptPassword = async (password) => {
  //genera un patron un has
  const salt = await bcrypt.genSalt(10);
  //pasamos la contraseña y el patron para que sifre la contraseña
  const hash = await bcrypt.hash(password, salt);
  return hash
};

//comparar la contraseña de logueo con la contraseña cifrada de la db
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error);
  }
}

module.exports = helpers;