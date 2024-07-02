const express = require('express');
const { getReembolsos, createReembolso, updateReembolso, deleteReembolso } = require('../controllers/reembolsoController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([30]), getReembolsos); // Ver reembolsos
router.post('/', authenticate, authorize([13]), createReembolso); // Crear reembolso
router.put('/:nro', authenticate, authorize([13]), updateReembolso); // Actualizar reembolso
router.delete('/:nro', authenticate, authorize([13]), deleteReembolso); // Eliminar reembolso

module.exports = router;
