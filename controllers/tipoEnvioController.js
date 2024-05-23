// controllers/tipoEnvioController.js
const TipoEnvioModel = require('../models/tipoEnvioModel');

const getTipoEnvios = async (req, res) => {
  try {
    const tipoEnvios = await TipoEnvioModel.getAllTipoEnvios();
    res.json(tipoEnvios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTipoEnvioById = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoEnvio = await TipoEnvioModel.getTipoEnvioById(id);
    if (!tipoEnvio) {
      return res.status(404).json({ error: 'Tipo de envío no encontrado' });
    }
    res.json(tipoEnvio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTipoEnvio = async (req, res) => {
  const newTipoEnvio = req.body;
  try {
    await TipoEnvioModel.createTipoEnvio(newTipoEnvio);
    res.status(201).json({ message: 'Tipo de envío creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTipoEnvio = async (req, res) => {
  const { id } = req.params;
  const updatedTipoEnvio = req.body;
  try {
    await TipoEnvioModel.updateTipoEnvio(id, updatedTipoEnvio);
    res.status(200).json({ message: 'Tipo de envío actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTipoEnvio = async (req, res) => {
  const { id } = req.params;
  try {
    await TipoEnvioModel.deleteTipoEnvio(id);
    res.status(200).json({ message: 'Tipo de envío eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTipoEnvios,
  getTipoEnvioById,
  createTipoEnvio,
  updateTipoEnvio,
  deleteTipoEnvio,
};
