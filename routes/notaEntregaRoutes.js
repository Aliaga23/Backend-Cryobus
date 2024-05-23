// routes/notaEntregaRoutes.js
const express = require('express');
const notaEntregaController = require('../controllers/notaEntregaController');
const router = express.Router();

router.get('/', notaEntregaController.getNotasEntrega);
router.get('/:id', notaEntregaController.getNotaEntrega);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:id', notaEntregaController.updateNotaEntrega);
router.delete('/:id', notaEntregaController.deleteNotaEntrega);

module.exports = router;
