const EventEmitter = require('events');
module.exports = new EventEmitter();

// Um único emissor compartilhado por toda a aplicação
const appEmitter = new EventEmitter();

module.exports = appEmitter;