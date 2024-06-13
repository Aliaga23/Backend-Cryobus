const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize([32]), getUsers); // Ver usuarios
router.get('/:id', authenticate, authorize([32]), getUserById); // Ver usuarios
router.post('/', authenticate, authorize([13]), createUser); // Gestionar usuarios
router.put('/:id', authenticate, authorize([13]), updateUser); // Gestionar usuarios
router.delete('/:id', authenticate, authorize([13]), deleteUser); // Gestionar usuarios

module.exports = router;
