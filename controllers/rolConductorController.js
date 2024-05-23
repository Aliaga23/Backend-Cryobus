// controllers/rolConductorController.js
const RolConductorModel = require('../models/rolConductorModel');

const getRolConductors = async (req, res) => {
  try {
    const rolConductors = await RolConductorModel.getAllRolConductors();
    res.json(rolConductors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRolConductorById = async (req, res) => {
  const { id } = req.params;
  try {
    const rolConductor = await RolConductorModel.getRolConductorById(id);
    if (!rolConductor) {
      return res.status(404).json({ error: 'Rol de conductor no encontrado' });
    }
    res.json(rolConductor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRolConductor = async (req, res) => {
  const newRolConductor = req.body;
  try {
    await RolConductorModel.createRolConductor(newRolConductor);
    res.status(201).json({ message: 'Rol de conductor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRolConductor = async (req, res) => {
  const { id } = req.params;
  const updatedRolConductor = req.body;
  try {
    await RolConductorModel.updateRolConductor(id, updatedRolConductor);
    res.status(200).json({ message: 'Rol de conductor actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRolConductor = async (req, res) => {
  const { id } = req.params;
  try {
    await RolConductorModel.deleteRolConductor(id);
    res.status(200).json({ message: 'Rol de conductor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRolConductors,
  getRolConductorById,
  createRolConductor,
  updateRolConductor,
  deleteRolConductor,
};
