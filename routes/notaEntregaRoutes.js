// routes/notaEntregaRoutes.js

const express = require('express');
const router = express.Router();
const notaEntregaController = require('../controllers/notaEntregaController');

router.get('/', notaEntregaController.getAllNotasEntrega);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:id', notaEntregaController.updateNotaEntrega);
router.delete('/:id', notaEntregaController.deleteNotaEntrega);

module.exports = router;
