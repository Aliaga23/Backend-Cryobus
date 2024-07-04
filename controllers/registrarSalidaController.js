// controllers/notaTrasladoController.js

const NotaTrasladoModel = require('../models/registrarSalidaModel');

const registrarSalidaPaquete = async (req, res) => {
  const { conductor, rolConductor, camion, codigoPaquete } = req.body;

  try {
    await NotaTrasladoModel.updateSalidaPaquete({
      conductor,
      rolConductor,
      camion,
      codigoPaquete
    });
    res.status(200).json({ message: 'Salida de paquete registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar la salida del paquete:', error);
    res.status(500).json({ error: 'Error al registrar la salida del paquete' });
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
  registrarSalidaPaquete,
  getNotasTraslado
};
