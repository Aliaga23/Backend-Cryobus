const PlanRutaModel = require('../models/planRutaModel');

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
  try {
    await PlanRutaModel.createPlanRuta(newPlanRuta);
    res.status(201).json({ message: 'Plan de ruta creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePlanRuta = async (req, res) => {
  const { id } = req.params;
  const updatedPlanRuta = req.body;
  try {
    await PlanRutaModel.updatePlanRuta(id, updatedPlanRuta);
    res.status(200).json({ message: 'Plan de ruta actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlanRuta = async (req, res) => {
  const { id } = req.params;
  try {
    await PlanRutaModel.deletePlanRuta(id);
    res.status(200).json({ message: 'Plan de ruta eliminado exitosamente' });
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
