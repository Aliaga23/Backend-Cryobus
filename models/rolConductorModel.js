// models/rolConductorModel.js
const { pool } = require('../db');

const getAllRolConductors = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROLCONDUCTOR');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRolConductorById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROLCONDUCTOR WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createRolConductor = async (rolConductor) => {
  const { id, rol } = rolConductor;
  try {
    await pool.query('INSERT INTO ROLCONDUCTOR (ID, ROL) VALUES (?, ?)', [id, rol]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRolConductor = async (id, rolConductor) => {
  const { rol } = rolConductor;
  try {
    await pool.query('UPDATE ROLCONDUCTOR SET ROL = ? WHERE ID = ?', [rol, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRolConductor = async (id) => {
  try {
    await pool.query('DELETE FROM ROLCONDUCTOR WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRolConductors,
  getRolConductorById,
  createRolConductor,
  updateRolConductor,
  deleteRolConductor,
};
