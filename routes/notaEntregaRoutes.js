// routes/notaEntregaRoutes.js

const express = require('express');
const {
  getAllNotasEntrega,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
  getAllUsuarios,
  getAllReembolsos,
  getAllNotasTraslado
} = require('../controllers/notaEntregaController');

const router = express.Router();

router.get('/', getAllNotasEntrega);
router.post('/', createNotaEntrega);
router.put('/:nro', updateNotaEntrega);
router.delete('/:nro', deleteNotaEntrega);
router.get('/usuarios', getAllUsuarios);
router.get('/reembolsos', getAllReembolsos);
router.get('/notasTraslado', getAllNotasTraslado);

module.exports = router;
