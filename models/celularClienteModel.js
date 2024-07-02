const { pool } = require('../db');

const getCelularesByCliente = async (codigoCliente) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CELULARCLIENTE WHERE CODIGOCLIENTE = ?', [codigoCliente]);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCelular = async (codigoCliente, numero) => {
  try {
    await pool.query('INSERT INTO CELULARCLIENTE (CODIGOCLIENTE, NUMERO) VALUES (?, ?)', [codigoCliente, numero]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCelular = async (codigoCliente, numero) => {
  try {
    await pool.query('DELETE FROM CELULARCLIENTE WHERE CODIGOCLIENTE = ? AND NUMERO = ?', [codigoCliente, numero]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCelularesByCliente,
  createCelular,
  deleteCelular
};
