// routes/notaTrasladoRoutes.js
const express = require('express');
const { registrarSalidaPaquete, getNotasTraslado } = require('../controllers/registrarSalidaController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.put('/registrar-salida-paquete', authenticate, authorize([2]), registrarSalidaPaquete); // Cambia el permiso según corresponda
router.get('/', authenticate, authorize([16]), getNotasTraslado); // Ruta para obtener todas las notas de traslado

module.exports = router;
