const { pool } = require('../db');

const getPaquetes = async () => {
  const [rows] = await pool.query(`
    SELECT P.*, TP.NOMBRE AS TIPOPAQUETE_NOMBRE
    FROM PAQUETE P
    LEFT JOIN DETALLETIPOPAQUETE DTP ON P.CODIGO = DTP.CODIGOPAQUETE
    LEFT JOIN TIPOPAQUETE TP ON DTP.IDTIPOPAQUETE = TP.ID
  `);
  return rows;
};

const getPaqueteById = async (codigo) => {
  const [rows] = await pool.query(`
    SELECT P.*, TP.NOMBRE AS TIPOPAQUETE_NOMBRE
    FROM PAQUETE P
    LEFT JOIN DETALLETIPOPAQUETE DTP ON P.CODIGO = DTP.CODIGOPAQUETE
    LEFT JOIN TIPOPAQUETE TP ON DTP.IDTIPOPAQUETE = TP.ID
    WHERE P.CODIGO = ?
  `, [codigo]);
  return rows[0];
};

const createPaquete = async (paquete) => {
  const { codigo, tipoPaquete } = paquete;
  const result = await pool.query('INSERT INTO PAQUETE (CODIGO) VALUES (?)', [codigo]);
  if (tipoPaquete) {
    await pool.query('INSERT INTO DETALLETIPOPAQUETE (CODIGOPAQUETE, IDTIPOPAQUETE) VALUES (?, ?)', [codigo, tipoPaquete]);
  }
  return result[0];
};

const updatePaquete = async (codigo, paquete) => {
  const { tipoPaquete } = paquete;
  const result = await pool.query('UPDATE PAQUETE SET CODIGO = ? WHERE CODIGO = ?', [paquete.codigo, codigo]);
  await pool.query('DELETE FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ?', [codigo]);
  if (tipoPaquete) {
    await pool.query('INSERT INTO DETALLETIPOPAQUETE (CODIGOPAQUETE, IDTIPOPAQUETE) VALUES (?, ?)', [codigo, tipoPaquete]);
  }
  return result[0];
};

const deletePaquete = async (codigo) => {
  await pool.query('DELETE FROM DETALLETIPOPAQUETE WHERE CODIGOPAQUETE = ?', [codigo]);
  const result = await pool.query('DELETE FROM PAQUETE WHERE CODIGO = ?', [codigo]);
  return result[0];
};

const getTiposPaquete = async () => {
  const [rows] = await pool.query('SELECT * FROM TIPOPAQUETE');
  return rows;
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
  getTiposPaquete,
};
