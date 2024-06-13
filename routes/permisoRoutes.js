// routes/permisoRoutes.js
const express = require('express');
const { getPermisos, getPermisoById, createPermiso, updatePermiso, deletePermiso, getPermisosByUserId } = require('../controllers/permisoController');

const router = express.Router();

router.get('/', getPermisos);
router.get('/:id', getPermisoById);
router.get('/user/:userId', getPermisosByUserId); // Nueva ruta para obtener permisos por ID de usuario
router.post('/', createPermiso);
router.put('/:id', updatePermiso);
router.delete('/:id', deletePermiso);

module.exports = router;
