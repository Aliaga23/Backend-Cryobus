const express = require('express');
const { fetchAllNotasEntrega } = require('../controllers/reporteGeneralController');

const router = express.Router();

router.get('/', fetchAllNotasEntrega);

module.exports = router;
