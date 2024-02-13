const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    const token = jwt.sign({ uid: userId },
        process.env.TOKEN_KEY, { expiresIn: '1h' });
    return token;
}


exports.createToken = createToken;