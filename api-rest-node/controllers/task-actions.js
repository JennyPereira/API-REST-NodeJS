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

const updateTask = async (req, res, next) => {
    const task_id = req.params.id;
    let task;

    try {
        task = await Task.findOne({ _id: task_id });
    } catch (error) {
        const err = new Error("Algo ha ocurrido al leer tareas");
        return next(err);
    }

    const filter = { _id: task_id };

    let taskUpdated;
    try {
        taskUpdated = await Task.findByIdAndUpdate(filter, req.body, { new: true, runValidators: true });
    } catch (error) {
        const err = new Error("Algo ha ocurrido al modificar tarea");
        return next(err);
    }

    res
        .status(200)
        .json({ message: "Tarea modificada", task: taskUpdated });
}

exports.createTask = createTask;
exports.readTask = readTask;
exports.updateTask = updateTask;