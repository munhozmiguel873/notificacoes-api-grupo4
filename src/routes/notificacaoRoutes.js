const express = require('express');
const router = express.Router();

const EmailService = require('../services/EmailService');

// POST /notificacoes/teste-email — enviar e-mail de teste
router.post('/teste-email', async (req, res, next) => {
  try {
    const resultado = await EmailService.enviar(
      'teste@exemplo.com',
      'Teste da API de Notificações',
      '<h1>Funcionou! 🎉</h1><p>Este e-mail foi enviado pela nossa API.</p>'
    );

    res.json({
      mensagem: 'E-mail de teste enviado!',
      visualizarEm: resultado.visualizarEm,
    });

  } catch (erro) {
    next(erro);
  }
});

module.exports = router;