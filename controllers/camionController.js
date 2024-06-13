const camionModel = require('../models/camionModel');

const getCamiones = async (req, res) => {
  try {
    const camiones = await camionModel.getCamiones();
    res.json(camiones);
  } catch (error) {
    console.error('Error al obtener camiones:', error);
    res.status(500).json({ error: 'Error al obtener camiones' });
  }
};

const getCamionById = async (req, res) => {
  try {
    const camion = await camionModel.getCamionById(req.params.id);
    res.json(camion);
  } catch (error) {
    console.error('Error al obtener camión:', error);
    res.status(500).json({ error: 'Error al obtener camión' });
  }
};

const createCamion = async (req, res) => {
  try {
    const newCamion = await camionModel.createCamion(req.body);
    res.status(201).json(newCamion);
  } catch (error) {
    console.error('Error al crear camión:', error);
    res.status(500).json({ error: 'Error al crear camión' });
  }
};

const updateCamion = async (req, res) => {
  try {
    const updatedCamion = await camionModel.updateCamion(req.params.id, req.body);
    res.json(updatedCamion);
  } catch (error) {
    console.error('Error al actualizar camión:', error);
    res.status(500).json({ error: 'Error al actualizar camión' });
  }
};

const deleteCamion = async (req, res) => {
  try {
    await camionModel.deleteCamion(req.params.id);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar camión:', error);
    res.status(500).json({ error: 'Error al eliminar camión' });
  }
};

const getTiposCamion = async (req, res) => {
  try {
    const tiposCamion = await camionModel.getTiposCamion();
    res.json(tiposCamion);
  } catch (error) {
    console.error('Error al obtener tipos de camión:', error);
    res.status(500).json({ error: 'Error al obtener tipos de camión' });
  }
};

module.exports = {
  getCamiones,
  getCamionById,
  createCamion,
  updateCamion,
  deleteCamion,
  getTiposCamion,
};
