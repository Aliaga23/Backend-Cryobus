// controllers/notaEntregaController.js
const notaEntregaModel = require('../models/notaEntregaModel');

const getNotasEntrega = async (req, res) => {
  try {
    const notasEntrega = await notaEntregaModel.getAllNotasEntrega();
    res.json(notasEntrega);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notas de entrega' });
  }
};

const getNotaEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const notaEntrega = await notaEntregaModel.getNotaEntregaById(id);
    if (notaEntrega) {
      res.json(notaEntrega);
    } else {
      res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la nota de entrega' });
  }
};

const createNotaEntrega = async (req, res) => {
  try {
    const notaEntregaId = await notaEntregaModel.createNotaEntrega(req.body);
    res.status(201).json({ id: notaEntregaId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nota de entrega' });
  }
};

const updateNotaEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    await notaEntregaModel.updateNotaEntrega(id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la nota de entrega' });
  }
};

const deleteNotaEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    await notaEntregaModel.deleteNotaEntrega(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la nota de entrega' });
  }
};

module.exports = {
  getNotasEntrega,
  getNotaEntrega,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
