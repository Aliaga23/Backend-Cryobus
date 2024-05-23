// controllers/notaEntregaController.js

const notaEntregaModel = require('../models/notaEntregaModel');

const getAllNotasEntrega = async (req, res) => {
  try {
    const notasEntrega = await notaEntregaModel.getAllNotasEntrega();
    res.json(notasEntrega);
  } catch (error) {
    console.error('Error al obtener las notas de entrega:', error);
    res.status(500).json({ error: 'Error al obtener las notas de entrega' });
  }
};

const createNotaEntrega = async (req, res) => {
  try {
    const id = await notaEntregaModel.createNotaEntrega(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error al crear la nota de entrega:', error);
    res.status(500).json({ error: 'Error al crear la nota de entrega' });
  }
};

const updateNotaEntrega = async (req, res) => {
  try {
    await notaEntregaModel.updateNotaEntrega(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al actualizar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al actualizar la nota de entrega' });
  }
};

const deleteNotaEntrega = async (req, res) => {
  try {
    await notaEntregaModel.deleteNotaEntrega(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al eliminar la nota de entrega' });
  }
};

module.exports = {
  getAllNotasEntrega,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
