const notaTrasladoModel = require('../models/notaTrasladoModel');

const getNotasTraslado = async (req, res) => {
  try {
    const notasTraslado = await notaTrasladoModel.getNotasTraslado();
    res.json(notasTraslado);
  } catch (error) {
    console.error('Error al obtener notas de traslado:', error);
    res.status(500).json({ error: 'Error al obtener notas de traslado' });
  }
};

const createNotaTraslado = async (req, res) => {
  try {
    const newNotaTraslado = await notaTrasladoModel.createNotaTraslado(req.body);
    res.status(201).json(newNotaTraslado);
  } catch (error) {
    console.error('Error al crear nota de traslado:', error);
    res.status(500).json({ error: 'Error al crear nota de traslado' });
  }
};

const updateNotaTraslado = async (req, res) => {
  try {
    const updatedNotaTraslado = await notaTrasladoModel.updateNotaTraslado(req.params.nro, req.body);
    res.json(updatedNotaTraslado);
  } catch (error) {
    console.error('Error al actualizar nota de traslado:', error);
    res.status(500).json({ error: 'Error al actualizar nota de traslado' });
  }
};

const deleteNotaTraslado = async (req, res) => {
  try {
    await notaTrasladoModel.deleteNotaTraslado(req.params.nro);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar nota de traslado:', error);
    res.status(500).json({ error: 'Error al eliminar nota de traslado' });
  }
};

module.exports = {
  getNotasTraslado,
  createNotaTraslado,
  updateNotaTraslado,
  deleteNotaTraslado,
};
