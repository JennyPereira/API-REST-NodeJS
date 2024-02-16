const User = require('../models/user');

const verifyCredentials = (email, password) => {
    //False, "     ", jenn, False, "" 
    if (!email
        || email.trim().length === 0
        || !email.includes('@')
        || !password
        || password.trim().length === 0) {
        throw new Error("Credenciles incorrectas");
    }
}

//example@gmail.com
const chechUserExistence = async (email) => {
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        throw new Error("Algo ha sucedido mal al checkear Usuario");
    }

    if (existingUser) {
        throw new Error("El usuario ya existe");
    }
}

const createUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        verifyCredentials(email, password);
    } catch (error) {
        const err = new Error("Credenciles incorrectas");
        return next(err);
    }

    try {
        await chechUserExistence(email);
    } catch (error) {
        const err = new Error("Usuario existente");
        return next(err);
    }

    const newUser = new User({
        email: email,
        password: password
    })

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (error) {
        const err = new Error("Algo ha ocurrido al crear un nuevo usuario");
        return next(err);
    }

    res
        .status(201)
        .json({ message: "Usuario creado", user: savedUser });
}

exports.createUser = createUser;