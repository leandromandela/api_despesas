const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ✅ CORRIGIDO: usa bcryptjs

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Por favor, insira um email válido'] // valida formato email
  },
  senha: {
    type: String,
    required: true,
    minlength: 6 // define tamanho mínimo para segurança
  }
});

// Antes de salvar, criptografa a senha se foi modificada
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senha na autenticação
userSchema.methods.compararSenha = async function (senhaRecebida) {
  return bcrypt.compare(senhaRecebida, this.senha);
};

module.exports = mongoose.model('User', userSchema);

