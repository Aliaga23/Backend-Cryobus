const localidadModel = require('../models/localidadModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getLocalidades = async (req, res) => {
  try {
    const localidades = await localidadModel.getLocalidades();
    res.json(localidades);
  } catch (error) {
    console.error('Error al obtener localidades:', error);
    res.status(500).json({ error: 'Error al obtener localidades' });
  }
};

const createLocalidad = async (req, res) => {
  const userId = req.user.ID;
  try {
    const newLocalidad = await localidadModel.createLocalidad(req.body);
    res.status(201).json(newLocalidad);

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
      ELEMENTOMODIFICADO: 'CREACION DE LOCALIDAD',
      DETALLE: `Localidad creada: ${newLocalidad.nombre}, Departamento: ${newLocalidad.nombreDepartamento}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al crear localidad:', error);
    res.status(500).json({ error: 'Error al crear localidad' });
  }
};

const updateLocalidad = async (req, res) => {
  const userId = req.user.ID;
  try {
    const updatedLocalidad = await localidadModel.updateLocalidad(req.params.nombre, req.params.nombreDepartamento, req.body);
    res.json(updatedLocalidad);

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
      ELEMENTOMODIFICADO: 'MODIFICACION DE LOCALIDAD',
      DETALLE: `Localidad actualizada: ${req.params.nombre}, Departamento: ${req.params.nombreDepartamento}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al actualizar localidad:', error);
    res.status(500).json({ error: 'Error al actualizar localidad' });
  }
};

const deleteLocalidad = async (req, res) => {
  const userId = req.user.ID;
  try {
    await localidadModel.deleteLocalidad(req.params.nombre, req.params.nombreDepartamento);
    res.status(204).json();

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
      ELEMENTOMODIFICADO: 'ELIMINACION DE LOCALIDAD',
      DETALLE: `Localidad eliminada: ${req.params.nombre}, Departamento: ${req.params.nombreDepartamento}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al eliminar localidad:', error);
    res.status(500).json({ error: 'Error al eliminar localidad' });
  }
};

module.exports = {
  getLocalidades,
  createLocalidad,
  updateLocalidad,
  deleteLocalidad,
};
