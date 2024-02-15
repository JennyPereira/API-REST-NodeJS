const express = require('express');
const app = express();
//callback
app.get('/', function (req, res) {
    const a = "<h1>Hola mundo</h1>";
    res.send(a);
})

app.listen(3000);