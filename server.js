// server.js
require('dotenv').config(); // Carrega as variáveis do .env
const mongoose = require('mongoose');
const app = require('./app'); // seu arquivo com o app Express

const PORT = process.env.PORT || 3001;  // em vez de 3000

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB conectado!');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})
.catch((err) => {
  console.error('Erro ao conectar no MongoDB:', err);
});
