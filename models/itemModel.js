// models/itemModel.js
const { pool } = require('../db');

const getItems = async () => {
  const [rows] = await pool.query('SELECT * FROM ITEM');
  return rows;
};

const getItemById = async (codigoPaquete, nro) => {
  const [rows] = await pool.query('SELECT * FROM ITEM WHERE CODIGOPAQUETE = ? AND NRO = ?', [codigoPaquete, nro]);
  return rows[0];
};

const createItem = async (item) => {
  const { codigopaquete, nro, descripcion, pesoindividual } = item;
  const result = await pool.query('INSERT INTO ITEM (CODIGOPAQUETE, NRO, DESCRIPCION, PESOINDIVIDUAL) VALUES (?, ?, ?, ?)', [codigopaquete, nro, descripcion, pesoindividual]);
  return result[0];
};

const updateItem = async (codigoPaquete, nro, item) => {
  const { descripcion, pesoindividual } = item;
  const result = await pool.query('UPDATE ITEM SET DESCRIPCION = ?, PESOINDIVIDUAL = ? WHERE CODIGOPAQUETE = ? AND NRO = ?', [descripcion, pesoindividual, codigoPaquete, nro]);
  return result[0];
};

const deleteItem = async (codigoPaquete, nro) => {
  const result = await pool.query('DELETE FROM ITEM WHERE CODIGOPAQUETE = ? AND NRO = ?', [codigoPaquete, nro]);
  return result[0];
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
