// models/permisoRolModel.js
const { pool } = require('../db');
const getPermisosByRolId = async (idRol) => {
  try {
    const query = `
      SELECT DRP.IDROL, DRP.NRO, DRP.IDPERMISO, P.NOMBRE AS PERMISONOMBRE
      FROM DETALLEROLPERMISO DRP
      JOIN PERMISO P ON DRP.IDPERMISO = P.ID
      WHERE DRP.IDROL = ?
    `;
    const [rows] = await pool.query(query, [idRol]);
    return rows;
  } catch (error) {
    console.error('Error en getPermisosByRolId:', error);
    throw new Error(error.message);
  }
};

const createPermisoRol = async (idRol, permisoRol) => {
  const { nro, idPermiso } = permisoRol;
  try {
    await pool.query('INSERT INTO DETALLEROLPERMISO (IDROL, NRO, IDPERMISO) VALUES (?, ?, ?)', [idRol, nro, idPermiso]);
  } catch (error) {
    console.error('Error en createPermisoRol:', error);
    throw new Error(error.message);
  }
};

const deletePermisoRol = async (idRol, nro) => {
  try {
    await pool.query('DELETE FROM DETALLEROLPERMISO WHERE IDROL = ? AND NRO = ?', [idRol, nro]);
  } catch (error) {
    console.error('Error en deletePermisoRol:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  getPermisosByRolId,
  createPermisoRol,
  deletePermisoRol,
};
