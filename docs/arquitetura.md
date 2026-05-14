# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral
A API de Notificações é um módulo back-end REST responsável por gerenciar o envio de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

## 2. Arquitetura de Software
Cliente (Postman/Navegador)
│
▼
[Middleware Express] → express.json + tratamento de erros
│
▼
[Routes] → Define endpoints HTTP e chama controllers
│
▼
[Controllers] → Recebe request, valida parâmetros, retorna resposta HTTP
│
▼
[Models em memória] → Valores mantidos em arrays no servidor

### Observações
- O projeto não usa banco de dados no estado atual.
- Dados em memória são perdidos ao reiniciar o servidor.
- A documentação da API é gerada pelo Swagger a partir dos comentários em `src/routes/`.

## 3. Entidades e Relacionamentos
|   Entidade   |             Tabela                |               Descrição                  |
| ------------ | --------------------------------- | ---------------------------------------- |
| Evento       | `src/models/EventoModel.js`       | Evento disponível para inscrição         |
| Participante | `src/models/ParticipanteModel.js` | Usuário que pode se inscrever em eventos |
| Inscrição    | `src/models/InscricaoModel.js`    | Ligação entre participante e evento      |

### Relacionamentos
- Evento 1 → N Inscrições
- Participante 1 → N Inscrições

### Eventos
| Método |        Rota         |     Descrição     |
| ------ | ------------------- | ----------------- |
| GET    | /eventos            | Listar (paginado) |
| GET    | /eventos/:id        | Buscar por ID     |
| POST   | /eventos            | Criar             |
| PUT    | /eventos/:id        | Atualizar         |
| DELETE | /eventos/:id        | Deletar           |
| POST   | /eventos/:id/banner | Upload de imagem  |

### Participantes
| Método |       Rota         |   Descrição   |
| ------ | ------------------ | ------------- |
| GET    | /participantes     | Listar        |
| GET    | /participantes/:id | Buscar por ID |
| POST   | /participantes     | Criar         |
| PUT    | /participantes/:id | Atualizar     |
| DELETE | /participantes/:id | Deletar       |

### Inscrições
| Método |      Rota       |   Descrição   |
| ------ | --------------- | ------------- |
| GET    | /inscricoes     | Listar        |
| GET    | /inscricoes/:id | Buscar por ID |
| POST   | /inscricoes     | Criar         |
| PUT    | /inscricoes/:id | Atualizar     |
| DELETE | /inscricoes/:id | Deletar       |

## 5. Tecnologias
|     Tecnologia     |                    Justificativa                     |
| ------------------ | ---------------------------------------------------- |
| Node.js            | Plataforma de execução do servidor                   |
| Express.js         | Framework HTTP leve e flexível                       |
| swagger-jsdoc      | Documentação OpenAPI gerada a partir dos comentários |
| swagger-ui-express | Interface web de documentação                        |

## 6. Estrutura de Pastas
```
docs/
  arquitetura.md
  definition-of-done.md
  pesquisa-mercado.md
  auditoria-qualidade.md
  standup-log.md
  sprint-reviews/
    sprint-1.md
src/
  app.js
  server.js
  swagger.js
  controllers/
  models/
  routes/
```

## 7. Variáveis de Ambiente
- `PORT`: Porta em que o servidor roda. Padrão: `3000`.

> **Observação:** o projeto atual não utiliza `.env` ou conexão com banco de dados.
