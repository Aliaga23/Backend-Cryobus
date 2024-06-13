const { pool } = require('../db');

const getAllEstadosEntrega = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ESTADOENTREGA');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEstadoEntregaById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ESTADOENTREGA WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEstadoEntrega = async (estadoEntrega) => {
  const { id, nombre } = estadoEntrega;
  try {
    await pool.query('INSERT INTO ESTADOENTREGA (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateEstadoEntrega = async (id, estadoEntrega) => {
  const { nombre } = estadoEntrega;
  try {
    await pool.query('UPDATE ESTADOENTREGA SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEstadoEntrega = async (id) => {
  try {
    await pool.query('DELETE FROM ESTADOENTREGA WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllEstadosEntrega,
  getEstadoEntregaById,
  createEstadoEntrega,
  updateEstadoEntrega,
  deleteEstadoEntrega,
};
