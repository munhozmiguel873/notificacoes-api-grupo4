# Auditoria de Qualidade — Sprint 2
**Data:** [30/04/2026]
**Revisores:** 
- Miguel Munhoz
- Pedro Augusto
- Pietro Dipiassa

## Checklist de Qualidade

### Organização
- [✔️] Estrutura de pastas segue o padrão MVC + Services
- [✔️] Imports organizados (externos primeiro, internos depois)
- [✔️] Nomes de variáveis e funções são claros e consistentes

### Tratamento de Erros
- [✔️] Todos os controllers usam try/catch + next(erro)
- [✔️] Erros retornam formato padronizado
- [✔️] Erros do Sequelize são tratados no errorHandler

### Validações
- [✔️] Todas as rotas POST/PUT têm validação
- [✔️] E-mails são validados
- [✔️] IDs são parseados corretamente

### Documentação
- [✔️] Swagger cobre todas as rotas atuais
- [✔️] README está atualizado
- [✔️] .env.example tem todas as variáveis

### Git
- [✔️] Todos os membros têm commits recentes
- [✔️] Mensagens de commit são descritivas
- [✔️] .gitignore está correto

## Dívidas Técnicas Encontradas
|  #  |            Descrição               |  Arquivo  | Prioridade | Responsável |
| --- | ---------------------------------- | --------- | ---------- | ----------- |
|   1 | [ex: validação de data incompleta] | [arquivo] | Alta       | [membro]    |
|   2 | | | | |