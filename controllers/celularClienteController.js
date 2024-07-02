const CelularClienteModel = require('../models/celularClienteModel');

const getCelularesByCliente = async (req, res) => {
  const { codigoCliente } = req.params;
  try {
    const celulares = await CelularClienteModel.getCelularesByCliente(codigoCliente);
    res.json(celulares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCelular = async (req, res) => {
  const { codigoCliente, numero } = req.body;
  try {
    await CelularClienteModel.createCelular(codigoCliente, numero);
    res.status(201).json({ message: 'Celular añadido exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCelular = async (req, res) => {
  const { codigoCliente, numero } = req.params;
  try {
    await CelularClienteModel.deleteCelular(codigoCliente, numero);
    res.status(200).json({ message: 'Celular eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCelularesByCliente,
  createCelular,
  deleteCelular
};
