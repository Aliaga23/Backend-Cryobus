const express = require('express');
const { getPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso } = require('../controllers/permisoController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize(1), getPermisos); // Solo admin puede ver permisos
router.get('/:id', authenticate, authorize(1), getPermisoById);
router.post('/', authenticate, authorize(1), createPermiso);
router.put('/:id', authenticate, authorize(1), updatePermiso);
router.delete('/:id', authenticate, authorize(1), deletePermiso);

module.exports = router;
