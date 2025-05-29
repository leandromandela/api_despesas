const User = require('../models/user');
const jwt = require('jsonwebtoken');

function gerarToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Registro de usuário
exports.registrar = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const existeUser = await User.findOne({ email });
    if (existeUser) return res.status(400).json({ message: 'Email já cadastrado' });

    const user = new User({ email, senha });
    await user.save();

    const token = gerarToken(user);
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const senhaValida = await user.compararSenha(senha);
    if (!senhaValida) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = gerarToken(user);
    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};
