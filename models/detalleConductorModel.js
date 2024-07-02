const { pool } = require('../db');

const getAll = async () => {
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
};

const create = async ({ codigoConductor, idRolConductor, nroNotaTraslado }) => {
  await pool.query('INSERT INTO DETALLECONDUCTOR (CODIGOCONDUCTOR, IDROLCONDUCTOR, NRONOTATRASLADO) VALUES (?, ?, ?)', [codigoConductor, idRolConductor, nroNotaTraslado]);
};

const update = async (nro, { codigoConductor, idRolConductor, nroNotaTraslado }) => {
  await pool.query('UPDATE DETALLECONDUCTOR SET CODIGOCONDUCTOR = ?, IDROLCONDUCTOR = ?, NRONOTATRASLADO = ? WHERE NRO = ?', [codigoConductor, idRolConductor, nroNotaTraslado, nro]);
};

const remove = async (nro) => {
  await pool.query('DELETE FROM DETALLECONDUCTOR WHERE NRO = ?', [nro]);
  await pool.query('SET @count = 0;');
  await pool.query('UPDATE DETALLECONDUCTOR SET NRO = @count := @count + 1 ORDER BY NRO;');
  await pool.query('ALTER TABLE DETALLECONDUCTOR AUTO_INCREMENT = 1;');
};

module.exports = {
  getAll,
  create,
  update,
  remove
};
