const ReembolsoModel = require('../models/reembolsoModel');

const getReembolsos = async (req, res) => {
  try {
    const reembolsos = await ReembolsoModel.getAllReembolsos();
    res.json(reembolsos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReembolso = async (req, res) => {
  const { nro, motivo } = req.body;
  try {
    await ReembolsoModel.createReembolso(nro, motivo);
    res.status(201).json({ message: 'Reembolso creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReembolso = async (req, res) => {
  const { nro } = req.params;
  const { motivo } = req.body;
  try {
    await ReembolsoModel.updateReembolso(nro, motivo);
    res.status(200).json({ message: 'Reembolso actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReembolso = async (req, res) => {
  const { nro } = req.params;
  try {
    await ReembolsoModel.deleteReembolso(nro);
    res.status(200).json({ message: 'Reembolso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReembolsos,
  createReembolso,
  updateReembolso,
  deleteReembolso
};
