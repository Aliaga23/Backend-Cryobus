const TipoPaqueteModel = require('../models/tipoPaqueteModel');

const getTipoPaquetes = async (req, res) => {
  try {
    const tipoPaquetes = await TipoPaqueteModel.getAllTipoPaquetes();
    res.json(tipoPaquetes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTipoPaqueteById = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoPaquete = await TipoPaqueteModel.getTipoPaqueteById(id);
    if (!tipoPaquete) {
      return res.status(404).json({ error: 'Tipo de paquete no encontrado' });
    }
    res.json(tipoPaquete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTipoPaquete = async (req, res) => {
  const newTipoPaquete = req.body;
  try {
    await TipoPaqueteModel.createTipoPaquete(newTipoPaquete);
    res.status(201).json({ message: 'Tipo de paquete creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTipoPaquete = async (req, res) => {
  const { id } = req.params;
  const updatedTipoPaquete = req.body;
  try {
    await TipoPaqueteModel.updateTipoPaquete(id, updatedTipoPaquete);
    res.status(200).json({ message: 'Tipo de paquete actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTipoPaquete = async (req, res) => {
  const { id } = req.params;
  try {
    await TipoPaqueteModel.deleteTipoPaquete(id);
    res.status(200).json({ message: 'Tipo de paquete eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTipoPaquetes,
  getTipoPaqueteById,
  createTipoPaquete,
  updateTipoPaquete,
  deleteTipoPaquete,
};
