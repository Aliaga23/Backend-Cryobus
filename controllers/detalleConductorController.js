const detalleConductorModel = require('../models/detalleConductorModel');

const getAllDetalles = async (req, res) => {
  try {
    const detalles = await detalleConductorModel.getAllDetalles();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDetalle = async (req, res) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = req.body;
  try {
    const insertId = await detalleConductorModel.createDetalle({ codigoConductor, idRolConductor, nroNotaTraslado });
    res.status(201).json({ message: 'Detalle del conductor creado', nro: insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDetalle = async (req, res) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = req.body;
  const { nro } = req.params;
  try {
    await detalleConductorModel.updateDetalle(nro, { codigoConductor, idRolConductor, nroNotaTraslado });
    res.json({ message: 'Detalle del conductor actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDetalle = async (req, res) => {
  const { nro } = req.params;
  try {
    await detalleConductorModel.deleteDetalle(nro);
    res.json({ message: 'Detalle del conductor eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDetalles,
  createDetalle,
  updateDetalle,
  deleteDetalle
};
