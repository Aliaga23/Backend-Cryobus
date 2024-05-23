// models/notaEntregaModel.js
const { pool } = require('../db');

const getNotasEntrega = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const getNotaEntregaById = async (nro) => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA WHERE NRO = ?', [nro]);
  return rows[0];
};

const createNotaEntrega = async (notaEntrega) => {
  const [result] = await pool.query('INSERT INTO NOTAENTREGA SET ?', [notaEntrega]);
  return result;
};

const updateNotaEntrega = async (nro, notaEntrega) => {
  const [result] = await pool.query('UPDATE NOTAENTREGA SET ? WHERE NRO = ?', [notaEntrega, nro]);
  return result;
};

const deleteNotaEntrega = async (nro) => {
  const [result] = await pool.query('DELETE FROM NOTAENTREGA WHERE NRO = ?', [nro]);
  return result;
};

module.exports = {
  getNotasEntrega,
  getNotaEntregaById,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
