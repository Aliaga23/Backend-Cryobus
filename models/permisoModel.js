// models/permisoModel.js
const { pool } = require('../db');

const getAllPermisos = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM PERMISO');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPermisoById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM PERMISO WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPermiso = async (permiso) => {
  const { id, nombre } = permiso;
  try {
    await pool.query('INSERT INTO PERMISO (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePermiso = async (id, permiso) => {
  const { nombre } = permiso;
  try {
    await pool.query('UPDATE PERMISO SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePermiso = async (id) => {
  try {
    await pool.query('DELETE FROM PERMISO WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
};