const task = require('../models/task');
const Task = require('../models/task');

const createTask = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    let taskCreated;
    const newTask = new Task({
        title: title,
        text: text
    })

    try {
        taskCreated = await newTask.save();
    } catch (error) {
        const err = new Error("Algo ha ocurrido al crear tarea");
        return next(err);
    }

    res
        .status(201)
        .json({ message: "Tarea creada", task: taskCreated });
}

const readTask = async (req, res, next) => {
    let tasks;

    try {
        tasks = await Task.find({});
    } catch (error) {
        const err = new Error("Algo ha ocurrido al crear tarea");
        return next(err);
    }

    res
        .status(200)
        .json({ tasks: tasks });
}

exports.createTask = createTask;
exports.readTask = readTask;