// routes/recepcionRoutes.js
const express = require('express');
const router = express.Router();
const recepcionController = require('../controllers/recepcionController');

router.get('/', recepcionController.getRecepciones);
router.get('/:nro', recepcionController.getRecepcionById);
router.post('/', recepcionController.createRecepcion);
router.put('/:nro', recepcionController.updateRecepcion);
router.delete('/:nro', recepcionController.deleteRecepcion);
router.get('/clientes', recepcionController.getClientes);
router.get('/paquetes', recepcionController.getPaquetes);

module.exports = router;
