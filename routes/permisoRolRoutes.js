const express = require('express');
const { getPermisosByRolId, createPermisoRol, deletePermisoRol } = require('../controllers/permisoRolController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/:idRol', authenticate, authorize(1), getPermisosByRolId); // Solo admin puede ver permisos de roles
router.post('/:idRol', authenticate, authorize(1), createPermisoRol); // Solo admin puede asignar permisos
router.delete('/:idRol/:nro', authenticate, authorize(1), deletePermisoRol); // Solo admin puede revocar permisos

module.exports = router;
