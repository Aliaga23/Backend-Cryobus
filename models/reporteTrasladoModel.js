const { pool } = require('../db');

const getAllNotasTraslado = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM NOTATRASLADO ORDER BY NRO ASC');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addNotaTraslado = async (notaTraslado) => {
  try {
    const { FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA } = notaTraslado;
    const [result] = await pool.query(
      'INSERT INTO NOTATRASLADO (FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA) VALUES (?, ?, ?, ?, ?, ?)',
      [FECHALLEGADA, HORALLEGADA, FECHASALIDA, HORASALIDA, NROCAMION, IDPLANRUTA]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllNotasTraslado,
  addNotaTraslado,
};
