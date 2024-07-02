const express = require('express');
const { getAllDetalles, createDetalle, updateDetalle, deleteDetalle } = require('../controllers/detalleConductorController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([16]), getAllDetalles); // Cambia el permiso según corresponda
router.post('/', authenticate, authorize([2]), createDetalle); // Cambia el permiso según corresponda
router.put('/:nro', authenticate, authorize([2]), updateDetalle); // Cambia el permiso según corresponda
router.delete('/:nro', authenticate, authorize([2]), deleteDetalle); // Cambia el permiso según corresponda

module.exports = router;
