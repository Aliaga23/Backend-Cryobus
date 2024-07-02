const express = require('express');
const router = express.Router();
const recepcionController = require('../controllers/recepcionController');

router.get('/', recepcionController.getRecepciones);
router.post('/', recepcionController.createRecepcion);

module.exports = router;
