const User = require('../models/user');

const verifyCredentials = (email, password) => {
    //False, "     ", jenn, False, "" 
    if (!email
        || email.trim().length === 0
        || email.includes('@')
        || !password
        || password.trim().length === 0) {
        throw new Error("Credenciles incorrectas");
    }
}

const chechUserExistence = async (email) => {

}

const createUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        verifyCredentials(email, password);
    } catch (error) {
        const err = new Error("Credenciles incorrectas");
        return next(err);
    }

    try {

    } catch (error) {

    }
}