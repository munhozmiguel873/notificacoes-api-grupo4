const fs = require('fs');
const path = require('path');
const appEmitter = require('./eventEmitter');

// Caminho da pasta logs
const logsDir = path.join(__dirname, '../../logs');

// Cria a pasta logs se não existir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Caminho do arquivo de log
const logFile = path.join(logsDir, 'app.log');

// Função para escrever logs
function escreverLog(mensagem) {
  const linha = `[${new Date().toISOString()}] ${mensagem}\n`;

  try {
    fs.appendFileSync(logFile, linha, 'utf8');
  } catch (erro) {
    console.error('Erro ao salvar log:', erro.message);
  }
}

// Observer de inscrição criada
appEmitter.on('inscricao:criada', (inscricao) => {
  escreverLog(`Inscrição #${inscricao.id} criada`);
});

// Observer de evento criado
appEmitter.on('evento:criado', (evento) => {
  escreverLog(`Evento #${evento.id} criado (${evento.nome})`);
});

module.exports = appEmitter;