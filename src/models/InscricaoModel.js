const EventoModel = require("./EventoModel");
const ParticipanteModel = require("./ParticipanteModel");
let inscricoes = [];
let proximoId = 1;

function criar(eventoId, participanteId) {
    const evento = EventoModel.buscarPorId(eventoId);
    if (!evento) return { erro: "Evento não encontrado" };

    const participante = ParticipanteModel.buscarPorId(participanteId);
    if (!participante) return { erro: "Participante não encontrado" };

    const jaInscrito = inscricoes.find(
        (i) => i.eventoId === eventoId && i.participanteId === participanteId,
    );
    if (jaInscrito) return { erro: "Participante já inscrito neste evento" };

    const novaInscricao = {
        id: proximoId,
        eventoId,
        participanteId,
        dataInscricao: new Date().toISOString(),
        status: "confirmada",
    };

    proximoId++;
    inscricoes.push(novaInscricao);
    return novaInscricao;
}

function listarTodos() {
    return inscricoes;
}

function listarPorEvento(eventoId) {
    return inscricoes.filter((i) => i.eventoId === eventoId);
}

function cancelar(id) {
    const index = inscricoes.findIndex((i) => i.id === id);
    if (index === -1) return null;

    inscricoes[index].status = "cancelada";
    return inscricoes[index];
}

module.exports = {
    criar,
    listarTodos,
    listarPorEvento,
    cancelar,
};