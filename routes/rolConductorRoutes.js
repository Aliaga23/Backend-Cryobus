// routes/rolConductorRoutes.js
const express = require('express');
const {
  getRolConductors,
  getRolConductorById,
  createRolConductor,
  updateRolConductor,
  deleteRolConductor
} = require('../controllers/rolConductorController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([30]), getRolConductors); // Ver roles de conductores
router.get('/:id', authenticate, authorize([30]), getRolConductorById); // Ver un rol de conductor específico
router.post('/', authenticate, authorize([13]), createRolConductor); // Crear un rol de conductor
router.put('/:id', authenticate, authorize([13]), updateRolConductor); // Actualizar un rol de conductor
router.delete('/:id', authenticate, authorize([13]), deleteRolConductor); // Eliminar un rol de conductor

module.exports = router;