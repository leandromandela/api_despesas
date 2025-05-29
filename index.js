const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nomeDoBanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));
