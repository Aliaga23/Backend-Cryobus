const PermisoModel = require('../models/permisoModel');

const getPermisos = async (req, res) => {
  try {
    const permisos = await PermisoModel.getAllPermisos();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPermisoById = async (req, res) => {
  const { id } = req.params;
  try {
    const permiso = await PermisoModel.getPermisoById(id);
    if (!permiso) {
      return res.status(404).json({ error: 'Permiso not found' });
    }
    res.json(permiso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPermiso = async (req, res) => {
  const newPermiso = req.body;
  


  try {
    await PermisoModel.createPermiso(newPermiso);
    res.status(201).json({ message: 'Permiso created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePermiso = async (req, res) => {
  const { id } = req.params;
  const updatedPermiso = req.body;
  
  

  try {
    await PermisoModel.updatePermiso(id, updatedPermiso);
    res.status(200).json({ message: 'Permiso updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePermiso = async (req, res) => {
  const { id } = req.params;
 
  try {
    await PermisoModel.deletePermiso(id);
    res.status(200).json({ message: 'Permiso deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPermisos,
  getPermisoById,
  createPermiso,
  updatePermiso,
  deletePermiso,
};
