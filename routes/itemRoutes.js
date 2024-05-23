// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.get('/:codigopaquete/:nro', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:codigopaquete/:nro', itemController.updateItem);
router.delete('/:codigopaquete/:nro', itemController.deleteItem);

module.exports = router;
