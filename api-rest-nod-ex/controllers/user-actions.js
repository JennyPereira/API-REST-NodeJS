const User = require('../models/user');
const auth = require('./auth')

const { createError, createandThrowError } = require('../helpers/error')

const verifyCredentials = (email, password) => {
    //Si el correo es erroneo
    if (!email ||
        email.trim().length === 0 ||
        !email.includes('@') ||
        !password ||
        password.trim().length === 0) {
        createandThrowError("Credenciales incorrectos", 422);
    }
}

const checkUserExistence = async (email) => {
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        createandThrowError("Error al crear un usuario", 500)
    }

    if (existingUser) {
        createandThrowError("El usuario ya existe", 422);
    }
}


const createUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        verifyCredentials(email, password);
    } catch (error) {
        return next(error);
    }

    try {
        await checkUserExistence(email);
    } catch (error) {
        return next(error);
    }

    const newUser = new User({
        email: email,
        password: password
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (err) {
        const error = new createError("Problemas al crear nuevo usuario", 500);
        return next(error);
    }

    res
        .status(200)
        .json({ message: 'User created', user: savedUser.toObject() });
}

const verifyUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        verifyCredentials(email, password);
    } catch (error) {
        return next(error);
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new createError("Ha fallado en verificar un usuario", 500);
        return next(error);
    }

    if (!existingUser) {
        const error = createError("Email o password incorrectos", 422);
        return next(error);
    }

    if (existingUser.password !== password) {
        const error = createError("Email o password incorrectos", 422);
        return next(error);
    }

    let token;
    try {
        token = auth.createToken(existingUser.id);
    } catch (err) {
        const error = createError("Algo ha salido mal durante la verificación del usuario");
        return next(error);
    }

    res
        .status(200)
        .json({ message: "usuario logueado", token: token, userId: existingUser.id });
}

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({});
        console.log(users)
    } catch (err) {
        const error = createError("Problemas al encontrar usuarios", 500);
        return next(error);
    }

    res
        .status(200)
        .json({ users: users.map((user) => user.toObject({ getters: true })) });
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.checkUserExistence = checkUserExistence;
exports.verifyUser = verifyUser;