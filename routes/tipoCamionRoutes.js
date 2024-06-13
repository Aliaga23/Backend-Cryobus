const express = require('express');
const router = express.Router();
const tipoCamionController = require('../controllers/tipoCamionController');

router.get('/', tipoCamionController.getTiposCamion);
router.get('/:id', tipoCamionController.getTipoCamionById);
router.post('/', tipoCamionController.createTipoCamion);
router.put('/:id', tipoCamionController.updateTipoCamion);
router.delete('/:id', tipoCamionController.deleteTipoCamion);

module.exports = router;
