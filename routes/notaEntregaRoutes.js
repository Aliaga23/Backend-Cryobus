// routes/notasEntregaRoutes.js
const express = require('express');
const {
  getAllNotasEntrega,
  getNotaEntregaById,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
} = require('../controllers/notaEntregaController');

const router = express.Router();

router.get('/', getAllNotasEntrega);
router.get('/:id', getNotaEntregaById);
router.post('/', createNotaEntrega);
router.put('/:id', updateNotaEntrega);
router.delete('/:id', deleteNotaEntrega);

module.exports = router;
