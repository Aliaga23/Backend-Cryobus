// models/paqueteModel.js
const { pool } = require('../db');

const getPaquetes = async () => {
  const [rows] = await pool.query('SELECT * FROM PAQUETE');
  return rows;
};

const getPaqueteById = async (codigo) => {
  const [rows] = await pool.query('SELECT * FROM PAQUETE WHERE CODIGO = ?', [codigo]);
  return rows[0];
};

const createPaquete = async (paquete) => {
  const { codigo } = paquete;
  const result = await pool.query('INSERT INTO PAQUETE (CODIGO) VALUES (?)', [codigo]);
  return result[0];
};

const updatePaquete = async (codigo, paquete) => {
  const result = await pool.query('UPDATE PAQUETE SET CODIGO = ? WHERE CODIGO = ?', [paquete.codigo, codigo]);
  return result[0];
};

const deletePaquete = async (codigo) => {
  const result = await pool.query('DELETE FROM PAQUETE WHERE CODIGO = ?', [codigo]);
  return result[0];
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
};
