const express = require('express');

const app = express();
const tarea_rutas = require('./routes/tarea-routes');

app.use(tarea_rutas);

app.listen(8000);