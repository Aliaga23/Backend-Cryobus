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
router.get('/:nro', getRecepcionById);
router.post('/', createRecepcion);
router.put('/:nro', updateRecepcion);
router.delete('/:nro', deleteRecepcion);

module.exports = router;
