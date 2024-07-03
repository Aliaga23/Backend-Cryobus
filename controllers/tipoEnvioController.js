const TipoEnvioModel = require('../models/tipoEnvioModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getTipoEnvios = async (req, res) => {
  try {
    const tipoEnvios = await TipoEnvioModel.getAllTipoEnvios();
    res.json(tipoEnvios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTipoEnvioById = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoEnvio = await TipoEnvioModel.getTipoEnvioById(id);
    if (!tipoEnvio) {
      return res.status(404).json({ error: 'Tipo de envío no encontrado' });
    }
    res.json(tipoEnvio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTipoEnvio = async (req, res) => {
  const newTipoEnvio = req.body;
  const userId = req.user.ID;
  try {
    await TipoEnvioModel.createTipoEnvio(newTipoEnvio);
    res.status(201).json({ message: 'Tipo de envío creado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 3, // ID de CREACION DE TIPO ENVIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE TIPO ENVIO',
      DETALLE: `Tipo de envío creado: ${newTipoEnvio.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTipoEnvio = async (req, res) => {
  const { id } = req.params;
  const updatedTipoEnvio = req.body;
  const userId = req.user.ID;
  try {
    await TipoEnvioModel.updateTipoEnvio(id, updatedTipoEnvio);
    res.status(200).json({ message: 'Tipo de envío actualizado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 4, // ID de ACTUALIZACION DE TIPO ENVIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ACTUALIZACION DE TIPO ENVIO',
      DETALLE: `Tipo de envío actualizado: ${id} - ${updatedTipoEnvio.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTipoEnvio = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await TipoEnvioModel.deleteTipoEnvio(id);
    res.status(200).json({ message: 'Tipo de envío eliminado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE TIPO ENVIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE TIPO ENVIO',
      DETALLE: `Tipo de envío eliminado: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTipoEnvios,
  getTipoEnvioById,
  createTipoEnvio,
  updateTipoEnvio,
  deleteTipoEnvio,
};
