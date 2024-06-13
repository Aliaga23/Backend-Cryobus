const { pool } = require('../db');

const getAllDetalles = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM DETALLECONDUCTOR');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createDetalle = async (detalle) => {
  const { nro, codigoConductor, idRolConductor, nroNotaTraslado } = detalle;
  try {
    await pool.query('INSERT INTO DETALLECONDUCTOR (NRO, CODIGOCONDUCTOR, IDROLCONDUCTOR, NRONOTATRASLADO) VALUES (?, ?, ?, ?)', [nro, codigoConductor, idRolConductor, nroNotaTraslado]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDetalle = async (nro, detalle) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = detalle;
  try {
    await pool.query('UPDATE DETALLECONDUCTOR SET CODIGOCONDUCTOR = ?, IDROLCONDUCTOR = ?, NRONOTATRASLADO = ? WHERE NRO = ?', [codigoConductor, idRolConductor, nroNotaTraslado, nro]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDetalle = async (nro) => {
  try {
    await pool.query('DELETE FROM DETALLECONDUCTOR WHERE NRO = ?', [nro]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllDetalles,
  createDetalle,
  updateDetalle,
  deleteDetalle
};
