// database.js

const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log('MongoDB conectado!');
    } else {
      console.log('MongoDB já está conectado.');
    }
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    throw error; // para tratar erro no código que chama connectDB
  }
}

module.exports = { connectDB, mongoose };
