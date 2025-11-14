const express = require('express');
const router = express.Router();
const controller = require('../controllers/ventaController');

router.get('/', controller.listar);
router.get('/:id', controller.obtenerPorId); 
router.post('/', controller.crear);

module.exports = router;
