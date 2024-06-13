// models/roleModel.js
const { pool } = require('../db');

const getAllRoles = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROL');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoleById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROL WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createRole = async (role) => {
  const { id, nombre } = role;
  try {
    await pool.query('INSERT INTO ROL (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRole = async (id, role) => {
  const { nombre } = role;
  try {
    await pool.query('UPDATE ROL SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRole = async (id) => {
  try {
    await pool.query('DELETE FROM ROL WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};