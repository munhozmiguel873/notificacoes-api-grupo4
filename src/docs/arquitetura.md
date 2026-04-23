# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral
A API de Notificações é um módulo back-end REST responsável por gerenciar o envio
de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

## 2. Arquitetura em Camadas
Cliente (Postman/Browser)
│
▼
[Middlewares] → express.json, cors, responseTime, cacheMiddleware
│
▼
[Routes] → Mapeamento de URLs para Controllers
│
▼
[Controllers] → Recebe req, chama Service, monta res
│
▼
[Services] → Validação, regras de negócio
│
▼
[Models (Sequelize)] → Acesso ao banco de dados
│
▼
[MySQL] → Persistência

## 3. Entidades e Relacionamentos
|   Entidade   |    Tabela    |             Descrição              |
| ------------ | ------------ | ---------------------------------- |
|    Evento    |    evento    | Representa um evento na plataforma |
| Participante | participante |         Pessoa cadastrada          |
|   Inscrição  |  inscricao   |    Relação participante ↔ evento   |
|  Notificação |  notificacao |     E-mail enviado ou a enviar     |
### Relacionamentos:
- Evento 1 → N Inscrição
- Participante 1 → N Inscrição
- Inscrição 1 → N Notificação

## 4. Endpoints da API
### Eventos
| Método |        Rota         |     Descrição     |
| ------ | ------------------- | ----------------- |
|  GET   |      /eventos       | Listar (paginado) |
|  GET   |     /evento/:id     |   Buscar por ID   |
|  POST  |       /evento       |       Criar       |
|  PUT   |     /evento/:id     |     Atualizar     |
| DELETE |     /evento/:id     |      Deletar      |
| ------ | ------------------- | ----------------- |
|  GET   |   /participantes    | Listar (paginado) |
|  GET   |  /participante/:id  |   Buscar por ID   |
|  POST  |    /participante    |       Criar       |
|  PUT   |  /participante/:id  |     Atualizar     |
| DELETE |  /participante/:id  |      Deletar      |
| ------ | ------------------- | ----------------- |
|  GET   |     /inscrição      | Listar (paginado) |
|  GET   |   /inscrição/:id    |   Buscar por ID   |
|  POST  |     /inscrição      |       Criar       |
|  PUT   |   /inscrição/:id    |     Atualizar     |
| DELETE |   /inscrição/:id    |      Deletar      |


## 5. Tecnologias e Justificativa
| Tecnologia |                      Justificativa                     |
| ---------- | ------------------------------------------------------ |
|  Node.js   | Runtime JavaScript no servidor, conhecimento da equipe |
| Express.js |            Framework minimalista e flexível            |
|    MySQL   |         Banco relacional, sinergia com UC de BD        |
| Sequelize  |        ORM que abstrai SQL, facilita migrations        |

## 6. Estrutura de Pastas
[// src/app.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();


// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(express.json());
app.use(cors());
const responseTime = require("./middlewares/responseTime");
app.use(responseTime);


// ============================================
// DOCUMENTAÇÃO
// ============================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ============================================
// ROTAS
// ============================================
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        versao: "1.0.0",
        documentacao: "/api-docs",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",

        },
    });
});


// ============================================
// MIDDLEWARES DE ERRO (sempre por último!)
// ============================================
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
app.use(notFound);
app.use(errorHandler);


module.exports = app;]

## 7. Variáveis de Ambiente
| Variável |     Descrição     |     Exemplo     |
| -------- | ----------------- | --------------- |
|   PORT   | Porta do servidor |       3000      |
|  DB_HOST |   Host do MySQL   |    localhost    |
|  DB_NAME |   Nome do banco   | notificacoes_db |
|  DB_PORT | Porta do servidor |       3306      |
|  DB_USER |      Usuário      |       root      |
|DB_PASSWORD|      Senha       |                 |
| NODE_ENV |    Envio do Git   |   development   |
> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)
### Tempo restante: trabalho técnico
Use o tempo restante da aula para avançar no projeto PBE (persistência, banco de dados).