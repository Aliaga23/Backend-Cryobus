const ReembolsoModel = require('../models/reembolsoModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getReembolsos = async (req, res) => {
  try {
    const reembolsos = await ReembolsoModel.getAllReembolsos();
    res.json(reembolsos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReembolso = async (req, res) => {
  const { nro, motivo } = req.body;
  const userId = req.user.ID;
  try {
    await ReembolsoModel.createReembolso(nro, motivo);
    res.status(201).json({ message: 'Reembolso creado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 3, // ID de CREACION DE ELEMENTO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE REEMBOLSO',
      DETALLE: `Reembolso creado: NRO ${nro}, Motivo: ${motivo}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReembolso = async (req, res) => {
  const { nro } = req.params;
  const { motivo } = req.body;
  const userId = req.user.ID;
  try {
    await ReembolsoModel.updateReembolso(nro, motivo);
    res.status(200).json({ message: 'Reembolso actualizado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 4, // ID de MODIFICACION DE ELEMENTO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'MODIFICACION DE REEMBOLSO',
      DETALLE: `Reembolso actualizado: NRO ${nro}, Motivo: ${motivo}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReembolso = async (req, res) => {
  const { nro } = req.params;
  const userId = req.user.ID;
  try {
    await ReembolsoModel.deleteReembolso(nro);
    res.status(200).json({ message: 'Reembolso eliminado exitosamente' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE ELEMENTO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE REEMBOLSO',
      DETALLE: `Reembolso eliminado: NRO ${nro}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReembolsos,
  createReembolso,
  updateReembolso,
  deleteReembolso
};
