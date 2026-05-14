# Pesquisa de Mercado — Serviços de Notificação

## Serviços de E-mail Transacional
|   Serviço  |      Plano Gratuito      | Preço Inicial | Diferenciais |
| ---------- | ------------------------ | ------------- | --- |
| SendGrid   | 100 emails/dia           | US$ 15/mês | API robusta, templates |
| Mailgun    | 5.000/mês (3 meses)      | US$ 35/mês | Foco em devs |
| Amazon SES | 62.000/mês (se usar EC2) | US$ 0.10/1000 | Escala, preço |
| Mailtrap   | 500/mês (teste)          | US$ 15/mês | Sandbox para testes |

## Como o nosso projeto se compara?
- Nosso projeto implementa uma API de notificações back-end que gerencia eventos, participantes e inscrições.
- A solução atual é local e focada em persistência própria usando MySQL, enquanto serviços de mercado oferecem entrega de e-mail e templates prontos.
- Recursos como envio de notificações em massa, monitoramento de entregabilidade e integração com provedores reais são diferenciais dos serviços de mercado.

## O que poderíamos adotar no futuro?
- Integração com SendGrid ou Mailgun para envio real de e-mails.
- Templates dinâmicos de e-mail e gerenciamento de remetentes.
- Monitoramento de entregas, bounces e métricas de abertura.
- Ambiente de sandbox para testes com ferramentas como Mailtrap.
