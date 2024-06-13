const { pool } = require('../db');

const getAllDirecciones = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM DIRECCION');
    return rows;
  } catch (error) {
    console.error('Error en getAllDirecciones:', error);
    throw new Error(error.message);
  }
};

const createDireccion = async (direccion) => {
  const { id, descripcion, nombreDepartamento, nombreLocalidad } = direccion;
  try {
    await pool.query('INSERT INTO DIRECCION (ID, DESCRIPCION, NOMBREDEPARTAMENTO, NOMBRELOCALIDAD) VALUES (?, ?, ?, ?)', [id, descripcion, nombreDepartamento, nombreLocalidad]);
  } catch (error) {
    console.error('Error en createDireccion:', error);
    throw new Error(error.message);
  }
};

const updateDireccion = async (id, direccion) => {
  const { descripcion, nombreDepartamento, nombreLocalidad } = direccion;
  try {
    await pool.query('UPDATE DIRECCION SET DESCRIPCION = ?, NOMBREDEPARTAMENTO = ?, NOMBRELOCALIDAD = ? WHERE ID = ?', [descripcion, nombreDepartamento, nombreLocalidad, id]);
  } catch (error) {
    console.error('Error en updateDireccion:', error);
    throw new Error(error.message);
  }
};

const deleteDireccion = async (id) => {
  try {
    await pool.query('DELETE FROM DIRECCION WHERE ID = ?', [id]);
  } catch (error) {
    console.error('Error en deleteDireccion:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllDirecciones,
  createDireccion,
  updateDireccion,
  deleteDireccion
};
