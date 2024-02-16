const express = require('express');
const taskActions = require('../controllers/task-actions');

const router = express.Router();

router.post('/task', taskActions.createTask);
router.get('/task', taskActions.readTask);
router.patch('/task/:id', taskActions.updateTask);

module.exports = router;