// models/permisoRolModel.js
const { pool } = require('../db');

const getPermisosByRolId = async (idRol) => {
  try {
    const [rows] = await pool.query('SELECT * FROM DETALLEROLPERMISO WHERE IDROL = ?', [idRol]);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPermisoRol = async (idRol, permisoRol) => {
  const { nro, idPermiso } = permisoRol;
  try {
    await pool.query('INSERT INTO DETALLEROLPERMISO (IDROL, NRO, IDPERMISO) VALUES (?, ?, ?)', [idRol, nro, idPermiso]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePermisoRol = async (idRol, nro) => {
  try {
    await pool.query('DELETE FROM DETALLEROLPERMISO WHERE IDROL = ? AND NRO = ?', [idRol, nro]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getPermisosByRolId,
  createPermisoRol,
  deletePermisoRol,
};
