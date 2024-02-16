const express = require('express');
const tareaController = require('../controllers/tarea-controller');
const router = express.Router();

router.get('/api/tareas', tareaController.getTareas);

module.exports = router;