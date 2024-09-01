// backend/src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;
