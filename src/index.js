require('dotenv').config();
require('./db/connection');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const router = require('./routes/index')

app.use(express.json())


app.use(router)

app.listen(PORT, () => {
    console.log('Server is up on port >>', PORT)
})