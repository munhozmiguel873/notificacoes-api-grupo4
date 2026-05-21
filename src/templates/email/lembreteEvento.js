// Template com lacunas para completar:

const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {

    const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

    // Calcular quantos dias faltam

    const hoje = new Date();

    const dataEvento = new Date(eventoData);

    const diffMs = dataEvento - hoje;

    const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const conteudo = `

<h2>Lembrete: Evento se aproxima! ⏰</h2>
    <p>Olá <strong>${participanteNome}</strong>,</p>

    <p>Estamos passando para lembrar que faltam apenas <strong>${diasFaltando}</strong> dias para o início do evento <strong>${eventoNome}</strong>.</p>
    
    <p>Prepare-se! Estamos organizando tudo para que sua experiência seja incrível.</p>
    
    <p>Nos vemos em breve!</p>
`;

    return baseTemplate(conteudo);

}

module.exports = lembreteEvento;