const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Expense = require('../models/Expense');
const User = require('../models/user'); // Importa modelo de usuário para buscar no banco

// Middleware de autenticação atualizado
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Verifica o token e busca o usuário real no banco
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }

    try {
      const user = await User.findById(decoded.id); // Busca pelo ID que foi salvo no token

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      req.user = user; // Anexa o documento completo do usuário à requisição
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  });
}

router.use(authMiddleware);

// GET: listar despesas do usuário autenticado
router.get('/', async (req, res) => {
  try {
    // Busca despesas associadas ao ID do usuário autenticado
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar despesas' });
  }
});

// POST: cadastrar nova despesa
router.post('/', async (req, res) => {
  const { description, amount } = req.body;

  if (!description || !amount) {
    return res.status(400).json({ message: 'Descrição e valor são obrigatórios' });
  }

  try {
    // Cria a nova despesa com o ID do usuário autenticado
    const newExpense = await Expense.create({
      description,
      amount,
      user: req.user._id,
    });

    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar despesa' });
  }
});

module.exports = router;
