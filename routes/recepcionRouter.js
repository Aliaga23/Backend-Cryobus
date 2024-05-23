// routes/recepcionRoutes.js
const express = require('express');
const {
  getAllRecepciones,
  getRecepcionById,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion
} = require('../controllers/recepcionController');

const router = express.Router();

router.get('/', getAllRecepciones);
router.get('/:id', getRecepcionById);
router.post('/', createRecepcion);
router.put('/:id', updateRecepcion);
router.delete('/:id', deleteRecepcion);

module.exports = router;
