const { Evento } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function listarTodos() {
    const eventos = await Evento.findAll({
        order: [['data', 'ASC']],
    });
    return eventos;
}

async function buscarPorId(id) {
    const evento = await Evento.findByPk(id);
    if (!evento) {
        throw new NotFoundError('Evento');
    }
    return evento;
}

async function criar(dados) {
    try {
        const novoEvento = await Evento.create(dados);
        return novoEvento;
    } catch (erro) {
        // O Sequelize lança SequelizeValidationError para validações do Model
        if (erro.name === 'SequelizeValidationError') {
            const mensagens = erro.errors.map(e => e.message).join('; ');
            throw new ValidationError(mensagens);
        }
        throw erro;
    }
}

// Atualizar e Deletar vamos implementar na próxima aula
async function atualizar(id, dados) {
    const evento = await Evento.findByPk(id);
    try {
         await Evento.update(dados);
         return evento;
    } catch (erro) {
        if (erro.name === 'SequlizeValidationError') {
            const mensagens = erro.errors.map(e => e.message).join('; ');
            throw new ValidationError(mensagens);
        }
        throw erro;
    }
}

async function deletar(id) {
    const evento = await Evento.findByPk(id);
    await evento.destroy();
    return { mensagem: 'Evento deletado com sucesso.'};
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
