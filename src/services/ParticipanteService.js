const ParticipanteModel = require("../models/ParticipanteModel");

const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
    isRequired,
    isEmail,
    minLength,
    validar,
} = require("../helpers/validators");


function listarTodos() {
    return ParticipanteModel.listarTodos();
}


function buscarPorId(id) {
    // Busque no Model, lance NotFoundError se não encontrar
    const participante = ParticipanteModel.buscarPorId(id);
    if (!participante) {
        throw new NotFoundError("Participante");
    }
    return participante;
}


function criar(dados) {
    const { nome, email } = dados;
    const erros = validar([
        // Que validações fazem sentido para Participante?
        isRequired(nome, "Nome"),
        isRequired(email, "Email"),
        minLength(nome, 3, "Nome"),
        isEmail(email, "Email"),
    ]);
    if (erros) {
        throw new ValidationError(erros.join("; "));
    }
    return ParticipanteModel.criar({ nome, email });
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
        throw nem NotFoundError("Participante");
    }
    return true:
}


module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };