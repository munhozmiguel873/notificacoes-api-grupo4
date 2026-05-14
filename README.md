# 🔔 Notificações API

API REST para gerenciar eventos, participantes e inscrições em um módulo de notificações.

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.
A API controla eventos, participantes e inscrições em memória e expõe documentação via Swagger.

## 🔧 Requisitos

- Node.js 18+ instalada

## 🚀 Como Rodar

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/notificacoes-api.git
cd notificacoes-api
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm start
```
4. Abra no navegador:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## 📌 Endpoints

### Eventos
- `GET /eventos`
- `GET /eventos/:id`
- `POST /eventos`
- `PUT /eventos/:id`
- `DELETE /eventos/:id`

### Participantes
- `GET /participantes`
- `GET /participantes/:id`
- `POST /participantes`
- `PUT /participantes/:id`
- `DELETE /participantes/:id`

### Inscrições
- `GET /inscricoes`
- `GET /inscricoes/evento/:eventoId`
- `POST /inscricoes`
- `PATCH /inscricoes/:id/cancelar`

## 📝 Observações

- Os dados são armazenados em memória. Ao reiniciar o servidor, as inscrições, eventos e participantes serão reinicializados.
- A documentação Swagger é gerada a partir dos comentários nas rotas em `src/routes/`.
