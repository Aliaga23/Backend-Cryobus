const { pool } = require('../db');

const getEntregas = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const createEntrega = async (entrega) => {
  const { reembolso, usuarioEntregando, fechaEntrega, horaEntrega } = entrega;
  const [result] = await pool.query(
    'INSERT INTO NOTAENTREGA (FECHAENTREGA, HORAENTREGA, NROREEMBOLSO, IDUSUARIORECIBE) VALUES (?, ?, ?, ?)',
    [fechaEntrega, horaEntrega, reembolso, usuarioEntregando]
  );
  return result;
};

module.exports = {
  getEntregas,
  createEntrega
};
