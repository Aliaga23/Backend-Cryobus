const express = require('express');
const router = express.Router();
const {
  getTipoPaquetes,
  getTipoPaqueteById,
  createTipoPaquete,
  updateTipoPaquete,
  deleteTipoPaquete
} = require('../controllers/tipoPaqueteController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize([28]), getTipoPaquetes);
router.get('/:id', authenticate, authorize([28]), getTipoPaqueteById);
router.post('/', authenticate, authorize([11]), createTipoPaquete);
router.put('/:id', authenticate, authorize([11]), updateTipoPaquete);
router.delete('/:id', authenticate, authorize([11]), deleteTipoPaquete);

module.exports = router;
