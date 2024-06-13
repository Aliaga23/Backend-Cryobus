const express = require('express');
const { getTipoPaquetes, getTipoPaqueteById, createTipoPaquete, updateTipoPaquete, deleteTipoPaquete } = require('../controllers/tipoPaqueteController');

const router = express.Router();

router.get('/', getTipoPaquetes);
router.get('/:id', getTipoPaqueteById);
router.post('/', createTipoPaquete);
router.put('/:id', updateTipoPaquete);
router.delete('/:id', deleteTipoPaquete);

module.exports = router;
