const express = require('express');
const { getEstadosEntrega, getEstadoEntregaById, createEstadoEntrega, updateEstadoEntrega, deleteEstadoEntrega } = require('../controllers/estadoEntregaController');

const router = express.Router();

router.get('/', getEstadosEntrega);
router.get('/:id', getEstadoEntregaById);
router.post('/', createEstadoEntrega);
router.put('/:id', updateEstadoEntrega);
router.delete('/:id', deleteEstadoEntrega);

module.exports = router;
