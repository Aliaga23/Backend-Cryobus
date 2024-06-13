// routes/ubicacionRoutes.js
const express = require('express');
const { getUbicaciones, getUbicacionById, createUbicacion, updateUbicacion, deleteUbicacion } = require('../controllers/ubicacionController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([3]), getUbicaciones); // Ver ubicaciones
router.get('/:id', authenticate, authorize([3]), getUbicacionById); // Ver ubicación específica
router.post('/', authenticate, authorize([3]), createUbicacion); // Crear ubicación
router.put('/:id', authenticate, authorize([3]), updateUbicacion); // Actualizar ubicación
router.delete('/:id', authenticate, authorize([3]), deleteUbicacion); // Eliminar ubicación

module.exports = router;
