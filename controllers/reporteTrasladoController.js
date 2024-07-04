const { getAllNotasTraslado, addNotaTraslado } = require('../models/reporteTrasladoModel');

const fetchAllNotasTraslado = async (req, res) => {
  try {
    const notasTraslado = await getAllNotasTraslado();
    res.json(notasTraslado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas de traslado', error });
  }
};

const createNotaTraslado = async (req, res) => {
  const notaTraslado = req.body;
  try {
    const id = await addNotaTraslado(notaTraslado);
    res.status(201).json({ message: 'Nota de traslado añadida', id });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir la nota de traslado', error });
  }
};

module.exports = {
  fetchAllNotasTraslado,
  createNotaTraslado,
};
