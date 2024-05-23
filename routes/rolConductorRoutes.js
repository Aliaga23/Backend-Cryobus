// routes/rolConductorRoutes.js
const express = require('express');
const { getRolConductors, getRolConductorById, createRolConductor, updateRolConductor, deleteRolConductor } = require('../controllers/rolConductorController');

const router = express.Router();

router.get('/', getRolConductors);
router.get('/:id', getRolConductorById);
router.post('/', createRolConductor);
router.put('/:id', updateRolConductor);
router.delete('/:id', deleteRolConductor);

module.exports = router;
