const { pool } = require('../db');

const getUbicaciones = async () => {
  const [rows] = await pool.query('SELECT * FROM UBICACION');
  return rows;
};

const createUbicacion = async (ubicacion) => {
  const { id, nombre } = ubicacion;
  const result = await pool.query('INSERT INTO UBICACION (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  return result[0];
};

const updateUbicacion = async (id, ubicacion) => {
  const { nombre } = ubicacion;
  const result = await pool.query('UPDATE UBICACION SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  return result[0];
};

const deleteUbicacion = async (id) => {
  const result = await pool.query('DELETE FROM UBICACION WHERE ID = ?', [id]);
  return result[0];
};

module.exports = {
  getUbicaciones,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion,
};
