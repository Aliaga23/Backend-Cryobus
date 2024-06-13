const departamentoModel = require('../models/departamentoModel');

const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await departamentoModel.getDepartamentos();
    res.json(departamentos);
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
};

const createDepartamento = async (req, res) => {
  try {
    const newDepartamento = await departamentoModel.createDepartamento(req.body);
    res.status(201).json(newDepartamento);
  } catch (error) {
    console.error('Error al crear departamento:', error);
    res.status(500).json({ error: 'Error al crear departamento' });
  }
};

const updateDepartamento = async (req, res) => {
  try {
    const updatedDepartamento = await departamentoModel.updateDepartamento(req.params.nombre, req.body);
    res.json(updatedDepartamento);
  } catch (error) {
    console.error('Error al actualizar departamento:', error);
    res.status(500).json({ error: 'Error al actualizar departamento' });
  }
};

const deleteDepartamento = async (req, res) => {
  try {
    await departamentoModel.deleteDepartamento(req.params.nombre);
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar departamento:', error);
    res.status(500).json({ error: 'Error al eliminar departamento' });
  }
};

module.exports = {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};
