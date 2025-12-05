const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.get('/', metaController.listar);
router.post('/', metaController.crear);
router.put('/:id', metaController.actualizar);
router.delete('/:id', metaController.eliminar);

module.exports = router;
