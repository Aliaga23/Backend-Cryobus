const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/', departamentoController.getDepartamentos);
router.post('/', departamentoController.createDepartamento);
router.put('/:nombre', departamentoController.updateDepartamento);
router.delete('/:nombre', departamentoController.deleteDepartamento);

module.exports = router;
