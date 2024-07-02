const { pool } = require('../db');

const getNotasTraslado = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTATRASLADO');
  return rows;
};

const createNotaTraslado = async (notaTraslado) => {
  const { fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const result = await pool.query('INSERT INTO NOTATRASLADO (FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA) VALUES (?, ?, ?, ?, ?, ?)', [fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta]);
  return result[0];
};

const updateNotaTraslado = async (nro, notaTraslado) => {
  const { fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta } = notaTraslado;
  const result = await pool.query('UPDATE NOTATRASLADO SET FECHALLEGADA = ?, HORALLEGADA = ?, FECHASALIDA = ?, HORASALIDA = ?, NROCAMION = ?, IDPLANRUTA = ? WHERE NRO = ?', [fechaLlegada, horaLlegada, fechaSalida, horaSalida, nroCamion, idPlanRuta, nro]);
  return result[0];
};

const deleteNotaTraslado = async (nro) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    // Eliminar la nota de traslado
    await conn.query('DELETE FROM NOTATRASLADO WHERE NRO = ?', [nro]);
    
    // Decrementar los valores de NRO mayores al eliminado y actualizar las tablas dependientes
    await conn.query('UPDATE NOTAENTREGA SET NRONOTATRASLADO = NRONOTATRASLADO - 1 WHERE NRONOTATRASLADO > ?', [nro]);
    await conn.query('UPDATE DETALLECONDUCTOR SET NRONOTATRASLADO = NRONOTATRASLADO - 1 WHERE NRONOTATRASLADO > ?', [nro]);
    await conn.query('SET @count = 0;');
    await conn.query('UPDATE NOTATRASLADO SET NRO = @count := @count + 1 ORDER BY NRO;');
    
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
