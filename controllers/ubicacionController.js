// controllers/ubicacionController.js
const UbicacionModel = require('../models/ubicacionModel');

const getUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await UbicacionModel.getAllUbicaciones();
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUbicacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const ubicacion = await UbicacionModel.getUbicacionById(id);
    if (!ubicacion) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json(ubicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUbicacion = async (req, res) => {
  const newUbicacion = req.body;
  try {
    await UbicacionModel.createUbicacion(newUbicacion);
    res.status(201).json({ message: 'Ubicación creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUbicacion = async (req, res) => {
  const { id } = req.params;
  const updatedUbicacion = req.body;
  try {
    await UbicacionModel.updateUbicacion(id, updatedUbicacion);
    res.status(200).json({ message: 'Ubicación actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUbicacion = async (req, res) => {
  const { id } = req.params;
  try {
    await UbicacionModel.deleteUbicacion(id);
    res.status(200).json({ message: 'Ubicación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUbicaciones,
  getUbicacionById,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion
};
