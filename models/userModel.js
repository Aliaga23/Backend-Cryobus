const { pool } = require('../db');

const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM USUARIO');
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM USUARIO WHERE ID = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };


module.exports = {
  getAllUsers,
  getUserById,
 
};
