const recepcionModel = require('../models/recepcionModel');
const moment = require('moment-timezone');

const getRecepciones = async (req, res) => {
  try {
    const recepciones = await recepcionModel.getRecepciones();
    res.json(recepciones);
  } catch (error) {
    console.error('Error al obtener recepciones:', error);
    res.status(500).json({ error: 'Error al obtener recepciones' });
  }
};

const getRecepcionByNRO = async (req, res) => {
  try {
    const { nro } = req.params;
    const recepcion = await recepcionModel.getRecepcionByNRO(nro);
    if (!recepcion) {
      return res.status(404).json({ error: 'Recepción no encontrada' });
    }
    res.json(recepcion);
  } catch (error) {
    console.error('Error al obtener la recepción:', error);
    res.status(500).json({ error: 'Error al obtener la recepción' });
  }
};

const createOrUpdateRecepcion = async (req, res) => {
  try {
    const { NRO } = req.body;
    const fechaRecepcion = moment().tz("America/La_Paz").format('YYYY-MM-DD');
    const horaRecepcion = moment().tz("America/La_Paz").format('HH:mm:ss');
    const newRecepcion = { ...req.body, FECHARECEPCION: fechaRecepcion, HORARECEPCION: horaRecepcion };

    if (NRO) {
      await recepcionModel.updateRecepcion(NRO, newRecepcion);
      res.status(200).json({ message: 'Recepción actualizada correctamente' });
    } else {
      await recepcionModel.createRecepcion(newRecepcion);
      res.status(201).json({ message: 'Recepción creada correctamente' });
    }
  } catch (error) {
    console.error('Error al crear o actualizar la recepción:', error);
    res.status(500).json({ error: 'Error al crear o actualizar la recepción' });
  }
};

module.exports = {
  getRecepciones,
  getRecepcionByNRO,
  createOrUpdateRecepcion
};
