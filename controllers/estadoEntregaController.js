// controllers/estadoEntregaController.js
const estadoEntregaModel = require('../models/estadoEntregaModel');

const getEstadosEntrega = async (req, res) => {
  try {
    const estadosEntrega = await estadoEntregaModel.getAllEstadosEntrega();
    res.json(estadosEntrega);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estados de entrega' });
  }
};

const getEstadoEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const estadoEntrega = await estadoEntregaModel.getEstadoEntregaById(id);
    if (estadoEntrega) {
      res.json(estadoEntrega);
    } else {
      res.status(404).json({ error: 'Estado de entrega no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado de entrega' });
  }
};

const createEstadoEntrega = async (req, res) => {
  try {
    const estadoEntregaId = await estadoEntregaModel.createEstadoEntrega(req.body);
    res.status(201).json({ id: estadoEntregaId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el estado de entrega' });
  }
};

const updateEstadoEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    await estadoEntregaModel.updateEstadoEntrega(id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de entrega' });
  }
};

const deleteEstadoEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    await estadoEntregaModel.deleteEstadoEntrega(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estado de entrega' });
  }
};

module.exports = {
  getEstadosEntrega,
  getEstadoEntrega,
  createEstadoEntrega,
  updateEstadoEntrega,
  deleteEstadoEntrega,
};
