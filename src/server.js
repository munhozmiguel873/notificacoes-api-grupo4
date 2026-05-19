require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');
const EmailService = require('./services/EmailService');

// Importa os observers
require('./events/logObserver');

const PORT = process.env.PORT || 3000;

async function iniciar() {
    try {

        // Conectar no banco
        await sequelize.authenticate();
        console.log('Conexão com MySQL estabelecida com sucesso!');

        // Sincronizar tabelas
        await sequelize.sync();
        console.log('Tabelas sincronizadas com o banco de dados.');

        // Inicializar serviço de e-mail
        await EmailService.inicializar();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log(`Documentação: http://localhost:${PORT}/api-docs`);
        });

    } catch (erro) {

        console.error('Erro ao iniciar:', erro.message);

        process.exit(1);
    }
}

iniciar();