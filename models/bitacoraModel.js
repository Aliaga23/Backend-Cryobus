const { pool } = require('../db');

const getAllRegistros = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM REGISTROACCION');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addRegistro = async (registro) => {
  const { IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO } = registro;
  try {
    const [result] = await pool.query('INSERT INTO REGISTROACCION (IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO) VALUES (?, ?, ?, ?, ?, ?)', 
      [IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO]);
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRegistros,
  addRegistro,
};
