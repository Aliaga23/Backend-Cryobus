const { pool } = require('../db');

const getDepartamentos = async () => {
  const [rows] = await pool.query('SELECT * FROM DEPARTAMENTO');
  return rows;
};

const createDepartamento = async (departamento) => {
  const { nombre } = departamento;
  const result = await pool.query('INSERT INTO DEPARTAMENTO (NOMBRE) VALUES (?)', [nombre]);
  return result[0];
};

const updateDepartamento = async (nombre, departamento) => {
  const { nuevoNombre } = departamento;
  const result = await pool.query('UPDATE DEPARTAMENTO SET NOMBRE = ? WHERE NOMBRE = ?', [nuevoNombre, nombre]);
  return result[0];
};

const deleteDepartamento = async (nombre) => {
  const result = await pool.query('DELETE FROM DEPARTAMENTO WHERE NOMBRE = ?', [nombre]);
  return result[0];
};

module.exports = {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};
