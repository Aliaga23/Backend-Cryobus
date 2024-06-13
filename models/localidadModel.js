const { pool } = require('../db');

const getLocalidades = async () => {
  const [rows] = await pool.query('SELECT * FROM LOCALIDAD');
  return rows;
};

const createLocalidad = async (localidad) => {
  const { nombre, nombreDepartamento } = localidad;
  const result = await pool.query('INSERT INTO LOCALIDAD (NOMBRE, NOMBREDEPARTAMENTO) VALUES (?, ?)', [nombre, nombreDepartamento]);
  return result[0];
};

const updateLocalidad = async (nombre, nombreDepartamento, localidad) => {
  const { nuevoNombre, nuevoNombreDepartamento } = localidad;
  const result = await pool.query('UPDATE LOCALIDAD SET NOMBRE = ?, NOMBREDEPARTAMENTO = ? WHERE NOMBRE = ? AND NOMBREDEPARTAMENTO = ?', [nuevoNombre, nuevoNombreDepartamento, nombre, nombreDepartamento]);
  return result[0];
};

const deleteLocalidad = async (nombre, nombreDepartamento) => {
  const result = await pool.query('DELETE FROM LOCALIDAD WHERE NOMBRE = ? AND NOMBREDEPARTAMENTO = ?', [nombre, nombreDepartamento]);
  return result[0];
};

module.exports = {
  getLocalidades,
  createLocalidad,
  updateLocalidad,
  deleteLocalidad,
};
