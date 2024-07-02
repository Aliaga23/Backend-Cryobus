const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.get('/',  entregaController.getEntregas);
router.post('/', entregaController.createEntrega);

module.exports = router;
