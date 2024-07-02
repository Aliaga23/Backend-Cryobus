const paqueteModel = require('../models/paqueteModel');

const getPaquetes = async (req, res) => {
  try {
    const paquetes = await paqueteModel.getPaquetes();
    res.json(paquetes);
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
};

const getPaqueteById = async (req, res) => {
  try {
    const paquete = await paqueteModel.getPaqueteById(req.params.codigo);
    res.json(paquete);
  } catch (error) {
    console.error('Error al obtener paquete:', error);
    res.status(500).json({ error: 'Error al obtener paquete' });
  }
};

const createPaquete = async (req, res) => {
  try {
    const newPaquete = await paqueteModel.createPaquete(req.body);
    res.status(201).json(newPaquete);
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ error: 'Error al crear paquete' });
  }
};

const updatePaquete = async (req, res) => {
  try {
    const updatedPaquete = await paqueteModel.updatePaquete(req.params.codigo, req.body);
    res.json(updatedPaquete);
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    res.status(500).json({ error: 'Error al actualizar paquete' });
  }
};

const deletePaquete = async (req, res) => {
  try {
    await paqueteModel.deletePaquete(req.params.codigo);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};

const getTiposPaquete = async (req, res) => {
  try {
    const tiposPaquete = await paqueteModel.getTiposPaquete();
    res.json(tiposPaquete);
  } catch (error) {
    console.error('Error al obtener tipos de paquete:', error);
    res.status(500).json({ error: 'Error al obtener tipos de paquete' });
  }
};

module.exports = {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete,
  getTiposPaquete,
};
