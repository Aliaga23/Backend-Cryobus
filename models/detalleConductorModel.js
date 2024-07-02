const { pool } = require('../db');

const getAllDetalles = async () => {
  try {
    const query = `
      SELECT 
        DC.NRO, 
        DC.CODIGOCONDUCTOR, 
        C.APELLIDOS, 
        C.NOMBRES, 
        DC.IDROLCONDUCTOR, 
        RC.ROL, 
        DC.NRONOTATRASLADO 
      FROM 
        DETALLECONDUCTOR DC
        JOIN CONDUCTOR C ON DC.CODIGOCONDUCTOR = C.CODIGO
        JOIN ROLCONDUCTOR RC ON DC.IDROLCONDUCTOR = RC.ID
    `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createDetalle = async (detalle) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = detalle;
  try {
    const result = await pool.query(
      'INSERT INTO DETALLECONDUCTOR (CODIGOCONDUCTOR, IDROLCONDUCTOR, NRONOTATRASLADO) VALUES (?, ?, ?)', 
      [codigoConductor, idRolConductor, nroNotaTraslado]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDetalle = async (nro, detalle) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = detalle;
  try {
    await pool.query(
      'UPDATE DETALLECONDUCTOR SET CODIGOCONDUCTOR = ?, IDROLCONDUCTOR = ?, NRONOTATRASLADO = ? WHERE NRO = ?', 
      [codigoConductor, idRolConductor, nroNotaTraslado, nro]
    );
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
