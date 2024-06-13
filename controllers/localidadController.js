const localidadModel = require('../models/localidadModel');

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
  try {
    const newLocalidad = await localidadModel.createLocalidad(req.body);
    res.status(201).json(newLocalidad);
  } catch (error) {
    console.error('Error al crear localidad:', error);
    res.status(500).json({ error: 'Error al crear localidad' });
  }
};

const updateLocalidad = async (req, res) => {
  try {
    const updatedLocalidad = await localidadModel.updateLocalidad(req.params.nombre, req.params.nombreDepartamento, req.body);
    res.json(updatedLocalidad);
  } catch (error) {
    console.error('Error al actualizar localidad:', error);
    res.status(500).json({ error: 'Error al actualizar localidad' });
  }
};

const deleteLocalidad = async (req, res) => {
  try {
    await localidadModel.deleteLocalidad(req.params.nombre, req.params.nombreDepartamento);
    res.status(204).json();
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
