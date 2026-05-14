# Auditoria de Qualidade — Sprint 2
**Data:** 2026-05-14
**Revisores:** Equipe de desenvolvimento

## Checklist de Qualidade
### Organização
- [ ] Estrutura de pastas segue o padrão MVC + Services
- [ ] Imports organizados (externos primeiro, internos depois)
- [ ] Nomes de variáveis e funções são claros e consistentes

### Tratamento de Erros
- [x] Todos os controllers usam try/catch + next(erro)
- [x] Erros retornam formato padronizado
- [ ] Erros do Sequelize são tratados no errorHandler

### Validações
- [x] Todas as rotas POST/PUT têm validação
- [x] E-mails são validados
- [x] IDs são parseados corretamente

### Documentação
- [x] Swagger cobre todas as rotas atuais
- [x] README está atualizado
- [ ] .env.example tem todas as variáveis

### Git
- [ ] Todos os membros têm commits recentes
- [ ] Mensagens de commit são descritivas
- [ ] .gitignore está correto

Dívidas Técnicas Encontradas
#	Descrição	Arquivo	Prioridade	Responsável
1	Validação de datas incompleta em criação de notificações	src/validators/notificacaoValidator.js	Alta	[membro]
2	ErrorHandler não trata erros específicos do Sequelize	src/middlewares/errorHandler.js	Alta	[membro]
3	Falta padronização de imports em alguns controllers	src/controllers/	Média	[membro]
4	Variáveis de ambiente ausentes no .env.example	.env.example	Média	[membro]
5	Estrutura MVC inconsistente em alguns módulos	src/modules/	Média	[membro]
6	Alguns commits possuem mensagens genéricas