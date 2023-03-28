const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('database connection failed')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('database has many connections')
    }
    if (err.code === 'ECONNREFUSED') {
      console.err('databse connection was refused')
    }
  }
  if (connection) connection.release();
  console.log('BD is connected');
  return;
});

//permite que cada ves que se consulte a la base de datos se pueda usar async await o promesas _ convierte en promsas lo que antes era callback
pool.query = promisify(pool.query);

module.exports = pool;