const express = require('express');
const router = express.Router();
const notaTrasladoController = require('../controllers/notaTrasladoController');

router.get('/', notaTrasladoController.getNotasTraslado);
router.post('/', notaTrasladoController.createNotaTraslado);
router.put('/:nro', notaTrasladoController.updateNotaTraslado);
router.delete('/:nro', notaTrasladoController.deleteNotaTraslado);

module.exports = router;
