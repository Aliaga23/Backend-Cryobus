// controllers/permisoRolController.js
const PermisoRolModel = require('../models/permisoRolModel');

const getPermisosByRolId = async (req, res) => {
  const { idRol } = req.params;
  try {
    const permisos = await PermisoRolModel.getPermisosByRolId(idRol);
    res.json(permisos);
  } catch (error) {
    console.error('Error en getPermisosByRolId:', error);
    res.status(500).json({ error: 'Error al obtener los permisos del rol' });
  }
};


const createPermisoRol = async (req, res) => {
  const { idRol } = req.params;
  const newPermisoRol = req.body;

 
  try {
    await PermisoRolModel.createPermisoRol(idRol, newPermisoRol);
    res.status(201).json({ message: 'Permiso asignado exitosamente' });
  } catch (error) {
    console.error('Error en createPermisoRol:', error);
    res.status(500).json({ error: 'Error al asignar el permiso' });
  }
};

const deletePermisoRol = async (req, res) => {
  const { idRol, nro } = req.params;

 

  try {
    await PermisoRolModel.deletePermisoRol(idRol, nro);
    res.status(200).json({ message: 'Permiso eliminado exitosamente' });
  } catch (error) {
    console.error('Error en deletePermisoRol:', error);
    res.status(500).json({ error: 'Error al eliminar el permiso' });
  }
};

module.exports = {
  getPermisosByRolId,
  createPermisoRol,
  deletePermisoRol,
};
