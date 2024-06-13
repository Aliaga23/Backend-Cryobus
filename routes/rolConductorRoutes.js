// routes/rolConductorRoutes.js
const express = require('express');
const { getRolConductors, getRolConductorById, createRolConductor, updateRolConductor, deleteRolConductor } = require('../controllers/rolConductorController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([27]), getRolConductors);
router.get('/:id', authenticate, authorize([27]),  getRolConductorById);
router.post('/', authenticate, authorize([10]),  createRolConductor);
router.put('/:id', authenticate, authorize([10]), updateRolConductor);
router.delete('/:id', authenticate, authorize([10]),  deleteRolConductor);

module.exports = router;
