const { pool } = require('../db');

const getNotasTraslado = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTATRASLADO');
  return rows;
};

const createNotaTraslado = async (notaTraslado) => {
  const { nro, fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const result = await pool.query('INSERT INTO NOTATRASLADO (NRO, FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA) VALUES (?, ?, ?, ?, ?, ?, ?)', [nro, fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta]);
  return result[0];
};

const updateNotaTraslado = async (nro, notaTraslado) => {
  const { fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const result = await pool.query('UPDATE NOTATRASLADO SET FECHALLEGADA = ?, HORALLEGADA = ?, FECHASALIDA = ?, HORASALIDA = ?, NROCAMION = ?, IDPLANRUTA = ? WHERE NRO = ?', [fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta, nro]);
  return result[0];
};

const deleteNotaTraslado = async (nro) => {
  const result = await pool.query('DELETE FROM NOTATRASLADO WHERE NRO = ?', [nro]);
  return result[0];
};

module.exports = {
  getNotasTraslado,
  createNotaTraslado,
  updateNotaTraslado,
  deleteNotaTraslado,
};
