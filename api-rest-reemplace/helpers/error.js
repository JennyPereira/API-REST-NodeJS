const createError = (message, code) => {
    const error = new Error(message);
    error.code = code;
    return error;
}

const createandThrowError = (message, code) => {
    const error = createError(message, code);
    throw error;
}

exports.createError = createError;
exports.createandThrowError = createandThrowError;