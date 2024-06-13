const ConductorModel = require('../models/conductorModel');

const getConductores = async (req, res) => {
  try {
    const conductores = await ConductorModel.getAllConductores();
    res.json(conductores);
  } catch (error) {
    console.error('Error al obtener los conductores:', error);
    res.status(500).json({ error: 'Error al obtener los conductores' });
  }
};

const createConductor = async (req, res) => {
  const newConductor = req.body;
  try {
    await ConductorModel.createConductor(newConductor);
    res.status(201).json({ message: 'Conductor creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el conductor:', error);
    res.status(500).json({ error: 'Error al crear el conductor' });
  }
};

const updateConductor = async (req, res) => {
  const { codigo } = req.params;
  const updatedConductor = req.body;
  try {
    await ConductorModel.updateConductor(codigo, updatedConductor);
    res.status(200).json({ message: 'Conductor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el conductor:', error);
    res.status(500).json({ error: 'Error al actualizar el conductor' });
  }
};

const deleteConductor = async (req, res) => {
  const { codigo } = req.params;
  try {
    await ConductorModel.deleteConductor(codigo);
    res.status(200).json({ message: 'Conductor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el conductor:', error);
    res.status(500).json({ error: 'Error al eliminar el conductor' });
  }
};

module.exports = {
  getConductores,
  createConductor,
  updateConductor,
  deleteConductor
};
