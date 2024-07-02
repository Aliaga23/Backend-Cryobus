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

const getTiposByPaquete = async (codigoPaquete) => {
  const [rows] = await pool.query(`
    SELECT TP.ID, TP.NOMBRE
    FROM TIPOPAQUETE TP
    JOIN DETALLETIPOPAQUETE DTP ON TP.ID = DTP.IDTIPOPAQUETE
    WHERE DTP.CODIGOPAQUETE = ?
  `, [codigoPaquete]);
  return rows;
};

const addTipoToPaquete = async (codigoPaquete, idTipoPaquete) => {
  const result = await pool.query('INSERT INTO DETALLETIPOPAQUETE (CODIGOPAQUETE, IDTIPOPAQUETE) VALUES (?, ?)', [codigoPaquete, idTipoPaquete]);
  return result[0];
};

const removeTipoFromPaquete = async (codigoPaquete, idTipoPaquete) => {
  const result = await pool.query('DELETE FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ? AND IDTIPOPAQUETE = ?', [codigoPaquete, idTipoPaquete]);
  return result[0];
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
  getTiposByPaquete,
  addTipoToPaquete,
  removeTipoFromPaquete,
};
