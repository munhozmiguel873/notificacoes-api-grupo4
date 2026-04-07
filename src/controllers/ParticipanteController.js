const ParticipanteModel = require("../services/ParticipanteService");
const parseId = require("../helpers/parseId");

// Get
function index(req, res, next) {
    try {
        const participantes = ParticipanteService.listarTodos();
        res.json(participantes);
    } catch (erro) {
        next(erro);
    }
}


// Get
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = ParticipanteService.buscarPorId(id);
        res.json(participante)
    } catch (erro) {
        next(erro);
    }
}


// Post
function store(req, res, next) {
    try {
        const novoParticipante = ParticipanteService.criar(req.body);
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}


// Put
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);
        res.json(participanteAtualizado);
    } catch (erro) {
        next(erro);
    }
}


function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        ParticipanteService.deletar(id);
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};