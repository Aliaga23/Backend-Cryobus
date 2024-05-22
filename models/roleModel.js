const { pool } = require('../db');

const getAllRoles = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROL');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRoles
};
