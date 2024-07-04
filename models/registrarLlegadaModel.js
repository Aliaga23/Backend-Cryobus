// models/notaTrasladoModel.js
const { pool } = require('../db');

// Función para obtener la fecha y hora actual en la zona horaria de Bolivia
const getBoliviaDateTime = () => {
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() * 60000;
  const boliviaTimeOffset = -4 * 3600000; // Bolivia está en GMT-4
  const boliviaTime = new Date(now.getTime() + utcOffset + boliviaTimeOffset);

  const fechaLlegada = boliviaTime.toISOString().split('T')[0];
  const horaLlegada = boliviaTime.toTimeString().split(' ')[0];

  return { fechaLlegada, horaLlegada };
};

const updateLlegadaPaquete = async (codigoPaquete) => {
  const { fechaLlegada, horaLlegada } = getBoliviaDateTime();

  try {
    const [result] = await pool.query(
      'UPDATE NOTATRASLADO SET FECHALLEGADAPAQUETE = ?, HORALLEGADAPAQUETE = ? WHERE CODIGOPAQUETE = ?',
      [fechaLlegada, horaLlegada, codigoPaquete]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllNotasTraslado = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM NOTATRASLADO');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  updateLlegadaPaquete,
  getAllNotasTraslado
};
