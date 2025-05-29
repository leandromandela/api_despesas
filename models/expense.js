const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  categoria: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // ref com U maiúsculo
});

module.exports = mongoose.model('Expense', expenseSchema);  // nome do modelo com E maiúsculo
