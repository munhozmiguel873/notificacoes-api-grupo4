# Notificações API

API para módulo de notificações por e-mail de uma plataforma de eventos.

## Como rodar

1. Clone o repositório
2. Execute o `npm install`
3. Execute o `npm start`
4. Acesse `http://localhost:3000`

## Tecnologias

- Node.js
- Express.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- Dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- CORS

## 📁 Estrutura do Projeto

src/
├── controllers/ → Recebe requisições, retorna respostas
├── services/ → Lógica de negócio e validações
├── models/ → Acesso e manipulação de dados
├── routes/ → Mapeamento de URLs
├── middlewares/ → Funções intermediárias (log, erros, CORS)
├── errors/ → Classes de erro customizadas
├── helpers/ → Funções auxiliares (validação, etc.)
├── swagger.js → Configuração da documentação
├── app.js → Configuração do Express
└── server.js → Inicialização do servidor

## 🔧 Scripts
| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor (produção) |
| `npm run dev` | Inicia com Nodemon (desenvolvimento) |
| `npm run db:migrate` | Executa migrations pendentes |
| `npm run db:migrate:undo` | Desfaz última migration |
| `npm run db:seed` | Insere dados iniciais |
| `npm run db:reset` | Recria banco completo |

## 🗄️ Banco de Dados

- **SGBD:** MySQL
- **ORM:** Sequelize
- **Tabelas:** eventos, participantes, inscricoes, notificacoes