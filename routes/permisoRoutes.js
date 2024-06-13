const express = require('express');
const { getPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso } = require('../controllers/permisoController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

const VIEW_PERMISSIONS = 32;  // Permiso para ver
const MANAGE_PERMISSIONS = 13;  // Permiso para gestionar

router.get('/', authenticate, authorize(VIEW_PERMISSIONS), getPermisos);
router.get('/:id', authenticate, authorize(VIEW_PERMISSIONS), getPermisoById);
router.post('/', authenticate, authorize(MANAGE_PERMISSIONS), createPermiso);
router.put('/:id', authenticate, authorize(MANAGE_PERMISSIONS), updatePermiso);
router.delete('/:id', authenticate, authorize(MANAGE_PERMISSIONS), deletePermiso);

module.exports = router;
