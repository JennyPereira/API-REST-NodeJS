const express = require('express');
const taskActions = require('../controllers/task-actions');

const router = express.Router();

router.post('/task', taskActions.createTask);
router.get('/task', taskActions.readTask);

module.exports = router;