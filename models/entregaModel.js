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
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE, CODIGOPAQUETE } = entrega;
  const [result] = await pool.query(
    'INSERT INTO NOTAENTREGA (FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE, CODIGOPAQUETE) VALUES (?, ?, ?, ?, ?)',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE, CODIGOPAQUETE]
  );
  return result;
};

const updateEntrega = async (nro, entrega) => {
  const { FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE, CODIGOPAQUETE } = entrega;
  const [result] = await pool.query(
    'UPDATE NOTAENTREGA SET FECHAENTREGA = ?, HORAENTREGA = ?, NROREEMBOLSO = ?, IDUSUARIORECIBE = ?, CODIGOPAQUETE = ? WHERE NRO = ?',
    [FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE, CODIGOPAQUETE, nro]
  );
  return result;
};

module.exports = {
  getEntregas,
  getEntregaByNRO,
  createEntrega,
  updateEntrega
};
