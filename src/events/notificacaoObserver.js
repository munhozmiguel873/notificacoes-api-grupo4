const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');
const cancelamentoInscricao = require('../templates/email/cancelamentoInscricao');
const cache = require('../config/cache'); // Importação do cache

/**
 * Busca dados completos da inscrição para montar o e-mail
 */
async function buscarDadosInscricao(inscricaoId) {
  if (!inscricaoId) return null;

  return await Inscricao.findByPk(inscricaoId, {
    include: [
      { model: Evento, as: 'evento' },
      { model: Participante, as: 'participante' },
    ],
  });
}

/**
 * Salva o registro da notificação no banco de dados
 */
async function salvarNotificacao(dados) {
  return await Notificacao.create(dados);
}

// --- EVENTO: INSCRIÇÃO CRIADA ---
appEmitter.on('inscricao:criada', async (inscricao) => {
  try {
    if (!inscricao?.id) return;

    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição confirmada: ${evento.nome}`;

    const html = confirmacaoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
      eventoData: evento.data,
      eventoLocal: evento.local,
    });

    // 1. Envia o e-mail
    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html
    );

    // 2. Salva no banco com enviada: true
    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'confirmacao',
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    // 3. LIMPA O CACHE para que o GET /notificacoes mostre o novo dado
    cache.del('/notificacoes');

    console.log(`[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`);
    console.log(`[CACHE] Cache de /notificacoes invalidado.`);
    console.log(`Visualizar em: ${resultado.visualizarEm}`);

  } catch (erro) {
    console.error('[NOTIFICAÇÃO CRIAÇÃO] Erro:', erro);
  }
});

// --- EVENTO: INSCRIÇÃO CANCELADA ---
appEmitter.on('inscricao:cancelada', async (inscricao) => {
  try {
    if (!inscricao?.id) return;

    // Nota: Se usar Soft Delete, talvez precise de { paranoid: false } no findByPk
    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição cancelada: ${evento.nome}`;

    const html = cancelamentoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
    });

    // 1. Envia o e-mail
    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html
    );

    // 2. Salva no banco com enviada: true
    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'cancelamento',
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    // 3. LIMPA O CACHE
    cache.del('/notificacoes');

    console.log(`[NOTIFICAÇÃO] Cancelamento enviado para ${participante.email}`);
    console.log(`[CACHE] Cache de /notificacoes invalidado.`);
    console.log(`Visualizar em: ${resultado.visualizarEm}`);

  } catch (erro) {
    console.error('[NOTIFICAÇÃO CANCELAMENTO] Erro:', erro);
  }
});