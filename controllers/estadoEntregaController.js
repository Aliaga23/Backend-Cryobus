const EstadoEntregaModel = require('../models/estadoEntregaModel');

const getEstadosEntrega = async (req, res) => {
  try {
    const estadosEntrega = await EstadoEntregaModel.getAllEstadosEntrega();
    res.json(estadosEntrega);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEstadoEntregaById = async (req, res) => {
  const { id } = req.params;
  try {
    const estadoEntrega = await EstadoEntregaModel.getEstadoEntregaById(id);
    if (!estadoEntrega) {
      return res.status(404).json({ error: 'Estado de entrega no encontrado' });
    }
    res.json(estadoEntrega);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEstadoEntrega = async (req, res) => {
  const newEstadoEntrega = req.body;
  try {
    await EstadoEntregaModel.createEstadoEntrega(newEstadoEntrega);
    res.status(201).json({ message: 'Estado de entrega creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEstadoEntrega = async (req, res) => {
  const { id } = req.params;
  const updatedEstadoEntrega = req.body;
  try {
    await EstadoEntregaModel.updateEstadoEntrega(id, updatedEstadoEntrega);
    res.status(200).json({ message: 'Estado de entrega actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEstadoEntrega = async (req, res) => {
  const { id } = req.params;
  try {
    await EstadoEntregaModel.deleteEstadoEntrega(id);
    res.status(200).json({ message: 'Estado de entrega eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEstadosEntrega,
  getEstadoEntregaById,
  createEstadoEntrega,
  updateEstadoEntrega,
  deleteEstadoEntrega,
};
