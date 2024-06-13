const express = require('express');
const { getConductores, createConductor, updateConductor, deleteConductor } = require('../controllers/conductorController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([16]), getConductores); // Cambia el permiso según corresponda
router.post('/', authenticate, authorize([2]), createConductor); // Cambia el permiso según corresponda
router.put('/:codigo', authenticate, authorize([2]), updateConductor); // Cambia el permiso según corresponda
router.delete('/:codigo', authenticate, authorize([2]), deleteConductor); // Cambia el permiso según corresponda

module.exports = router;
