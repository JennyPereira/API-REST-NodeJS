const jwt = require('jsonwebtoken');
const { createError, createandThrowError } = require('../helpers/error');

//Bearer 
const retrieveToken = (headers) => {
    if (!headers.authorization || headers.authorization === '') {
        createandThrowError("Autorización denegada", 401);
    }

    const token = headers.authorization.split(" ")[1];

    if (!token || token == "") {
        createandThrowError("Autorización denegada", 401);
    }

    return token;
}

const verifyUser = (req, res, next) => {
    let token;

    try {
        token = retrieveToken(req.headers);
    } catch (error) {
        return next(error);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (error) {
        const err = createError("Token inválido", 401);
        return next(err);
    }

    req.userId = decoded.uid;

    next();
}

module.exports = verifyUser;