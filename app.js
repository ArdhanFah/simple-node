require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const router = require('./routes/route')
const app = express();

app.use(express.json())
app.use(router)

app.listen(process.env.APP_PORT, (req, res) => {
    console.log("app running on port", process.env.APP_PORT);
})

module.exports = app;