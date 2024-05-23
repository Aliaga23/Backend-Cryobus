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
    const result = await notaEntregaModel.createNotaEntrega(req.body);
    res.status(201).json({ message: 'Nota de entrega creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la nota de entrega:', error);
    res.status(500).json({ error: 'Error al crear la nota de entrega' });
  }
};

const updateNotaEntrega = async (req, res) => {
  const { nro } = req.params;
  try {
    const result = await notaEntregaModel.updateNotaEntrega(nro, req.body);
    res.json({ message: 'Nota de entrega actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al actualizar la nota de entrega' });
  }
};

const deleteNotaEntrega = async (req, res) => {
  const { nro } = req.params;
  try {
    const result = await notaEntregaModel.deleteNotaEntrega(nro);
    res.json({ message: 'Nota de entrega eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la nota de entrega:', error);
    res.status(500).json({ error: 'Error al eliminar la nota de entrega' });
  }
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await notaEntregaModel.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const getAllReembolsos = async (req, res) => {
  try {
    const reembolsos = await notaEntregaModel.getAllReembolsos();
    res.json(reembolsos);
  } catch (error) {
    console.error('Error al obtener los reembolsos:', error);
    res.status(500).json({ error: 'Error al obtener los reembolsos' });
  }
};

const getAllNotasTraslado = async (req, res) => {
  try {
    const notasTraslado = await notaEntregaModel.getAllNotasTraslado();
    res.json(notasTraslado);
  } catch (error) {
    console.error('Error al obtener las notas de traslado:', error);
    res.status(500).json({ error: 'Error al obtener las notas de traslado' });
  }
};

module.exports = {
  getAllNotasEntrega,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
  getAllUsuarios,
  getAllReembolsos,
  getAllNotasTraslado
};
