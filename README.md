🚫 Direitos Autorais 🚫
Este projeto e todo o seu conteúdo (código-fonte, arquivos, imagens, scripts, etc.) são protegidos por direitos autorais.

© Leandro Mandela T de Souza - 2025
Todos os direitos reservados.

É proibido:🚫🚫🚫🚫🚫

Copiar, modificar, redistribuir ou reutilizar qualquer parte deste código ou conteúdo sem autorização expressa e por escrito do(s) autor(es).

Utilizar este código, total ou parcialmente, para fins comerciais ou acadêmicos sem permissão.

A violação de qualquer um desses termos pode resultar em ações legais conforme a legislação vigente de direitos autorais (Lei nº 9.610/98 no Brasil ou equivalente em outros países).

Caso tenha interesse em utilizar ou colaborar com este projeto, entre em contato pelo GitHub: mensagens pelo GitHub.

API de Gerenciamento de Despesas
Este projeto é uma API RESTful desenvolvida com Node.js e Express, com autenticação JWT, ideal para o controle pessoal de despesas financeiras. A API permite cadastro de usuários, autenticação, criação e listagem de despesas protegidas por token.

Estrutura do Projeto
O projeto segue o padrão de arquitetura em camadas baseado no modelo MVC:

models/: Define os dados da aplicação usando estruturas em memória (arrays).

controllers/: Contém a lógica de negócio e manipulação dos dados.

routes/: Define as rotas públicas e protegidas.

middlewares/: Contém o middleware de autenticação com JWT.

server.js: Inicializa o servidor Express.

app.js: Configura e integra rotas, middlewares e Express.

Padrões de Projeto Utilizados
Singleton (Criacional)
Usado para garantir que o servidor Express seja inicializado uma única vez (server.js).

MVC (Model-View-Controller)
Estrutura principal do projeto, que separa claramente Model, Controller e Routes para facilitar manutenção e testes.

Strategy (Comportamental)
Middleware de autenticação JWT implementado como estratégia reutilizável para proteger rotas privadas (middlewares/auth.js).
Além disso, estratégias para cálculo de totais de despesas por categoria ou geral.

Observer (Comportamental)
Implementado para notificação de alertas quando despesas elevadas são registradas.

Mudanças Importantes
Remoção do MongoDB
Este projeto removido o MongoDB e sua dependência Mongoose.
Em vez disso, os dados de usuários e despesas são armazenados em arrays na memória do servidor, para simplificar o desenvolvimento e testes locais.

Implicações:

Nenhuma necessidade de configurar banco de dados externo.

Os dados são voláteis e reiniciam ao reiniciar o servidor.

Ideal para prototipagem, aprendizado e testes.

Funcionalidades Implementadas
✅ Cadastro e login de usuários com senha criptografada (bcrypt).

✅ Autenticação com JWT e proteção de rotas.

✅ CRUD completo de despesas:

Criar nova despesa.

Listar todas as despesas do usuário.

Atualizar uma despesa existente.

Deletar despesa.

✅ Cálculo de totais por estratégia (Strategy Pattern).

✅ Notificação de alerta para despesas elevadas (Observer Pattern).

✅ Testes automatizados com Jest e Supertest.

✅ Arquitetura MVC organizada por camadas.

✅ Validação de token expirado ou inválido.

✅ Middleware de autenticação reutilizável.

✅ Uso de variáveis de ambiente (.env) para segurança.
