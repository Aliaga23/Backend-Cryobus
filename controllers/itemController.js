const itemModel = require('../models/itemModel');

const getItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    await itemModel.createItem(req.body);
    res.status(201).json({ message: 'Item creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    await itemModel.updateItem(req.params.id, req.body);
    res.status(200).json({ message: 'Item actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    await itemModel.deleteItem(req.params.id);
    res.status(200).json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};
