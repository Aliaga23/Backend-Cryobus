// models/Recepcion.js
const { pool } = require('../db');

const getAllRecepciones = async () => {
  const [rows] = await pool.query('SELECT NRO, FECHARECEPCION, HORARECEPCION, PRECIOESTIMADO, CODIGOCLIENTEENVIA, CODIGOPAQUETE, IDUSUARIORECIBE FROM NOTAENTREGA');
  return rows;
};

const getRecepcionById = async (id) => {
  const [rows] = await pool.query('SELECT NRO, FECHARECEPCION, HORARECEPCION, PRECIOESTIMADO, CODIGOCLIENTEENVIA, CODIGOPAQUETE, IDUSUARIORECEPCION FROM NOTAENTREGA WHERE NRO = ?', [id]);
  return rows[0];
};

const createRecepcion = async (recepcion) => {
  const result = await pool.query('INSERT INTO NOTAENTREGA SET ?', [recepcion]);
  return result.insertId;
};

const updateRecepcion = async (id, recepcion) => {
  await pool.query('UPDATE NOTAENTREGA SET ? WHERE NRO = ?', [recepcion, id]);
};

const deleteRecepcion = async (id) => {
  await pool.query('DELETE FROM NOTAENTREGA WHERE NRO = ?', [id]);
};

module.exports = {
  getAllRecepciones,
  getRecepcionById,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion
};
