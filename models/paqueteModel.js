// models/paqueteModel.js
const { pool } = require('../db');

const getPaquetes = async () => {
  const [rows] = await pool.query('SELECT * FROM PAQUETE');
  return rows;
};

const getPaqueteById = async (codigo) => {
  const [rows] = await pool.query('SELECT * FROM PAQUETE WHERE CODIGO = ?', [codigo]);
  return rows[0];
};

const createPaquete = async (paquete) => {
  const { codigo } = paquete;
  const result = await pool.query('INSERT INTO PAQUETE (CODIGO) VALUES (?)', [codigo]);
  return result[0];
};

const updatePaquete = async (codigo, paquete) => {
  const result = await pool.query('UPDATE PAQUETE SET CODIGO = ? WHERE CODIGO = ?', [paquete.codigo, codigo]);
  return result[0];
};

const deletePaquete = async (codigo) => {
  const result = await pool.query('DELETE FROM PAQUETE WHERE CODIGO = ?', [codigo]);
  return result[0];
};

const getTiposPaquete = async (codigoPaquete) => {
  const [rows] = await pool.query(`
    SELECT TP.ID, TP.NOMBRE
    FROM TIPOPAQUETE TP
    JOIN DETALLETIPOPAQUETE DP ON TP.ID = DP.IDTIPOPAQUETE
    WHERE DP.CODIGOPAQUETE = ?
  `, [codigoPaquete]);
  return rows;
};

const addTipoPaqueteToPaquete = async (codigoPaquete, idTipoPaquete) => {
  const [rows] = await pool.query(`
    INSERT INTO DETALLETIPOPAQUETE (CODIGOPAQUETE, NRO, IDTIPOPAQUETE)
    SELECT ?, COALESCE(MAX(NRO), 0) + 1, ?
    FROM DETALLETIPOPAQUETE
    WHERE CODIGOPAQUETE = ?
  `, [codigoPaquete, idTipoPaquete, codigoPaquete]);
  return rows[0];
};

const removeTipoPaqueteFromPaquete = async (codigoPaquete, idTipoPaquete) => {
  const result = await pool.query('DELETE FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ? AND IDTIPOPAQUETE = ?', [codigoPaquete, idTipoPaquete]);
  return result[0];
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
  getTiposPaquete,
  addTipoPaqueteToPaquete,
  removeTipoPaqueteFromPaquete,
};
