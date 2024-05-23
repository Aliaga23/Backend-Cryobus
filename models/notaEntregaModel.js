// models/notaEntregaModel.js
const { pool } = require('../db');

const getAllNotasEntrega = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const getNotaEntregaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA WHERE NRO = ?', [id]);
  return rows[0];
};

const createNotaEntrega = async (notaEntrega) => {
  const result = await pool.query('INSERT INTO NOTAENTREGA SET ?', notaEntrega);
  return result[0].insertId;
};

const updateNotaEntrega = async (id, notaEntrega) => {
  await pool.query('UPDATE NOTAENTREGA SET ? WHERE NRO = ?', [notaEntrega, id]);
};

const deleteNotaEntrega = async (id) => {
  await pool.query('DELETE FROM NOTAENTREGA WHERE NRO = ?', [id]);
};

module.exports = {
  getAllNotasEntrega,
  getNotaEntregaById,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
