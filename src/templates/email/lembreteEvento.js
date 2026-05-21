const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {
    const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

    // Calcular quantos dias faltam
    const hoje = new Date();
    const dataEvento = new Date(eventoData);

    const diffMs = dataEvento - hoje;
    const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const conteudo = `
    <h2>Lembrete: o evento está chegando! ⏰</h2>

    <p>Olá <strong>${participanteNome}</strong>,</p>

    <p>Passando para te lembrar que o evento <strong>${eventoNome}</strong> está se aproximando.</p>

    <p>📅 Data: <strong>${new Date(eventoData).toLocaleDateString()}</strong></p>
    <p>📍 Local: <strong>${eventoLocal}</strong></p>

    <hr>

    <p>Faltam apenas <strong>${diasFaltando}</strong> dia(s) para o evento começar!</p>

    <p>Não esqueça de se preparar — estamos te esperando por lá 😄</p>
  `;

    return baseTemplate(conteudo);
}

module.exports = lembreteEvento;