// src/services/EventoService.js
const EventoModel = require("../models/EventoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
    isRequired,
    isPositiveInteger,
    minLength,
    validar,
} = require("../helpers/validators");


async function listarTodos() {
    return await EventoModel.listarTodos();
}


async function buscarPorId(id) {
    const evento = await EventoModel.buscarPorId(id);
    if (!evento) {
        throw new NotFoundError("Evento");
    }
    return evento;
}


async function criar(dados) {
    const { nome, descricao, data, local, capacidade } = dados;
    // Validação
    const erros = validar([
        isRequired(nome, "Nome"),
        isRequired(data, "Data"),
        minLength(nome, 3, "Nome"),
        isPositiveInteger(capacidade, "Capacidade"),
    ]);
    if (erros) {
        throw new ValidationError(erros.join("; "));
    }
    return await EventoModel.criar({ nome, descricao, data, local, capacidade });
}


async function atualizar(id, dados) {
    const { nome, capacidade } = dados;
    // Validações (campos opcionais no update)
    const erros = validar([
        minLength(nome, 3, "Nome"),
        isPositiveInteger(capacidade, "Capacidade"),
    ]);
    if (erros) {
        throw new ValidationError(erros.join("; "));
    }
    const eventoAtualizado = await EventoModel.atualizar(id, dados);
    if (!eventoAtualizado) {
        throw new NotFoundError("Evento");
    }
    return eventoAtualizado;
}


async function deletar(id) {
    const deletado = await EventoModel.deletar(id);
    if (!deletado) {
        throw new NotFoundError("Evento");
    }
    return true;
}


module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};