const fs = require('fs');
const path = require('path');
const appEmitter = require('./eventEmitter');

// garante que a pasta logs exista
const logsDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// observer de inscrição criada
appEmitter.on('inscricao:criada', (inscricao) => {
  const linha = `[${new Date().toISOString()}] Inscrição #${inscricao.id} criada\n`;

  fs.appendFileSync(
    path.join(logsDir, 'app.log'),
    linha
  );
});

// observer de evento criado
appEmitter.on('evento:criado', (evento) => {
  const linha = `[${new Date().toISOString()}] Evento #${evento.id} criado (${evento.nome})\n`;

  fs.appendFileSync(
    path.join(logsDir, 'app.log'),
    linha
  );
});