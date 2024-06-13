const { pool } = require('../db');

const getTiposCamion = async () => {
  const [rows] = await pool.query('SELECT * FROM TIPOCAMION');
  return rows;
};

const getTipoCamionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM TIPOCAMION WHERE ID = ?', [id]);
  return rows[0];
};

const createTipoCamion = async (tipoCamion) => {
  const { id, nombre } = tipoCamion;
  const result = await pool.query('INSERT INTO TIPOCAMION (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  return result[0];
};

const updateTipoCamion = async (id, tipoCamion) => {
  const { nombre } = tipoCamion;
  const result = await pool.query('UPDATE TIPOCAMION SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  return result[0];
};

const deleteTipoCamion = async (id) => {
  const result = await pool.query('DELETE FROM TIPOCAMION WHERE ID = ?', [id]);
  return result[0];
};

module.exports = {
  getTiposCamion,
  getTipoCamionById,
  createTipoCamion,
  updateTipoCamion,
  deleteTipoCamion,
};
