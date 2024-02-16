const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');

app.use(bodyParser.json());

app.use(userRoutes);
app.use(taskRoutes);

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
    "mongodb+srv://jenn:CUys7pYnw-J3G2!@personal-db.n9edusg.mongodb.net/"
).then(() => {
    app.listen(3000)
}).catch(err => {
    console.error(err);
})
