const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');

router.get('/', routineController.listar);
router.post('/', routineController.crear);
router.put('/:id', routineController.actualizar);
router.delete('/:id', routineController.eliminar);

module.exports = router;
