// 2do controladores 
const camionModel = require('../models/camionModel');

const getCamions = async (req, res) => { // req = leer, res = escribir
    try {
      const Camions = await camionModel.getAllCamions();
      res.json(Camions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const createCamion = async (req, res) => {
    const newCamion = req.body;
    try {
      await camionModel.createCamion(newCamion);
      res.status(201).json({ message: 'Camion creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCamion = async (req, res) => {
    const { nro } = req.params; // destructuracion de javaS
    const updatedCamion = req.body;
    try {
      await camionModel.updateCamion(nro, updatedCamion);
      res.status(200).json({ message: 'Camion actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteCamion = async (req, res) => {
    const { nro } = req.params;
    try {
      await camionModel.deleteCamion(nro);
      res.status(200).json({ message: 'Camion eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getCamions,
    createCamion,
    updateCamion,
    deleteCamion,
  };
  
