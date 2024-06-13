const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize([17]),departamentoController.getDepartamentos);
router.post('/', authenticate, authorize([3]), departamentoController.createDepartamento);
router.put('/:nombre', authenticate, authorize([3]), departamentoController.updateDepartamento);
router.delete('/:nombre', authenticate, authorize([3]), departamentoController.deleteDepartamento);

module.exports = router;
