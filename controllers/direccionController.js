const DireccionModel = require('../models/direccionModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getDirecciones = async (req, res) => {
  try {
    const direcciones = await DireccionModel.getAllDirecciones();
    res.json(direcciones);
  } catch (error) {
    console.error('Error al obtener las direcciones:', error);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
};

const createDireccion = async (req, res) => {
  const newDireccion = req.body;
  const userId = req.user.ID;
  try {
    await DireccionModel.createDireccion(newDireccion);
    res.status(201).json({ message: 'Dirección creada exitosamente' });

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
      ELEMENTOMODIFICADO: 'CREACION DE DIRECCION',
      DETALLE: `Dirección creada: ${newDireccion.direccion}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al crear la dirección:', error);
    res.status(500).json({ error: 'Error al crear la dirección' });
  }
};

const updateDireccion = async (req, res) => {
  const { id } = req.params;
  const updatedDireccion = req.body;
  const userId = req.user.ID;
  try {
    await DireccionModel.updateDireccion(id, updatedDireccion);
    res.status(200).json({ message: 'Dirección actualizada exitosamente' });

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
      ELEMENTOMODIFICADO: 'MODIFICACION DE DIRECCION',
      DETALLE: `Dirección actualizada: ${id} - ${updatedDireccion.direccion}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al actualizar la dirección:', error);
    res.status(500).json({ error: 'Error al actualizar la dirección' });
  }
};

const deleteDireccion = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await DireccionModel.deleteDireccion(id);
    res.status(200).json({ message: 'Dirección eliminada exitosamente' });

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
      ELEMENTOMODIFICADO: 'ELIMINACION DE DIRECCION',
      DETALLE: `Dirección eliminada: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al eliminar la dirección:', error);
    res.status(500).json({ error: 'Error al eliminar la dirección' });
  }
};

module.exports = {
  getDirecciones,
  createDireccion,
  updateDireccion,
  deleteDireccion
};
