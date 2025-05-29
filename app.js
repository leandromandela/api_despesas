const express = require('express');
const { connectDB } = require('./database'); // <-- certifique-se que o caminho está correto

const app = express();

connectDB('mongodb://localhost:27017/despesas');

app.use(express.json());

// suas rotas aqui...

module.exports = app;
