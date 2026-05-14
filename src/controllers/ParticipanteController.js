const ParticipanteModel = require("../models/ParticipanteModel");

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function index(req, res, next) {
    try {
        const participantes = ParticipanteModel.listarTodos();
        res.json(participantes);
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

        const participante = ParticipanteModel.buscarPorId(id);
        if (!participante) {
            return res.status(404).json({ erro: "Participante não encontrado" });
        }

        res.json(participante);
    } catch (err) {
        next(err);
    }
}

function store(req, res, next) {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({ erro: "Nome e email são obrigatórios" });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ erro: "Email inválido" });
        }

        const novoParticipante = ParticipanteModel.criar({ nome, email });
        res.status(201).json(novoParticipante);
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

        const { nome, email } = req.body;
        if (email && !isValidEmail(email)) {
            return res.status(400).json({ erro: "Email inválido" });
        }

        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);
        if (!participanteAtualizado) {
            return res.status(404).json({ erro: "Participante não encontrado" });
        }

        res.json(participanteAtualizado);
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

        const deletado = ParticipanteModel.deletar(id);
        if (!deletado) {
            return res.status(404).json({ erro: "Participante não encontrado" });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = { index, show, store, update, destroy };