const { pool } = require('../db');

const getNotasTraslado = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTATRASLADO');
  return rows;
};

const createNotaTraslado = async (notaTraslado) => {
  const { fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const [result] = await pool.query('INSERT INTO NOTATRASLADO (FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA) VALUES (?, ?, ?, ?, ?, ?)', [fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta]);
  return result.insertId;
};

const updateNotaTraslado = async (nro, notaTraslado) => {
  const { fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const [result] = await pool.query('UPDATE NOTATRASLADO SET FECHALLEGADA = ?, HORALLEGADA = ?, FECHASALIDA = ?, HORASALIDA = ?, NROCAMION = ?, IDPLANRUTA = ? WHERE NRO = ?', [fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta, nro]);
  return result;
};

const deleteNotaTraslado = async (nro) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    // Eliminar la nota de traslado
    await conn.query('DELETE FROM NOTATRASLADO WHERE NRO = ?', [nro]);
    
    // Decrementar los valores de NRO mayores al eliminado
    await conn.query('UPDATE NOTATRASLADO SET NRO = NRO - 1 WHERE NRO > ?', [nro]);
    
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getNotasTraslado,
  createNotaTraslado,
  updateNotaTraslado,
  deleteNotaTraslado,
};
