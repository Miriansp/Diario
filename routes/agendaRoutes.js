const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/', agendaController.listar);
router.post('/', agendaController.crear);
router.put('/:id', agendaController.actualizar);
router.delete('/:id', agendaController.eliminar);

module.exports = router;
