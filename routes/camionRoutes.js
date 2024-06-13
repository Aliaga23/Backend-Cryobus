const express = require('express');
const router = express.Router();
const camionController = require('../controllers/camionController');

router.get('/', camionController.getCamiones);
router.get('/:id', camionController.getCamionById);
router.post('/', camionController.createCamion);
router.put('/:id', camionController.updateCamion);
router.delete('/:id', camionController.deleteCamion);

module.exports = router;
