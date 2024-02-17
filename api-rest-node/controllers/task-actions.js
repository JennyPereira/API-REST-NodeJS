const mongoose = require('mongoose');

const { createError } = require("../helpers/error");
const task = require('../models/task');
const Task = require('../models/task');

const createTask = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const user = "65cfbcaf6b6d1c33e171e67b";

    let taskCreated;
    const newTask = new Task({
        title: title,
        text: text,
        user: new mongoose.Types.ObjectId(user)
    })

    try {
        taskCreated = await newTask.save();
    } catch (error) {
        const err = createError("No ha podido crear tarea", 500);
        return next(err);
    }

    res
        .status(201)
        .json({ message: "Tarea creada", task: taskCreated });
}

const readTask = async (req, res, next) => {
    const user = req.userId;

    let tasks;

    try {
        tasks = await Task.find({ user: user });
    } catch (error) {
        const err = createError("Algo ha ocurrido al momento de obtener tareas", 500);
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
        const err = createError("No ha encontrado tarea", 500);
        return next(err);
    }

    const filter = { _id: task_id };

    let taskUpdated;
    try {
        taskUpdated = await Task.findByIdAndUpdate(filter, req.body, { new: true, runValidators: true });
    } catch (error) {
        const err = createError("No se ha podido modificar la tarea", 500);
        return next(err);
    }

    res
        .status(200)
        .json({ message: "Tarea modificada", task: taskUpdated });
}

exports.createTask = createTask;
exports.readTask = readTask;
exports.updateTask = updateTask;