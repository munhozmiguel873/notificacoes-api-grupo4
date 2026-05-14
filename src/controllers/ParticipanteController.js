const ParticipanteService = require("../services/ParticipanteService");

const parseId = require("../helpers/parseId");

// GET
async function index(req, res, next) {
    try {
        const participantes = await ParticipanteService.listarTodos();

        res.json(participantes);
    } catch (erro) {
        next(erro);
    }
}

// GET BY ID
async function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const participante = await ParticipanteService.buscarPorId(id);

        res.json(participante);
    } catch (erro) {
        next(erro);
    }
}

// POST
async function store(req, res, next) {
    try {
        const novoParticipante = await ParticipanteService.criar(req.body);

        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}

// PUT
async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const participanteAtualizado =
            await ParticipanteService.atualizar(id, req.body);

        res.json(participanteAtualizado);
    } catch (erro) {
        next(erro);
    }
}

// DELETE
async function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        await ParticipanteService.deletar(id);

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