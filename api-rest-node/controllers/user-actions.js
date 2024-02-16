const User = require('../models/user');
const { createError, createandThrowError } = require('../helpers/error');

const verifyCredentials = (email, password) => {
    //False, "     ", jenn, False, "" 
    if (!email
        || email.trim().length === 0
        || !email.includes('@')
        || !password
        || password.trim().length === 0) {
        createandThrowError("Credenciales incorrectos", 422);
    }
}

//example@gmail.com
const chechUserExistence = async (email) => {
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        createandThrowError("Error al encontrar email", 500);
    }

    //json
    //undenined

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
        await chechUserExistence(email);
    } catch (error) {
        return next(error);
    }

    const newUser = new User({
        email: email,
        password: password
    })

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (error) {
        const err = new createError("Algo ha ocurrido al crear un nuevo usuario", 500);
        return next(err);
    }

    res
        .status(201)
        .json({ message: "Usuario creado", user: savedUser });
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
    } catch (error) {
        const err = createError("Ha fallado en verificar un usario", 500);
        return next(err);
    }

    if (existingUser.password !== password) {
        const error = createError("Email o password incorrectos", 422);
        return next(error);
    }

    res
        .status(200)
        .json({ message: "Usuario logueado", userId: existingUser.id });
}

exports.createUser = createUser;
exports.verifyUser = verifyUser;