const PlanRutaModel = require('../models/planRutaModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const getPlanRutas = async (req, res) => {
  try {
    const planRutas = await PlanRutaModel.getAllPlanRutas();
    res.json(planRutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlanRutaById = async (req, res) => {
  const { id } = req.params;
  try {
    const planRuta = await PlanRutaModel.getPlanRutaById(id);
    if (!planRuta) {
      return res.status(404).json({ error: 'Plan de ruta no encontrado' });
    }
    res.json(planRuta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPlanRuta = async (req, res) => {
  const newPlanRuta = req.body;
  const userId = req.user.ID;
  try {
    await PlanRutaModel.createPlanRuta(newPlanRuta);
    res.status(201).json({ message: 'Plan de ruta creado exitosamente' });

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
      ELEMENTOMODIFICADO: 'CREACION DE PLAN DE RUTA',
      DETALLE: `Plan de ruta creado: ${newPlanRuta.nombreLocalidad} a ${newPlanRuta.localidadDestino}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePlanRuta = async (req, res) => {
  const { id } = req.params;
  const updatedPlanRuta = req.body;
  const userId = req.user.ID;
  try {
    await PlanRutaModel.updatePlanRuta(id, updatedPlanRuta);
    res.status(200).json({ message: 'Plan de ruta actualizado exitosamente' });

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
      ELEMENTOMODIFICADO: 'MODIFICACION DE PLAN DE RUTA',
      DETALLE: `Plan de ruta actualizado: ${id} - ${updatedPlanRuta.nombreLocalidad} a ${updatedPlanRuta.localidadDestino}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlanRuta = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await PlanRutaModel.deletePlanRuta(id);
    res.status(200).json({ message: 'Plan de ruta eliminado exitosamente' });

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
      ELEMENTOMODIFICADO: 'ELIMINACION DE PLAN DE RUTA',
      DETALLE: `Plan de ruta eliminado: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPlanRutas,
  getPlanRutaById,
  createPlanRuta,
  updatePlanRuta,
  deletePlanRuta,
};
