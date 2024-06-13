// 3ero routes/roleRoutes.js
const express = require('express'); // framework de nodejs para construir api's y apps webs
const { getCamions, createCamion, updateCamion, deleteCamion } = require('../controllers/camionController');
                                                     //obteniendo todo desde source controller
const router = express.Router();     //.router objeto de express para definir rutas 

router.get('/', getCamions);         // get = obtener todo los "roles" del path asignado a ese router
router.post('/', createCamion);      // post = crear nuevos "roles"(recursos) al path asignado
router.put('/:nro', updateCamion);    // actualiza desde un parametro nro
router.delete('/:nro', deleteCamion);

module.exports = router;
