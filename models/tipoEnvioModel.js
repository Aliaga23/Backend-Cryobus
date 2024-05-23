// models/tipoEnvioModel.js
const { pool } = require('../db');

const getAllTipoEnvios = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM TIPOENVIO');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTipoEnvioById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TIPOENVIO WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTipoEnvio = async (tipoEnvio) => {
  const { id, nombre } = tipoEnvio;
  try {
    await pool.query('INSERT INTO TIPOENVIO (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTipoEnvio = async (id, tipoEnvio) => {
  const { nombre } = tipoEnvio;
  try {
    await pool.query('UPDATE TIPOENVIO SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTipoEnvio = async (id) => {
  try {
    await pool.query('DELETE FROM TIPOENVIO WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTipoEnvios,
  getTipoEnvioById,
  createTipoEnvio,
  updateTipoEnvio,
  deleteTipoEnvio,
};
