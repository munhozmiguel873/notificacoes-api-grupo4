require('dotenv').config();
// require("./events/participanteObserver");

const app = require('./app');
const { sequelize } = require('./models');
const EmailService = require('./services/EmailService');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    // Conexão com banco
    await sequelize.authenticate();

    console.log('✅ Conexão com MySQL estabelecida com sucesso!');

    // Inicializar e-mail
    await EmailService.inicializar();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📄 Swagger: http://localhost:${PORT}/api-docs`);
    });

  } catch (erro) {
    console.error('❌ Erro ao iniciar aplicação:', erro.message);
    process.exit(1);
  }
}

iniciar();