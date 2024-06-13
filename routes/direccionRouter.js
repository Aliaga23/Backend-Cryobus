const express = require('express');
const { getDirecciones, createDireccion, updateDireccion, deleteDireccion } = require('../controllers/direccionController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([3,17]), getDirecciones); // Añade los permisos adecuados
router.post('/', authenticate, authorize([3]), createDireccion); // Añade los permisos adecuados
router.put('/:id', authenticate, authorize([3]), updateDireccion); // Añade los permisos adecuados
router.delete('/:id', authenticate, authorize([ 3]), deleteDireccion); // Añade los permisos adecuados

module.exports = router;
