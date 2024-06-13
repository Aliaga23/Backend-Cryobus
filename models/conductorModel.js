const { pool } = require('../db');

const getAllConductores = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM CONDUCTOR');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createConductor = async (conductor) => {
  const { codigo, apellidos, nombres } = conductor;
  try {
    await pool.query('INSERT INTO CONDUCTOR (CODIGO, APELLIDOS, NOMBRES) VALUES (?, ?, ?)', [codigo, apellidos, nombres]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateConductor = async (codigo, conductor) => {
  const { apellidos, nombres } = conductor;
  try {
    await pool.query('UPDATE CONDUCTOR SET APELLIDOS = ?, NOMBRES = ? WHERE CODIGO = ?', [apellidos, nombres, codigo]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteConductor = async (codigo) => {
  try {
    await pool.query('DELETE FROM CONDUCTOR WHERE CODIGO = ?', [codigo]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllConductores,
  createConductor,
  updateConductor,
  deleteConductor
};
