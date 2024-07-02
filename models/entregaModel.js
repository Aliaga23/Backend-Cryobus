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
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO,NRONOTATRASLADO} = entrega;
  const [result] = await pool.query(
    'INSERT INTO NOTAENTREGA (FECHAENTREGA, HORAENTREGA, NROREEMBOLSO,NRONOTATRASLADO) VALUES (?, ?, ?, ?)',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO,NRONOTATRASLADO]
  );
  return result;
};

const updateEntrega = async (nro, entrega) => {
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO,NRONOTATRASLADO} = entrega;
  const [result] = await pool.query(
    'UPDATE NOTAENTREGA SET FECHAENTREGA = ?, HORAENTREGA = ?, NROREEMBOLSO = ? ,NRONOTATRASLADO = ? WHERE NRO = ?',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, NRONOTATRASLADO,  nro]
  );
  return result;
};

module.exports = {
  getEntregas,
  getEntregaByNRO,
  createEntrega,
  updateEntrega
};
