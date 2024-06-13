const express = require('express');
const { getRoles, getRoleById, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { authenticate, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorizeRole(1), getRoles);
router.get('/:id', authenticate, authorizeRole(1), getRoleById);
router.post('/', authenticate, authorizeRole(1), createRole);
router.put('/:id', authenticate, authorizeRole(1), updateRole);
router.delete('/:id', authenticate, authorizeRole(1), deleteRole);

module.exports = router;
