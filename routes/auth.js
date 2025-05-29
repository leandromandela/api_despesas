const express = require('express');
const router = express.Router();

// Rota de exemplo para registro/login
router.post('/login', (req, res) => {
  // lógica de login aqui
  res.json({ message: 'Login funcionando' });
});

router.post('/register', (req, res) => {
  // lógica de registro aqui
  res.json({ message: 'Registro funcionando' });
});

module.exports = router;
