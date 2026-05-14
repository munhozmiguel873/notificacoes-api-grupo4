// src/app.js
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const express = require("express");
const app = express();

// Middleware para ler JSON no body
app.use(express.json());

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: '/eventos',
            participantes: '/participantes',
            inscricoes: '/inscricoes'
        },
    });
});

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        erro: err.message || "Erro interno do servidor",
    });
});

module.exports = app;