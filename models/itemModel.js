const { pool } = require('../db');

const getAllItems = async () => {
  try {
    const query = 'SELECT * FROM ITEM';
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createItem = async (item) => {
  const { codigopaquete, descripcion, pesoindividual } = item;
  try {
    const query = `
      INSERT INTO ITEM (CODIGOPAQUETE, DESCRIPCION, PESOINDIVIDUAL)
      VALUES (?, ?, ?)
    `;
    await pool.query(query, [codigopaquete, descripcion, pesoindividual]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateItem = async (id, item) => {
  const { codigopaquete, descripcion, pesoindividual } = item;
  try {
    const query = `
      UPDATE ITEM
      SET CODIGOPAQUETE = ?, DESCRIPCION = ?, PESOINDIVIDUAL = ?
      WHERE ID = ?
    `;
    await pool.query(query, [codigopaquete, descripcion, pesoindividual, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    const query = 'DELETE FROM ITEM WHERE ID = ?';
    await pool.query(query, [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
};
