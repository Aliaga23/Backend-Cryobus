const { pool } = require('../db');

const getAllRoles = async () => {
  try {
    const result = await pool.query('SELECT * FROM ROL');
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRoles
};
