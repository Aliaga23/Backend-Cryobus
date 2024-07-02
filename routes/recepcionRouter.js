const express = require('express');
const router = express.Router();
const recepcionController = require('../controllers/recepcionController');

router.get('/', recepcionController.getRecepciones);
router.get('/:nro', recepcionController.getRecepcionByNRO);
router.post('/', recepcionController.createOrUpdateRecepcion);
router.put('/:nro', recepcionController.createOrUpdateRecepcion);

module.exports = router;
