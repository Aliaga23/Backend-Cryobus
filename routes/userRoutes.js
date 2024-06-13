const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser,changePassword } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([30]), getUsers); // Ver usuarios
router.get('/:id', authenticate, authorize([30]), getUserById); // Ver usuario específico
router.post('/', authenticate, authorize([13]), createUser); // Crear usuario
router.put('/:id', authenticate, authorize([13]), updateUser); // Actualizar usuario
router.delete('/:id', authenticate, authorize([13]), deleteUser); // Eliminar usuario
router.post('/change-password', authenticate, changePassword);

module.exports = router;
