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

const getTiposByPaquete = async (codigo) => {
  const [rows] = await pool.query(
    'SELECT T.ID, T.NOMBRE FROM DETALLETIPOPAQUETE DT JOIN TIPOPAQUETE T ON DT.IDTIPOPAQUETE = T.ID WHERE DT.CODIGOPAQUETE = ?',
    [codigo]
  );
  return rows;
};

const addTipoPaqueteToPaquete = async (codigoPaquete, idTipoPaquete) => {
  await pool.query(
    'INSERT INTO DETALLETIPOPAQUETE (CODIGOPAQUETE, NRO, IDTIPOPAQUETE) VALUES (?, (SELECT COALESCE(MAX(NRO), 0) + 1 FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ?), ?)',
    [codigoPaquete, codigoPaquete, idTipoPaquete]
  );
};

const deleteTipoPaqueteFromPaquete = async (codigoPaquete, idTipoPaquete) => {
  await pool.query(
    'DELETE FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ? AND IDTIPOPAQUETE = ?',
    [codigoPaquete, idTipoPaquete]
  );
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
  getTiposByPaquete,
  addTipoPaqueteToPaquete,
  deleteTipoPaqueteFromPaquete,
};
