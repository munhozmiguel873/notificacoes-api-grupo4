const EventoModel = require("../models/EventoModel");

function index(req, res, next) {
    try {
        const eventos = EventoModel.listarTodos();
        res.json(eventos);
    } catch (err) {
        next(err);
    }
}

function show(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const evento = EventoModel.buscarPorId(id);
        if (!evento) {
            return res.status(404).json({ erro: "Evento não encontrado" });
        }

        res.json(evento);
    } catch (err) {
        next(err);
    }
}

function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;
        if (!nome || !data) {
            return res.status(400).json({ erro: "Nome e data são obrigatórios" });
        }

        const novoEvento = EventoModel.criar({
            nome,
            descricao,
            data,
            local,
            capacidade,
        });

        res.status(201).json(novoEvento);
    } catch (err) {
        next(err);
    }
}

function update(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const eventoAtualizado = EventoModel.atualizar(id, req.body);
        if (!eventoAtualizado) {
            return res.status(404).json({ erro: "Evento não encontrado" });
        }

        res.json(eventoAtualizado);
    } catch (err) {
        next(err);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const deletado = EventoModel.deletar(id);
        if (!deletado) {
            return res.status(404).json({ erro: "Evento não encontrado" });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};