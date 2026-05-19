const EventoService = require('../services/EventoService');
const cache = require('../config/cache');

async function index(req, res, next) {
  try {
    const chaveCache = `eventos:${JSON.stringify(req.query)}`;

    const cacheEventos = cache.get(chaveCache);

    if (cacheEventos) {
      return res.json(cacheEventos);
    }

    const resultado = await EventoService.listarTodos({
      pagina: parseInt(req.query.pagina) || 1,
      porPagina: parseInt(req.query.porPagina) || 10,
      ordenarPor: req.query.ordenarPor || 'created_at',
      ordem: req.query.ordem || 'DESC',
      busca: req.query.busca || '',
    });

    cache.set(chaveCache, resultado);

    res.json(resultado);
  } catch (erro) {
    next(erro);
  }
}

async function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: 'ID inválido',
      });
    }

    const evento = await EventoService.buscarPorId(id);

    res.json(evento);
  } catch (erro) {
    next(erro);
  }
}

async function store(req, res, next) {
  try {
    const novoEvento = await EventoService.criar(req.body);

    // Limpar cache
    cache.flushAll();

    res.status(201).json(novoEvento);
  } catch (erro) {
    next(erro);
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: 'ID inválido',
      });
    }

    const eventoAtualizado = await EventoService.atualizar(
      id,
      req.body
    );

    // Limpar cache
    cache.flushAll();

    res.json(eventoAtualizado);
  } catch (erro) {
    next(erro);
  }
}

async function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        erro: 'ID inválido',
      });
    }

    await EventoService.deletar(id);

    // Limpar cache
    cache.flushAll();

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

async function listarFuturos(req, res, next) {
  try {
    const chaveCache = 'eventos:futuros';

    const cacheEventos = cache.get(chaveCache);

    if (cacheEventos) {
      return res.json(cacheEventos);
    }

    const eventos = await EventoService.listarFuturos();

    cache.set(chaveCache, eventos);

    res.json(eventos);
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
  listarFuturos,
};