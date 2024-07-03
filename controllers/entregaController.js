const entregaModel = require('../models/entregaModel');
const moment = require('moment-timezone');

const getEntregas = async (req, res) => {
  try {
    const entregas = await entregaModel.getEntregas();
    res.json(entregas);
  } catch (error) {
    console.error('Error al obtener entregas:', error);
    res.status(500).json({ error: 'Error al obtener entregas' });
  }
};

const getEntregaByNRO = async (req, res) => {
  try {
    const { nro } = req.params;
    const entrega = await entregaModel.getEntregaByNRO(nro);
    if (!entrega) {
      return res.status(404).json({ error: 'Entrega no encontrada' });
    }
    res.json(entrega);
  } catch (error) {
    console.error('Error al obtener la entrega:', error);
    res.status(500).json({ error: 'Error al obtener la entrega' });
  }
};

const createOrUpdateEntrega = async (req, res) => {
  try {
    const { NRO } = req.body;
    const fechaEntrega = moment().tz("America/La_Paz").format('YYYY-MM-DD');
    const horaEntrega =  moment().tz("America/La_Paz").format('HH:mm:ss');
    const newEntrega = { ...req.body, FECHAENTREGA: fechaEntrega, HORAENTREGA: horaEntrega };

    if (NRO) {
      await entregaModel.updateEntrega(NRO, newEntrega);
      res.status(200).json({ message: 'Entrega actualizada correctamente' });
    } else {
      await entregaModel.createEntrega(newEntrega);
      res.status(201).json({ message: 'Entrega creada correctamente' });
    }
  } catch (error) {
    console.error('Error al crear o actualizar la entrega:', error);
    res.status(500).json({ error: 'Error al crear o actualizar la entrega' });
  }
};

module.exports = {
  getEntregas,
  getEntregaByNRO,
  createOrUpdateEntrega
};
