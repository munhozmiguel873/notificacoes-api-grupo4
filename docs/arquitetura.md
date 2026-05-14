# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral
A API de Notificações é um módulo back-end REST responsável por gerenciar o envio de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

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
| Entidade | Tabela | Descrição |
| --- | --- | --- |
| Evento | eventos | Representa um evento na plataforma |
| Participante | participantes | Pessoa cadastrada |
| Inscrição | inscricoes | Relação participante ↔ evento |
| Notificação | notificacoes | E-mail enviado ou a enviar |

### Relacionamentos:
- Evento 1 → N Inscrição
- Participante 1 → N Inscrição
- Inscrição 1 → N Notificação

## 4. Endpoints da API
### Eventos
| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /eventos | Listar (paginado) |
| GET | /eventos/:id | Buscar por ID |
| POST | /eventos | Criar |
| PUT | /eventos/:id | Atualizar |
| DELETE | /eventos/:id | Deletar |
| POST | /eventos/:id/banner | Upload de imagem |

### Participantes
| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /participantes | Listar |
| GET | /participantes/:id | Buscar por ID |
| POST | /participantes | Criar |
| PUT | /participantes/:id | Atualizar |
| DELETE | /participantes/:id | Deletar |

### Inscrições
| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /inscricoes | Listar |
| GET | /inscricoes/:id | Buscar por ID |
| POST | /inscricoes | Criar |
| PUT | /inscricoes/:id | Atualizar |
| DELETE | /inscricoes/:id | Deletar |

## 5. Tecnologias e Justificativa
| Tecnologia | Justificativa |
| --- | --- |
| Node.js | Runtime JavaScript no servidor, conhecimento da equipe |
| Express.js | Framework minimalista e flexível |
| MySQL | Banco relacional, sinergia com UC de BD |
| Sequelize | ORM que abstrai SQL, facilita migrations |

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
| Variável | Descrição | Exemplo |
| --- | --- | --- |
| PORT | Porta do servidor | 3000 |
| DB_HOST | Host do MySQL | localhost |
| DB_NAME | Nome do banco | notificacoes_db |
| DB_USER | Usuário do banco | root |
| DB_PASSWORD | Senha do banco | senha123 |

> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)
