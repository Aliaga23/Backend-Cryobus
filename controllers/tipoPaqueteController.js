const TipoPaqueteModel = require('../models/tipoPaqueteModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getTipoPaquetes = async (req, res) => {
  try {
    const tipoPaquetes = await TipoPaqueteModel.getAllTipoPaquetes();
    res.json(tipoPaquetes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTipoPaqueteById = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoPaquete = await TipoPaqueteModel.getTipoPaqueteById(id);
    if (!tipoPaquete) {
      return res.status(404).json({ error: 'Tipo de paquete no encontrado' });
    }
    res.json(tipoPaquete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTipoPaquete = async (req, res) => {
  const newTipoPaquete = req.body;
  const userId = req.user.ID;
  try {
    await TipoPaqueteModel.createTipoPaquete(newTipoPaquete);
    res.status(201).json({ message: 'Tipo de paquete creado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 3, // ID de CREACION DE TIPO PAQUETE
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE TIPO PAQUETE',
      DETALLE: `Tipo de paquete creado: ${newTipoPaquete.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTipoPaquete = async (req, res) => {
  const { id } = req.params;
  const updatedTipoPaquete = req.body;
  const userId = req.user.ID;
  try {
    await TipoPaqueteModel.updateTipoPaquete(id, updatedTipoPaquete);
    res.status(200).json({ message: 'Tipo de paquete actualizado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 4, // ID de ACTUALIZACION DE TIPO PAQUETE
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ACTUALIZACION DE TIPO PAQUETE',
      DETALLE: `Tipo de paquete actualizado: ${id} - ${updatedTipoPaquete.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTipoPaquete = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await TipoPaqueteModel.deleteTipoPaquete(id);
    res.status(200).json({ message: 'Tipo de paquete eliminado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE TIPO PAQUETE
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE TIPO PAQUETE',
      DETALLE: `Tipo de paquete eliminado: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTipoPaquetes,
  getTipoPaqueteById,
  createTipoPaquete,
  updateTipoPaquete,
  deleteTipoPaquete,
};
