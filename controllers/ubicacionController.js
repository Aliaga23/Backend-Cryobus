const ubicacionModel = require('../models/ubicacionModel');

const getUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await ubicacionModel.getUbicaciones();
    res.json(ubicaciones);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ error: 'Error al obtener ubicaciones' });
  }
};

const createUbicacion = async (req, res) => {
  try {
    const newUbicacion = await ubicacionModel.createUbicacion(req.body);
    res.status(201).json(newUbicacion);
  } catch (error) {
    console.error('Error al crear ubicacion:', error);
    res.status(500).json({ error: 'Error al crear ubicacion' });
  }
};

const updateUbicacion = async (req, res) => {
  try {
    const updatedUbicacion = await ubicacionModel.updateUbicacion(req.params.id, req.body);
    res.json(updatedUbicacion);
  } catch (error) {
    console.error('Error al actualizar ubicacion:', error);
    res.status(500).json({ error: 'Error al actualizar ubicacion' });
  }
};

const deleteUbicacion = async (req, res) => {
  try {
    await ubicacionModel.deleteUbicacion(req.params.id);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar ubicacion:', error);
    res.status(500).json({ error: 'Error al eliminar ubicacion' });
  }
};

module.exports = {
  getUbicaciones,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion,
};
