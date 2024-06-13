const DetalleConductorModel = require('../models/detalleConductorModel');

const getDetalles = async (req, res) => {
  try {
    const detalles = await DetalleConductorModel.getAllDetalles();
    res.json(detalles);
  } catch (error) {
    console.error('Error al obtener los detalles del conductor:', error);
    res.status(500).json({ error: 'Error al obtener los detalles del conductor' });
  }
};

const createDetalle = async (req, res) => {
  const newDetalle = req.body;
  try {
    await DetalleConductorModel.createDetalle(newDetalle);
    res.status(201).json({ message: 'Detalle creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el detalle del conductor:', error);
    res.status(500).json({ error: 'Error al crear el detalle del conductor' });
  }
};

const updateDetalle = async (req, res) => {
  const { nro } = req.params;
  const updatedDetalle = req.body;
  try {
    await DetalleConductorModel.updateDetalle(nro, updatedDetalle);
    res.status(200).json({ message: 'Detalle actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el detalle del conductor:', error);
    res.status(500).json({ error: 'Error al actualizar el detalle del conductor' });
  }
};

const deleteDetalle = async (req, res) => {
  const { nro } = req.params;
  try {
    await DetalleConductorModel.deleteDetalle(nro);
    res.status(200).json({ message: 'Detalle eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el detalle del conductor:', error);
    res.status(500).json({ error: 'Error al eliminar el detalle del conductor' });
  }
};

module.exports = {
  getDetalles,
  createDetalle,
  updateDetalle,
  deleteDetalle
};
