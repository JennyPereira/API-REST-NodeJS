const express = require("express");
const taskActions = require("../controllers/task-actions");

const router = express.Router();

router.get("/task", taskActions.readTask);
router.post("/tasks", taskActions.createTask);
router.patch("/tasks/:id", taskActions.updateTask);
router.delete("/task/:id", taskActions.deleteTask);

module.exports = router;
