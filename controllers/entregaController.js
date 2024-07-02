const entregaModel = require('../models/entregaModel');

const getEntregas = async (req, res) => {
  try {
    const entregas = await entregaModel.getEntregas();
    res.json(entregas);
  } catch (error) {
    console.error('Error al obtener entregas:', error);
    res.status(500).json({ error: 'Error al obtener entregas' });
  }
};

const createEntrega = async (req, res) => {
  try {
    const fechaEntrega = new Date().toISOString().split('T')[0];
    const horaEntrega = new Date().toTimeString().split(' ')[0];
    const newEntrega = { ...req.body, fechaEntrega, horaEntrega };
    const result = await entregaModel.createEntrega(newEntrega);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al crear entrega:', error);
    res.status(500).json({ error: 'Error al crear entrega' });
  }
};

module.exports = {
  getEntregas,
  createEntrega
};
