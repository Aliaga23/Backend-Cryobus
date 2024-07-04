// backend/controllers/notaEntregaController.js
const { getAllNotasEntrega } = require('../models/reporteEntregaModel');

const fetchAllNotasEntrega = async (req, res) => {
  try {
    const notasEntrega = await getAllNotasEntrega();
    res.json(notasEntrega);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas de entrega', error });
  }
};

module.exports = {
  fetchAllNotasEntrega,
};
