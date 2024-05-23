// models/userModel.js
const { pool } = require('../db');
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (user) => {
  const { id, apellidos, nombres, contra, idRol } = user;
  const hashedPassword = await bcrypt.hash(contra, 10);
  try {
    await pool.query('INSERT INTO USUARIO (ID, CONTRA, APELLIDOS, NOMBRES, IDROL) VALUES (?, ?, ?, ?, ?)', [id, hashedPassword, apellidos, nombres, idRol]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, user) => {
  const { apellidos, nombres, contra, idRol } = user;
  const hashedPassword = await bcrypt.hash(contra, 10);
  try {
    await pool.query('UPDATE USUARIO SET CONTRA = ?, APELLIDOS = ?, NOMBRES = ?, IDROL = ? WHERE ID = ?', [hashedPassword, apellidos, nombres, idRol, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query('DELETE FROM USUARIO WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
