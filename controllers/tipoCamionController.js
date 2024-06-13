const tipoCamionModel = require('../models/tipoCamionModel');

const getTiposCamion = async (req, res) => {
  try {
    const tiposCamion = await tipoCamionModel.getTiposCamion();
    res.json(tiposCamion);
  } catch (error) {
    console.error('Error al obtener tipos de camión:', error);
    res.status(500).json({ error: 'Error al obtener tipos de camión' });
  }
};

const getTipoCamionById = async (req, res) => {
  try {
    const tipoCamion = await tipoCamionModel.getTipoCamionById(req.params.id);
    res.json(tipoCamion);
  } catch (error) {
    console.error('Error al obtener tipo de camión:', error);
    res.status(500).json({ error: 'Error al obtener tipo de camión' });
  }
};

const createTipoCamion = async (req, res) => {
  try {
    const newTipoCamion = await tipoCamionModel.createTipoCamion(req.body);
    res.status(201).json(newTipoCamion);
  } catch (error) {
    console.error('Error al crear tipo de camión:', error);
    res.status(500).json({ error: 'Error al crear tipo de camión' });
  }
};

const updateTipoCamion = async (req, res) => {
  try {
    const updatedTipoCamion = await tipoCamionModel.updateTipoCamion(req.params.id, req.body);
    res.json(updatedTipoCamion);
  } catch (error) {
    console.error('Error al actualizar tipo de camión:', error);
    res.status(500).json({ error: 'Error al actualizar tipo de camión' });
  }
};

const deleteTipoCamion = async (req, res) => {
  try {
    await tipoCamionModel.deleteTipoCamion(req.params.id);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar tipo de camión:', error);
    res.status(500).json({ error: 'Error al eliminar tipo de camión' });
  }
};

module.exports = {
  getTiposCamion,
  getTipoCamionById,
  createTipoCamion,
  updateTipoCamion,
  deleteTipoCamion,
};
