// models/loginModel.js
const { pool } = require('../db');

const getUserById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserById,
};
