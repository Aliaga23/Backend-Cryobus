// controllers/clienteController.js
const clienteModel = require('../models/clienteModel');

const getClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getClientes();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await clienteModel.getClienteById(req.params.id);
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

const createCliente = async (req, res) => {
  try {
    const newCliente = await clienteModel.createCliente(req.body);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

const updateCliente = async (req, res) => {
  try {
    const updatedCliente = await clienteModel.updateCliente(req.params.id, req.body);
    res.json(updatedCliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

const deleteCliente = async (req, res) => {
  try {
    await clienteModel.deleteCliente(req.params.id);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
