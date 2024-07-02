const { pool } = require('../db');

const getAllReembolsos = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM REEMBOLSO');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createReembolso = async (nro, motivo) => {
  try {
    await pool.query('INSERT INTO REEMBOLSO (NRO, MOTIVO) VALUES (?, ?)', [nro, motivo]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReembolso = async (nro, motivo) => {
  try {
    await pool.query('UPDATE REEMBOLSO SET MOTIVO = ? WHERE NRO = ?', [motivo, nro]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReembolso = async (nro) => {
  try {
    await pool.query('DELETE FROM REEMBOLSO WHERE NRO = ?', [nro]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllReembolsos,
  createReembolso,
  updateReembolso,
  deleteReembolso
};
