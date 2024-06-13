const express = require('express');
const router = express.Router();
const localidadController = require('../controllers/localidadController');

router.get('/', localidadController.getLocalidades);
router.post('/', localidadController.createLocalidad);
router.put('/:nombre/:nombreDepartamento', localidadController.updateLocalidad);
router.delete('/:nombre/:nombreDepartamento', localidadController.deleteLocalidad);

module.exports = router;
