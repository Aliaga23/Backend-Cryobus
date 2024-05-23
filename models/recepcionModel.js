// models/recepcionModel.js
const { pool } = require('../db');

const getRecepciones = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const getRecepcionById = async (nro) => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA WHERE NRO = ?', [nro]);
  return rows[0];
};

const createRecepcion = async (recepcion) => {
  const [result] = await pool.query('INSERT INTO NOTAENTREGA SET ?', [recepcion]);
  return result;
};

const updateRecepcion = async (nro, recepcion) => {
  const [result] = await pool.query('UPDATE NOTAENTREGA SET ? WHERE NRO = ?', [recepcion, nro]);
  return result;
};

const deleteRecepcion = async (nro) => {
  const [result] = await pool.query('DELETE FROM NOTAENTREGA WHERE NRO = ?', [nro]);
  return result;
};

const getClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM CLIENTE');
  return rows;
};

const getPaquetes = async () => {
  const [rows] = await pool.query('SELECT * FROM PAQUETE');
  return rows;
};

module.exports = {
  getRecepciones,
  getRecepcionById,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion,
  getClientes,
  getPaquetes,
};
