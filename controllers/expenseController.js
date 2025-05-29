const Expense = require('../models/expense');

// 🔍 Listar todas as despesas do usuário autenticado
exports.listarDespesas = async (req, res, next) => {
  try {
    const despesas = await Expense.find({ user: req.user.id }).sort({ data: -1 });
    res.status(200).json(despesas);
  } catch (err) {
    next(err);
  }
};

// 📝 Cadastrar nova despesa
exports.cadastrarDespesa = async (req, res, next) => {
  try {
    const { descricao, valor, data, categoria } = req.body;

    if (!descricao || !valor || !data || !categoria) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const despesa = new Expense({
      descricao,
      valor,
      data,
      categoria,
      user: req.user.id
    });

    await despesa.save();
    res.status(201).json(despesa);
  } catch (err) {
    next(err);
  }
};

// ✏️ Atualizar despesa existente
exports.atualizarDespesa = async (req, res, next) => {
  try {
    const despesa = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!despesa) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }

    res.status(200).json(despesa);
  } catch (err) {
    next(err);
  }
};

// 🗑️ Deletar despesa
exports.deletarDespesa = async (req, res, next) => {
  try {
    const despesa = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!despesa) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }

    res.status(200).json({ message: 'Despesa removida com sucesso' });
  } catch (err) {
    next(err);
  }
};
