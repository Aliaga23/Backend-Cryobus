const { pool } = require('../db');

const getEntregas = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const getEntregaByNRO = async (nro) => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA WHERE NRO = ?', [nro]);
  return rows[0];
};

const createEntrega = async (entrega) => {
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO,IDESTADOENTREGA, IDUSUARIORECIBE } = entrega;
  const [result] = await pool.query(
    'INSERT INTO NOTAENTREGA (FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO, IDUSUARIORECIBE) VALUES (?,?, ?, ?, ?, ?)',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO, IDUSUARIORECIBE,IDESTADOENTREGA]
  );
  return result;
};

const updateEntrega = async (nro, entrega) => {
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO, IDUSUARIORECIBE ,IDESTADOENTREGA} = entrega;
  const [result] = await pool.query(
    'UPDATE NOTAENTREGA SET FECHAENTREGA = ?, HORAENTREGA = ?, NROREEMBOLSO = ?, NRONOTATRASLADO = ?, IDUSUARIORECIBE = ?,IDESTADOENTREGA=? WHERE NRO = ?',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO, IDUSUARIORECIBE,IDESTADOENTREGA, nro]
  );
  return result;
};

module.exports = {
  getEntregas,
  getEntregaByNRO,
  createEntrega,
  updateEntrega
};
