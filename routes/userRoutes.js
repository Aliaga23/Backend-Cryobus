const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.post('/', authenticate, authorize(1), createUser); // Ejemplo de autorización por rol
router.put('/:id', authenticate, authorize(1), updateUser); // Ejemplo de autorización por rol
router.delete('/:id', authenticate, authorize(1), deleteUser); // Ejemplo de autorización por rol

module.exports = router;
