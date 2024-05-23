// controllers/recepcionController.js
const Recepcion = require('../models/recepcionModel');

const getAllRecepciones = async (req, res) => {
  try {
    const recepciones = await Recepcion.getAllRecepciones();
    res.json(recepciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recepciones' });
  }
};

const getRecepcionById = async (req, res) => {
  try {
    const recepcion = await Recepcion.getRecepcionById(req.params.id);
    if (recepcion) {
      res.json(recepcion);
    } else {
      res.status(404).json({ error: 'Recepción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la recepción' });
  }
};

const createRecepcion = async (req, res) => {
  try {
    const newRecepcion = await Recepcion.createRecepcion(req.body);
    res.status(201).json({ id: newRecepcion });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la recepción' });
  }
};

const updateRecepcion = async (req, res) => {
  try {
    await Recepcion.updateRecepcion(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la recepción' });
  }
};

const deleteRecepcion = async (req, res) => {
  try {
    await Recepcion.deleteRecepcion(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la recepción' });
  }
};

module.exports = {
  getAllRecepciones,
  getRecepcionById,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion
};
