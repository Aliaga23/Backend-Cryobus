const RolConductorModel = require('../models/rolConductorModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getRolConductors = async (req, res) => {
  try {
    const rolConductors = await RolConductorModel.getAllRolConductors();
    res.json(rolConductors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRolConductorById = async (req, res) => {
  const { id } = req.params;
  try {
    const rolConductor = await RolConductorModel.getRolConductorById(id);
    if (!rolConductor) {
      return res.status(404).json({ error: 'Rol de conductor no encontrado' });
    }
    res.json(rolConductor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRolConductor = async (req, res) => {
  const newRolConductor = req.body;
  const userId = req.user.ID;
  try {
    await RolConductorModel.createRolConductor(newRolConductor);
    res.status(201).json({ message: 'Rol de conductor creado exitosamente' });

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
      ELEMENTOMODIFICADO: 'CREACION DE ROL DE CONDUCTOR',
      DETALLE: `Rol de conductor creado: ${newRolConductor.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRolConductor = async (req, res) => {
  const { id } = req.params;
  const updatedRolConductor = req.body;
  const userId = req.user.ID;
  try {
    await RolConductorModel.updateRolConductor(id, updatedRolConductor);
    res.status(200).json({ message: 'Rol de conductor actualizado exitosamente' });

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
      ELEMENTOMODIFICADO: 'MODIFICACION DE ROL DE CONDUCTOR',
      DETALLE: `Rol de conductor actualizado: ${id} - ${updatedRolConductor.nombre}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRolConductor = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await RolConductorModel.deleteRolConductor(id);
    res.status(200).json({ message: 'Rol de conductor eliminado exitosamente' });

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
      ELEMENTOMODIFICADO: 'ELIMINACION DE ROL DE CONDUCTOR',
      DETALLE: `Rol de conductor eliminado: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRolConductors,
  getRolConductorById,
  createRolConductor,
  updateRolConductor,
  deleteRolConductor,
};
