const Participante = require("../models/ParticipanteModel");

const {
  NotFoundError,
  ValidationError,
} = require("../errors/AppError");

// 🔥 IMPORTAR EVENT EMITTER
const appEmitter = require("../events/eventEmitter");

async function listarTodos() {
  const participantes = await Participante.findAll({
    order: [["createdAt", "ASC"]],
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

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);

    // 🔥 DISPARAR EVENTO AQUI
    appEmitter.emit("participante:criado", novoParticipante);

    return novoParticipante;

  } catch (erro) {
    if (erro.name === "SequelizeValidationError") {
      const mensagens = erro.errors
        .map((e) => e.message)
        .join("; ");

      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

async function atualizar(id, dados) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError("Participante");
  }

  try {
    await participante.update(dados);

    return participante;
  } catch (erro) {
    if (erro.name === "SequelizeValidationError") {
      const mensagens = erro.errors
        .map((e) => e.message)
        .join("; ");

      throw new ValidationError(mensagens);
    }

    throw erro;
  }
}

async function deletar(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError("Participante");
  }

  await participante.destroy();

  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};