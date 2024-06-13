// models/roleModel.js
const { pool } = require('../db');

const getAllRoles = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROL');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoleById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ROL WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createRole = async (role) => {
  const { id, nombre } = role;
  try {
    await pool.query('INSERT INTO ROL (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRole = async (id, role) => {
  const { nombre } = role;
  try {
    await pool.query('UPDATE ROL SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRole = async (id) => {
  try {
    await pool.query('DELETE FROM ROL WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};

// models/permisoModel.js
const { pool } = require('../db');

const getAllPermisos = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM PERMISO');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPermisoById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM PERMISO WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPermisosByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT PERMISO.ID AS IDPERMISO FROM PERMISO
       JOIN DETALLEROLPERMISO ON PERMISO.ID = DETALLEROLPERMISO.IDPERMISO
       JOIN USUARIO ON DETALLEROLPERMISO.IDROL = USUARIO.IDROL
       WHERE USUARIO.ID = ?`, 
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPermiso = async (permiso) => {
  const { id, nombre } = permiso;
  try {
    await pool.query('INSERT INTO PERMISO (ID, NOMBRE) VALUES (?, ?)', [id, nombre]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePermiso = async (id, permiso) => {
  const { nombre } = permiso;
  try {
    await pool.query('UPDATE PERMISO SET NOMBRE = ? WHERE ID = ?', [nombre, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePermiso = async (id) => {
  try {
    await pool.query('DELETE FROM PERMISO WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllPermisos,
  getPermisoById,
  getPermisosByUserId,
  createPermiso,
  updatePermiso,
  deletePermiso,
};
