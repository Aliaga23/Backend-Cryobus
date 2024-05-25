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
  const query = `
    INSERT INTO REGISTROACCION (IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO];

  try {
    const [result] = await pool.query(query, values);
    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRegistros,
  addRegistro,
};
