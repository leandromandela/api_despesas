const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth'); // renomeie se quiser

// Rotas protegidas por autenticação JWT
router.get('/', auth, expenseController.listarDespesas);
router.post('/', auth, expenseController.cadastrarDespesa);
router.put('/:id', auth, expenseController.atualizarDespesa);
router.delete('/:id', auth, expenseController.deletarDespesa);

module.exports = router;