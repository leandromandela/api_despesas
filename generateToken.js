const jwt = require('jsonwebtoken');

// Payload com informações do usuário que serão codificadas no token
const payload = {
  id: '123456',                  // ID do usuário (use um real no seu sistema)
  email: 'usuario@exemplo.com',  // Email do usuário
};

// Segredo para assinar o token — sempre use o mesmo no seu app e testes!
// Pode vir da variável de ambiente ou um valor padrão (para testes locais)
const secret = process.env.JWT_SECRET || 'segredo_super_secreto';

// Gerar token JWT com validade de 1 hora
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('Seu token JWT gerado é:\n');
console.log(token);


 /*
O que  esta acontecendo 

Define o payload com o id e email do usuário — os dados que ficarão codificados no token.

Usa a variável de ambiente JWT_SECRET para assinar o token, ou um valor padrão caso não esteja definida.

Define que o token expira em 1 hora (expiresIn: '1h').

Gera o token com jwt.sign().

Imprime o token no console.
 */