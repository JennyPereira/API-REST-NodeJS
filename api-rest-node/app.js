const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');
const verifyUser = require('./middleware/user-auth');

app.use(bodyParser.json());

app.use(userRoutes);
app.use(verifyUser, taskRoutes);

app.use((err, req, res, next) => {
    let code = 500;
    let message = "Algo ha ocurrido mal";


    if (err.code) {
        code = err.code;
    }

    if (err.message) {
        message = err.message;
    }

    res
        .status(code)
        .json({ message: message, code: code });
});

mongoose.connect(
    process.env.MONGO_CONNECTION_URI
).then(() => {
    app.listen(3000)
}).catch(err => {
    console.error(err);
})
