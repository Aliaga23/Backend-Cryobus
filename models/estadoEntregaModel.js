// models/estadoEntregaModel.js
const { pool } = require('../db');

const getAllEstadosEntrega = async () => {
  const [rows] = await pool.query('SELECT * FROM ESTADOENTREGA');
  return rows;
};

const getEstadoEntregaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ESTADOENTREGA WHERE ID = ?', [id]);
  return rows[0];
};

const createEstadoEntrega = async (estadoEntrega) => {
  const result = await pool.query('INSERT INTO ESTADOENTREGA SET ?', estadoEntrega);
  return result[0].insertId;
};

const updateEstadoEntrega = async (id, estadoEntrega) => {
  await pool.query('UPDATE ESTADOENTREGA SET ? WHERE ID = ?', [estadoEntrega, id]);
};

const deleteEstadoEntrega = async (id) => {
  await pool.query('DELETE FROM ESTADOENTREGA WHERE ID = ?', [id]);
};

module.exports = {
  getAllEstadosEntrega,
  getEstadoEntregaById,
  createEstadoEntrega,
  updateEstadoEntrega,
  deleteEstadoEntrega,
};
