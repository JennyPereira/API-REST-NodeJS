const jwt = require("jsonwebtoken");
const { createError, createandThrowError } = require('../helpers/error');

const retrieveToken = (headers) => {

    if (!headers.authorization || headers.authorization === '') {
        createandThrowError("Autorización denegada", 401);
    }

    const token = headers.authorization.split(" ")[1];

    if (!token || token === '') {
        createandThrowError("Autorización denegada", 401);
    }

    return token;
}

const verifyUser = async (req, res, next) => {
    let token;

    try {
        token = retrieveToken(req.headers);
    } catch (error) {
        return next(error);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        const error = createError("Token invalido", 401);
        return next(error);
    }

    req.userId = decoded.uid;
    next();
}

module.exports = verifyUser;
exports.verifyUser = verifyUser;