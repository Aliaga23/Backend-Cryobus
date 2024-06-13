/ routes/permisoRolRoutes.js
const express = require('express');
const { getPermisosByRolId, createPermisoRol, deletePermisoRol } = require('../controllers/permisoRolController');

const router = express.Router();

router.get('/:idRol', getPermisosByRolId);
router.post('/:idRol', createPermisoRol);
router.delete('/:idRol/:nro', deletePermisoRol);

module.exports = router;