// controllers/recepcionController.js
const recepcionModel = require('../models/recepcionModel');

const getRecepciones = async (req, res) => {
  try {
    const recepciones = await recepcionModel.getRecepciones();
    res.json(recepciones);
  } catch (error) {
    console.error('Error al obtener las recepciones:', error);
    res.status(500).json({ error: 'Error al obtener las recepciones' });
  }
};

const getRecepcionById = async (req, res) => {
  const { nro } = req.params;
  try {
    const recepcion = await recepcionModel.getRecepcionById(nro);
    if (recepcion) {
      res.json(recepcion);
    } else {
      res.status(404).json({ error: 'Recepción no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la recepción:', error);
    res.status(500).json({ error: 'Error al obtener la recepción' });
  }
};

const createRecepcion = async (req, res) => {
  const recepcion = req.body;
  try {
    const result = await recepcionModel.createRecepcion(recepcion);
    res.status(201).json({ message: 'Recepción creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear la recepción:', error);
    res.status(500).json({ error: 'Error al crear la recepción' });
  }
};

const updateRecepcion = async (req, res) => {
  const { nro } = req.params;
  const recepcion = req.body;
  try {
    await recepcionModel.updateRecepcion(nro, recepcion);
    res.json({ message: 'Recepción actualizada' });
  } catch (error) {
    console.error('Error al actualizar la recepción:', error);
    res.status(500).json({ error: 'Error al actualizar la recepción' });
  }
};

const deleteRecepcion = async (req, res) => {
  const { nro } = req.params;
  try {
    await recepcionModel.deleteRecepcion(nro);
    res.json({ message: 'Recepción eliminada' });
  } catch (error) {
    console.error('Error al eliminar la recepción:', error);
    res.status(500).json({ error: 'Error al eliminar la recepción' });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await recepcionModel.getClientes();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

const getPaquetes = async (req, res) => {
  try {
    const paquetes = await recepcionModel.getPaquetes();
    res.json(paquetes);
  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
    res.status(500).json({ error: 'Error al obtener los paquetes' });
  }
};

module.exports = {
  getRecepciones,
  getRecepcionById,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion,
  getClientes,
  getPaquetes,
};
