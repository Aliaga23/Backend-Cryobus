const recepcionModel = require('../models/recepcionModel');

const getRecepciones = async (req, res) => {
  try {
    const recepciones = await recepcionModel.getRecepciones();
    res.json(recepciones);
  } catch (error) {
    console.error('Error al obtener recepciones:', error);
    res.status(500).json({ error: 'Error al obtener recepciones' });
  }
};

const createRecepcion = async (req, res) => {
  try {
    const newRecepcion = await recepcionModel.createRecepcion(req.body);
    res.status(201).json(newRecepcion);
  } catch (error) {
    console.error('Error al crear recepción:', error);
    res.status(500).json({ error: 'Error al crear recepción' });
  }
};

module.exports = {
  getRecepciones,
  createRecepcion
};
