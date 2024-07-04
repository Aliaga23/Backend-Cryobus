// controllers/registrarLlegadaController.js

const NotaTrasladoModel = require('../models/registrarLlegadaModel');

const registrarLlegadaPaquete = async (req, res) => {
  const { codigoPaquete } = req.body;

  try {
    await NotaTrasladoModel.updateLlegadaPaquete(codigoPaquete);
    res.status(200).json({ message: 'Llegada de paquete registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar la llegada del paquete:', error);
    res.status(500).json({ error: 'Error al registrar la llegada del paquete' });
  }
};

const getNotasTraslado = async (req, res) => {
  try {
    const notasTraslado = await NotaTrasladoModel.getAllNotasTraslado();
    res.json(notasTraslado);
  } catch (error) {
    console.error('Error al obtener las notas de traslado:', error);
    res.status(500).json({ error: 'Error al obtener las notas de traslado' });
  }
};

module.exports = {
  registrarLlegadaPaquete,
  getNotasTraslado
};
