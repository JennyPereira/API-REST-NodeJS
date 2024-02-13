const mongoose = require('mongoose');

const Task = require("../models/task");
const { createError } = require('../helpers/error');

const readTask = async (req, res, next) => {
    const user = req.userId;
    let tasks;

    try {
        tasks = await Task.find({ user: user });
    } catch (err) {
        const error = createError("Algo ha ocurrido al obtener sus tareas", 500);
        return next(error);
    }

    res
        .status(200)
        .json({ tasks: tasks.map((task) => task.toObject({ getters: true })) });
}

const createTask = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const user = req.userId;

    let taskCreated;

    const newTask = new Task({
        title: title,
        text: text,
        user: new mongoose.Types.ObjectId(user)
    });

    try {
        taskCreated = await newTask.save();
    } catch (err) {
        const error = createError("Algo ha ocurrido mal al crear una tarea", 500);
        return next(error);
    }

    res
        .status(201)
        .json({ message: "Tarea creada", task: taskCreated.toObject() })
}


const updateTask = async (req, res, next) => {
    const task_id = req.params.id;
    let task;

    try {
        task = await Task.findOne({ _id: task_id });
    } catch (err) {
        const error = createError("No se ha podido modificar la tarea", 500);
        return next(error);
    }

    if (task.user.toString() !== req.userId) {
        const error = createError("Usuario no autorizado para esta acción", 403);
        return next(error);
    }

    const filter = { _id: task_id };

    let taskUpdated;
    try {
        taskUpdated = await Task.findByIdAndUpdate(filter, req.body, { new: true, runValidators: true, });
    } catch (err) {
        const error = createError("No se ha podido modificar la tarea", 500);
        return next(error);
    }

    res
        .status(200)
        .json({ message: "Tarea modificada", task: taskUpdated.toObject() });
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;

    let task;

    try {
        task = await Task.findOne({ _id: taskId });
    } catch (err) {
        const error = createError("Algo ha ocurrido mal", 500);
        return next(error);
    }

    if (task.user.toString() != req.userId) {
        const error = createError("Usuario no autorizado para esta acción", 403);
        return next(error);
    }

    try {
        await Task.deleteOne({ _id: taskId });
    } catch (err) {
        const error = createError("Algo ha ocurrido mal", 500);
        return next(error)
    }

    res
        .status(200)
        .json({ message: "Elemento eliminado" });
}

exports.createTask = createTask;
exports.readTask = readTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;