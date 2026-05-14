const InscricaoModel = require("../models/InscricaoModel");

function store(req, res, next) {
    try {
        const { eventoId, participanteId } = req.body;
        if (!eventoId || !participanteId) {
            return res
                .status(400)
                .json({ erro: "eventoId e participanteId são obrigatórios" });
        }

        const resultado = InscricaoModel.criar(
            parseInt(eventoId, 10),
            parseInt(participanteId, 10),
        );

        if (resultado.erro) {
            return res.status(400).json(resultado);
        }

        res.status(201).json(resultado);
    } catch (err) {
        next(err);
    }
}

function index(req, res, next) {
    try {
        const inscricoes = InscricaoModel.listarTodos();
        res.json(inscricoes);
    } catch (err) {
        next(err);
    }
}

function listarPorEvento(req, res, next) {
    try {
        const eventoId = parseInt(req.params.eventoId, 10);
        if (Number.isNaN(eventoId)) {
            return res.status(400).json({ erro: "eventoId inválido" });
        }

        const inscricoes = InscricaoModel.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (err) {
        next(err);
    }
}

function cancelar(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const resultado = InscricaoModel.cancelar(id);
        if (!resultado) {
            return res.status(404).json({ erro: "Inscrição não encontrada" });
        }

        res.json(resultado);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
};