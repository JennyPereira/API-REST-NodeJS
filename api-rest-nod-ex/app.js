const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require('dotenv').config();

const taskRoutes = require("./routes/task-routes")
const userRoutes = require('./routes/user-routes')

const verifyUser = require('./middleware/user-auth')

const app = express();

app.use(bodyParser.json());
app.use(userRoutes);
app.use(verifyUser, taskRoutes);


app.use((err, req, res, next) => {
    let code = 500;
    let message = "Something went wrong";

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
    process.env.MONGODB_CONNECTION_URI,
).then(() => {
    app.listen(3000)
}).catch(error => {
    console.log(error);
});
