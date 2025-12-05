const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');

router.get('/', diarioController.listar);
router.post('/', diarioController.crear);
router.put('/:id', diarioController.actualizar);
router.delete('/:id', diarioController.eliminar);

module.exports = router;
