// backend/routes/notaEntregaRoutes.js
const express = require('express');
const { fetchAllNotasEntrega } = require('../controllers/reporteEntregaController');

const router = express.Router();

router.get('/', fetchAllNotasEntrega);

module.exports = router;
