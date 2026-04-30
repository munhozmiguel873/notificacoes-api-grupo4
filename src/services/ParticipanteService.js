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


function criar(dados) {
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


function atualizar(id, dados) {
    // Valide (campos opcionais), atualize, lance NotFoundError se necessário
    const { nome, email } = dados;
    const erros  = validar([
        minLength(nome, 3, "Nome"),
        isEmail(email, "Email"),
    ]);
    if (erros) {
        throw new ValidationError(erros.join("; "));
    }
    const participanteAtualizado = ParticipanteModel.atualizar(id, dados);
    if (!participanteAtualizado) {
        throw new NotFoundError("Participante");
    }
    return participanteAtualizado;
}

function deletar(id) {
    // Delete, lance NotFoundError se não encontrar
    const deletado = ParticipanteModel.deletar(id);
    if (!deletado) {
        throw new NotFoundError("Participante");
    }
    return true;
}


module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };