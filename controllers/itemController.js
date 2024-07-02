// controllers/itemController.js
const itemModel = require('../models/itemModel');

const getItems = async (req, res) => {
  try {
    const items = await itemModel.getItems();
    res.json(items);
  } catch (error) {
    console.error('Error al obtener items:', error);
    res.status(500).json({ error: 'Error al obtener items' });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await itemModel.getItemById(req.params.codigopaquete);
    res.json(item);
  } catch (error) {
    console.error('Error al obtener item:', error);
    res.status(500).json({ error: 'Error al obtener item' });
  }
};

const createItem = async (req, res) => {
  try {
    const newItem = await itemModel.createItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error al crear item:', error);
    res.status(500).json({ error: 'Error al crear item' });
  }
};

const updateItem = async (req, res) => {
  try {
    const updatedItem = await itemModel.updateItem(req.params.codigopaquete, req.params.nro, req.body);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error al actualizar item:', error);
    res.status(500).json({ error: 'Error al actualizar item' });
  }
};

const deleteItem = async (req, res) => {
  try {
    await itemModel.deleteItem(req.params.codigopaquete, req.params.nro);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar item:', error);
    res.status(500).json({ error: 'Error al eliminar item' });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
