const DireccionModel = require('../models/direccionModel');

const getDirecciones = async (req, res) => {
  try {
    const direcciones = await DireccionModel.getAllDirecciones();
    res.json(direcciones);
  } catch (error) {
    console.error('Error al obtener las direcciones:', error);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
};

const createDireccion = async (req, res) => {
  const newDireccion = req.body;
  try {
    await DireccionModel.createDireccion(newDireccion);
    res.status(201).json({ message: 'Dirección creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la dirección:', error);
    res.status(500).json({ error: 'Error al crear la dirección' });
  }
};

const updateDireccion = async (req, res) => {
  const { id } = req.params;
  const updatedDireccion = req.body;
  try {
    await DireccionModel.updateDireccion(id, updatedDireccion);
    res.status(200).json({ message: 'Dirección actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la dirección:', error);
    res.status(500).json({ error: 'Error al actualizar la dirección' });
  }
};

const deleteDireccion = async (req, res) => {
  const { id } = req.params;
  try {
    await DireccionModel.deleteDireccion(id);
    res.status(200).json({ message: 'Dirección eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la dirección:', error);
    res.status(500).json({ error: 'Error al eliminar la dirección' });
  }
};

module.exports = {
  getDirecciones,
  createDireccion,
  updateDireccion,
  deleteDireccion
};
