const PermisoRolModel = require('../models/permisoRolModel');

const getPermisosByRolId = async (req, res) => {
  const { idRol } = req.params;
  try {
    const permisos = await PermisoRolModel.getPermisosByRolId(idRol);
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPermisoRol = async (req, res) => {
  const { idRol } = req.params;
  const newPermisoRol = req.body;
  
  // Verifica que el rol del usuario es 1 (admin)
  if (req.user.IDROL !== 1) {
    return res.status(403).json({ message: 'Usuario no autorizado' });
  }

  try {
    await PermisoRolModel.createPermisoRol(idRol, newPermisoRol);
    res.status(201).json({ message: 'Permiso asignado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePermisoRol = async (req, res) => {
  const { idRol, nro } = req.params;
  
  // Verifica que el rol del usuario es 1 (admin)
  if (req.user.IDROL !== 1) {
    return res.status(403).json({ message: 'Usuario no autorizado' });
  }

  try {
    await PermisoRolModel.deletePermisoRol(idRol, nro);
    res.status(200).json({ message: 'Permiso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPermisosByRolId,
  createPermisoRol,
  deletePermisoRol,
};
