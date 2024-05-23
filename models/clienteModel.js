// models/clienteModel.js
const { pool } = require('../db');

const getClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM CLIENTE');
  return rows;
};

const getClienteById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM CLIENTE WHERE CODIGO = ?', [id]);
  return rows[0];
};

const createCliente = async (cliente) => {
  const { codigo, ci, complementoci, apellidos, nombres, direccion } = cliente;
  const result = await pool.query('INSERT INTO CLIENTE (CODIGO, CI, COMPLEMENTOCI, APELLIDOS, NOMBRES, DIRECCION) VALUES (?, ?, ?, ?, ?, ?)', [codigo, ci, complementoci, apellidos, nombres, direccion]);
  return result[0];
};

const updateCliente = async (id, cliente) => {
  const { ci, complementoci, apellidos, nombres, direccion } = cliente;
  const result = await pool.query('UPDATE CLIENTE SET CI = ?, COMPLEMENTOCI = ?, APELLIDOS = ?, NOMBRES = ?, DIRECCION = ? WHERE CODIGO = ?', [ci, complementoci, apellidos, nombres, direccion, id]);
  return result[0];
};

const deleteCliente = async (id) => {
  const result = await pool.query('DELETE FROM CLIENTE WHERE CODIGO = ?', [id]);
  return result[0];
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
