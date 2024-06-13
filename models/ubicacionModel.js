// models/ubicacionModel.js
const { pool } = require('../db');

const getAllUbicaciones = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM DIRECCION');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUbicacionById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM DIRECCION WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUbicacion = async (ubicacion) => {
  const { id, descripcion, nombreDepartamento, nombreLocalidad } = ubicacion;
  try {
    await pool.query('INSERT INTO DIRECCION (ID, DESCRIPCION, NOMBREDEPARTAMENTO, NOMBRELOCALIDAD) VALUES (?, ?, ?, ?)', [id, descripcion, nombreDepartamento, nombreLocalidad]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUbicacion = async (id, ubicacion) => {
  const { descripcion, nombreDepartamento, nombreLocalidad } = ubicacion;
  try {
    await pool.query('UPDATE DIRECCION SET DESCRIPCION = ?, NOMBREDEPARTAMENTO = ?, NOMBRELOCALIDAD = ? WHERE ID = ?', [descripcion, nombreDepartamento, nombreLocalidad, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUbicacion = async (id) => {
  try {
    await pool.query('DELETE FROM DIRECCION WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUbicaciones,
  getUbicacionById,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion
};
