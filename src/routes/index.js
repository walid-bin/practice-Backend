const userRoutes = require('./userRouts');
const express = require('express');
const app = express();

const v1 = [
    userRoutes,
]
app.use(express.json())
app.use('/v1',v1);

module.exports = app;