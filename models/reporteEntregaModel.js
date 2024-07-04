// backend/models/notaEntregaModel.js
const { pool } = require('../db');

const getAllNotasEntrega = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA ORDER BY NRO ASC');
  return rows;
};

module.exports = {
  getAllNotasEntrega,
};
