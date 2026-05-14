// src/routes/inscricaoRoutes.js
const express = require("express");
const router = express.Router();

const InscricaoController = require("../controllers/InscricaoController");

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma nova inscrição
 *     tags: [Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventoId
 *               - participanteId
 *             properties:
 *               eventoId:
 *                 type: integer
 *                 description: ID do evento
 *               participanteId:
 *                 type: integer
 *                 description: ID do participante
 *           example:
 *             eventoId: 1
 *             participanteId: 2
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos ou inscrição duplicada
 *       404:
 *         description: Evento ou participante não encontrado
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscrições]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições de um evento
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Inscrições do evento
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/eventos/{eventoId}:
 *   get:
 *     summary: Listar inscrições de um evento (rota alternativa)
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Inscrições do evento
 */
router.get("/eventos/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscrições]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     responses:
 *       204:
 *         description: Inscrição cancelada
 *       404:
 *         description: Inscrição não encontrada
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;