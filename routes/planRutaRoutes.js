const express = require('express');
const { getPlanRutas, getPlanRutaById, createPlanRuta, updatePlanRuta, deletePlanRuta } = require('../controllers/planRutaController');

const router = express.Router();

router.get('/', getPlanRutas);
router.get('/:id', getPlanRutaById);
router.post('/', createPlanRuta);
router.put('/:id', updatePlanRuta);
router.delete('/:id', deletePlanRuta);

module.exports = router;
