const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

router.get('/', ubicacionController.getUbicaciones);
router.post('/', ubicacionController.createUbicacion);
router.put('/:id', ubicacionController.updateUbicacion);
router.delete('/:id', ubicacionController.deleteUbicacion);

module.exports = router;
