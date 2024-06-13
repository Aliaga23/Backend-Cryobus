const { pool } = require('../db');

const getAllTipoPaquetes = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM TIPOPAQUETE');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTipoPaqueteById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TIPOPAQUETE WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTipoPaquete = async (tipoPaquete) => {
  const { id, nombre } = tipoPaquete;
  try {
    await pool.query('INSERT INTO TIPOPAQUETE (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTipoPaquete = async (id, tipoPaquete) => {
  const { nombre } = tipoPaquete;
  try {
    await pool.query('UPDATE TIPOPAQUETE SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTipoPaquete = async (id) => {
  try {
    await pool.query('DELETE FROM TIPOPAQUETE WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTipoPaquetes,
  getTipoPaqueteById,
  createTipoPaquete,
  updateTipoPaquete,
  deleteTipoPaquete,
};
