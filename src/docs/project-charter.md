# Project Charter — API de Notificações

## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos

## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.

## 3. Justificativa
Por que este módulo é necessário? 
R: Ele resolve o problema da divulgação de eventos, onde qualquer pessoas possa criar um eventos 
e consiga divulga-lá.

Que problema ele resolve?
R: A falta de divulgação de eventos.

## 4. Escopo

### Incluído:
- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem

### Não incluído:
- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications


## 5. Equipe
|   Nome   |         Função/Responsabilidade             |
|----------|---------------------------------------------|
| [Miguel] | [ex: Líder técnico, responsável pelo banco] |
| [Pietro] | [ex: Responsável pela documentação]         |
| [Pedro]  | [ex: Responsável pelos testes]              |

## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo
Início: [13:32] | Entrega final: [16:00]

## 8. Critérios de Sucesso
- [ ] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [ ] Documentação Swagger completa
- [ ] Deploy realizado
- [ ] Apresentação aprovada