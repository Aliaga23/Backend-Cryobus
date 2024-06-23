const express = require('express');
const { getPlanRutas, getPlanRutaById, createPlanRuta, updatePlanRuta, deletePlanRuta } = require('../controllers/planRutaController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/',  authenticate, authorize([8]),getPlanRutas);
router.get('/:id',  authenticate, authorize([8]),getPlanRutaById);
router.post('/', authenticate, authorize([25]) ,createPlanRuta);
router.put('/:id',  authenticate, authorize([25]),updatePlanRuta);
router.delete('/:id',  authenticate, authorize([25]),deletePlanRuta);

module.exports = router;
