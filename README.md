🚫 Direitos Autorais🚫
Este projeto e todo o seu conteúdo (código-fonte, arquivos, imagens, scripts, etc.) são protegidos por direitos autorais.

© Leandro Mandela T de Souza - 2025
Todos os direitos reservados.

É proibido:🚫🚫🚫🚫🚫

Copiar, modificar, redistribuir ou reutilizar qualquer parte deste código ou conteúdo sem autorização expressa e por escrito do(s) autor(es).

Utilizar este código, total ou parcialmente, para fins comerciais ou acadêmicos sem permissão.

A violação de qualquer um desses termos pode resultar em ações legais conforme a legislação vigente de direitos autorais (Lei nº 9.610/98 no Brasil ou equivalente em outros países).

Caso tenha interesse em utilizar ou colaborar com este projeto, entre em contato pelo GitHub: mensagens pelo GitHub


API de Gerenciamento de Despesas
Este projeto é uma API RESTful desenvolvida com Node.js, Express e MongoDB, com autenticação JWT, ideal para o controle pessoal de despesas financeiras. A API permite o cadastro de usuários, autenticação, criação e listagem de despesas protegidas por token.

Estrutura do Projeto
O projeto segue o padrão de arquitetura em camadas baseado no modelo MVC:

models/: define os schemas Mongoose (ex: Despesa, Usuário).

controllers/: contém a lógica de negócio e manipulação dos dados.

routes/: define as rotas públicas e protegidas.

middlewares/: contém o middleware de autenticação com JWT.

server.js: inicializa o servidor e a conexão com o banco de dados.

app.js: configura e integra rotas, middlewares e express.

Padrões de Projeto Utilizados
Singleton (Criacional)
Onde: server.js

Utilizado para garantir que apenas uma instância da conexão com o MongoDB seja criada. Isso evita múltiplas conexões simultâneas que poderiam causar instabilidade.

js
Copiar
Editar
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
MVC (Model-View-Controller)
Onde: Estrutura principal do projeto

Separa a aplicação em camadas bem definidas:

Model: representa os dados no MongoDB (models/Despesa.js, models/Usuario.js).

Controller: manipula os dados com base nas requisições (controllers/despesaController.js).

Routes: define os endpoints (routes/despesas.js, routes/auth.js).

Essa separação facilita testes, manutenções futuras e reutilização de código.

Middleware (Strategy)
Onde: middlewares/auth.js

Estratégia de autenticação baseada em JWT para proteger rotas privadas da aplicação.

js
Copiar
Editar
const token = req.headers['authorization'];
jwt.verify(token, secret, (err, decoded) => {
  if (err) return res.status(403).json({ message: 'Token inválido' });
  req.userId = decoded.id;
  next();
});
Isso permite reutilizar a mesma lógica de autenticação em múltiplas rotas protegidas.

Utilização do MongoDB com Mongoose
Por que MongoDB?
Banco de dados NoSQL altamente escalável

Ideal para armazenar documentos JSON flexíveis

Fácil integração com Node.js usando Mongoose

Conexão com o banco
A conexão está centralizada no server.js, com uso de variável de ambiente (MONGO_URI) para garantir segurança.

js
Copiar
Editar
mongoose.connect(process.env.MONGO_URI);
Exemplo de Model de Despesa
js
Copiar
Editar
const despesaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  categoria: { type: String },
  data: { type: Date, default: Date.now },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
});
Testes Automatizados
O projeto utiliza Jest e Supertest para garantir a estabilidade das rotas:

Testes para autenticação

Testes para rotas protegidas com token válido

Testes para CRUD de despesas

Para rodar os testes:

bash
Copiar
Editar
npm test
Scripts disponíveis
npm start: inicia o servidor

npm run dev: inicia com nodemon para desenvolvimento

npm test: executa os testes com Jest

Tecnologias Utilizadas
Node.js

Express.js

MongoDB (local ou Atlas)

Mongoose

JWT (jsonwebtoken)

BcryptJS

Jest e Supertest

Dotenv

