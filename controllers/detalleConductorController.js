const { getAll, create, update, remove } = require('../models/detalleConductorModel');

const getAllDetalles = async (req, res) => {
  try {
    const rows = await getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createDetalle = async (req, res) => {
  const { codigoConductor, idRolConductor, nroNotaTraslado } = req.body;
  try {
    await create({ codigoConductor, idRolConductor, nroNotaTraslado });
    res.status(201).send('Detalle created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateDetalle = async (req, res) => {
  const { nro } = req.params;
  const { codigoConductor, idRolConductor, nroNotaTraslado } = req.body;
  try {
    await update(nro, { codigoConductor, idRolConductor, nroNotaTraslado });
    res.send('Detalle updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDetalle = async (req, res) => {
  const { nro } = req.params;
  try {
    await remove(nro);
    res.send('Detalle deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllDetalles,
  createDetalle,
  updateDetalle,
  deleteDetalle
};
