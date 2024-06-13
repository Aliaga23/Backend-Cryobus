const express = require('express');
const router = express.Router();
const localidadController = require('../controllers/localidadController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize([17]), localidadController.getLocalidades);
router.post('/', authenticate, authorize([3]), localidadController.createLocalidad);
router.put('/:nombre/:nombreDepartamento', authenticate, authorize([3]), localidadController.updateLocalidad);
router.delete('/:nombre/:nombreDepartamento', authenticate, authorize([3]), localidadController.deleteLocalidad);

module.exports = router;
