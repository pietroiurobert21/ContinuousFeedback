const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// const expressOasGenerator = require('express-oas-generator')
// expressOasGenerator.init(app, {});

module.exports = app;