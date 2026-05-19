require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');
const EmailService = require('./services/EmailService');

const PORT = process.env.PORT || 3000;

async function iniciar() {
    try {
        // conectar no banco
        await sequelize.authenticate();
        console.log('Conexão com MySQL estabelecida com sucesso!');

        // sincronizar tabelas
        await sequelize.sync();
        console.log('Tabelas sincronizadas com o banco de dados.');

        // iniciar serviço de e-mail
        await EmailService.inicializar();

        // iniciar servidor
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