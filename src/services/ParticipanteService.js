const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

const {
    isRequired,
    isEmail,
    minLength,
    validar,
} = require("../helpers/validators");


async function listarTodos() {
    // data = Dados
    const participantes = await Participante.findAll({
        order: [['data', 'ASC']]
    });
    return participantes;
}


async function buscarPorId(id) {
    const participante = await Participante.findByPk(id);
    if (!participante) {
        throw new NotFoundError("Participante");
    }
    return participante;
}


async function criar(dados) {
    try {
        const novoParticipante = await Participante.create(dados);
        return novoParticipante;
    } catch (erro) {
        if (erro.name === "SequelizeValidationError") {
            const mensagens = erro.errors.map(e => e.message).join("; ");
            throw new ValidationError(mensagens);
        }
        throw erro; // Re-lance outros erros
    }
}


async function atualizar(id, dados) {
    const participante = await Participante.findByPk(id);
    try {
        await Participante.update(dados);
        return participante;
    } catch (erro) {
        if (erro.name === "SequelizeValidationError") {
            const mensagens = erro.errors.map(e => e.message).join("; ");
            throw new ValidationError(mensagens);
        }
        throw erro;
    }
}

async function deletar(id) {
    const participante = await Participante.findByPk(id);
    await participante.destroy();
    return { message: 'Participante deletado com sucesso' };
}


module.exports = { 
    listarTodos, 
    buscarPorId, 
    criar, 
    atualizar, 
    deletar 
};