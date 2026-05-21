const nodemailer = require('nodemailer');

let transporter = null;

// Configurações do MailPit
const SMTP_HOST = process.env.SMTP_HOST || '10.137.146.106';
const SMTP_PORT = process.env.SMTP_PORT || 1025;

const MAILPIT_URL = `http://${SMTP_HOST}:8025`;

/**
 * Inicializa o serviço de e-mail
 */
async function inicializar() {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();

    console.log('══════════════════════════════════════');
    console.log('📧 Servidor de e-mail conectado!');
    console.log(`📨 SMTP: ${SMTP_HOST}:${SMTP_PORT}`);
    console.log(`🌐 Painel MailPit: ${MAILPIT_URL}`);
    console.log('══════════════════════════════════════');

  } catch (erro) {
    console.error('⚠️ Erro ao conectar no MailPit:', erro.message);
  }
}

/**
 * Enviar e-mail
 */
async function enviar(para, assunto, html) {
  if (!transporter) {
    throw new Error(
      'EmailService não inicializado. Chame inicializar() primeiro.'
    );
  }

  const info = await transporter.sendMail({
    from: '"Plataforma de Eventos" <eventos@notificacoes.com>',
    to: para,
    subject: assunto,
    html: html,
  });

  console.log('══════════════════════════════════════');
  console.log(`📧 E-mail enviado para: ${para}`);
  console.log(`🆔 Message ID: ${info.messageId}`);
  console.log(`🌐 Visualizar em: ${MAILPIT_URL}`);
  console.log('══════════════════════════════════════');

  return {
    messageId: info.messageId,
    visualizarEm: MAILPIT_URL,
  };
}

module.exports = {
  inicializar,
  enviar,
};