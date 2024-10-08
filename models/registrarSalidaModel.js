// models/notaTrasladoModel.js
const { pool } = require('../db');

// Función para obtener la fecha y hora actual en la zona horaria de Bolivia
const getBoliviaDateTime = () => {
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() * 60000;
  const boliviaTimeOffset = -4 * 3600000; // Bolivia está en GMT-4
  const boliviaTime = new Date(now.getTime() + utcOffset + boliviaTimeOffset);

  const fechaSalida = boliviaTime.toISOString().split('T')[0];
  const horaSalida = boliviaTime.toTimeString().split(' ')[0];

  return { fechaSalida, horaSalida };
};

const updateSalidaPaquete = async (data) => {
  const { conductor, rolConductor, camion, codigoPaquete } = data;
  const { fechaSalida, horaSalida } = getBoliviaDateTime();

  try {
    // Actualizar la fila que no tiene FECHASALIDAPAQUETE y HORASALIDAPAQUETE
    const [result] = await pool.query(
      'UPDATE NOTATRASLADO SET CONDUCTOR = ?, ROLCONDUCTOR = ?, CAMION = ?, CODIGOPAQUETE = ?, FECHASALIDAPAQUETE = ?, HORASALIDAPAQUETE = ? WHERE FECHASALIDAPAQUETE IS NULL AND HORASALIDAPAQUETE IS NULL LIMIT 1',
      [conductor, rolConductor, camion, codigoPaquete, fechaSalida, horaSalida]
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
  updateSalidaPaquete,
  getAllNotasTraslado
};
