const notaEntregaModel = require('../models/notaEntregaModel');

const getNotasEntrega = async (req, res) => {
  try {
    const notasEntrega = await notaEntregaModel.getNotasEntrega();
    res.json(notasEntrega);
  } catch (error) {
    console.error('Error al obtener las notas de entrega:', error);
    res.status(500).json({ error: 'Error al obtener las notas de entrega' });
  }
};

const getNotaEntregaById = async (req, res) => {
  try {
    const { id } = req.params;
    const notaEntrega = await notaEntregaModel.getNotaEntregaById(id);
    if (!notaEntrega) {
      return res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }
    res.json(notaEntrega);
  } catch (error) {
    console.error('Error al obtener la nota de entrega:', error);
    res.status(500).json({ error: 'Error al obtener la nota de entrega' });
  }
};

const createNotaEntrega = async (req, res) => {
  try {
    const notaEntrega = req.body;
    const result = await notaEntregaModel.createNotaEntrega(notaEntrega);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al crear la nota de entrega:', error);
    res.status(500).json({ error: 'Error al crear la nota de entrega' });
  }
};

const updateNotaEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const notaEntrega = req.body;
    const result = await notaEntregaModel.updateNotaEntrega(id, notaEntrega);
    res.json(result);
  } catch (error) {
    console.error('Error al actualizar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al actualizar la nota de entrega' });
  }
};

const deleteNotaEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await notaEntregaModel.deleteNotaEntrega(id);
    res.json(result);
  } catch (error) {
    console.error('Error al eliminar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al eliminar la nota de entrega' });
  }
};

module.exports = {
  getNotasEntrega,
  getNotaEntregaById,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
