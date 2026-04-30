const InscricaoService = require('../services/InscricaoService');

async function store(req, res, next) {
    try {
        const novaInscricao = await InscricaoService.criar(req.body);
        res.status(201).json(novaInscricao);
    } catch (erro) {
        next(erro);
    }

}

async function index(req, res, next) {
    try {
        const inscricoes = await InscricaoService.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// Complete listarPorEvento e cancelar seguindo o mesmo padrão

// listarPorEvento
async function listarPorEvento(req, res, next) {
    try {
        const evento = req.params.eventoId;
        const inscricoes = await InscricaoService.listarPorEvento(evento);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// cancelar
async function cancelar(req, res, next) {
    try {
        const id = req.params.id;
        await InscricaoService.cancelar(id);
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}


module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
};