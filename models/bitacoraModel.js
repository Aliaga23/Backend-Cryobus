const { pool } = require('../db');

const getAllRegistros = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM REGISTROACCION ORDER BY NRO ASC');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addRegistro = async (registro) => {
  try {
    const { IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO } = registro;
    const [result] = await pool.query(
      'INSERT INTO REGISTROACCION (IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO) VALUES (?, ?, ?, ?, ?, ?)',
      [IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRegistros,
  addRegistro,
};
