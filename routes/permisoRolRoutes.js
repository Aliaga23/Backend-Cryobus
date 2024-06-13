const express = require('express');
const { getPermisosByRolId, createPermisoRol, deletePermisoRol } = require('../controllers/permisoRolController');
const { authenticate, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/:idRol', authenticate, authorizeRole(1), getPermisosByRolId);
router.post('/:idRol', authenticate, authorizeRole(1), createPermisoRol);
router.delete('/:idRol/:nro', authenticate, authorizeRole(1), deletePermisoRol);

module.exports = router;
