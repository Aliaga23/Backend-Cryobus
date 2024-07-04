// routes/notaTrasladoRoutes.js
const express = require('express');
const { registrarLlegadaPaquete, getNotasTraslado } = require('../controllers/registrarLlegadaController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.put('/registrar-llegada-paquete', authenticate, authorize([2]), registrarLlegadaPaquete); // Cambia el permiso según corresponda
router.get('/', authenticate, authorize([16]), getNotasTraslado); // Ruta para obtener todas las notas de traslado

module.exports = router;
