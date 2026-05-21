const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025, // padrão MailPit
  ignoreTLS: true,
});

async function enviarEmail({ to, subject, text }) {
  await transporter.sendMail({
    from: "noreply@eventos.com",
    to,
    subject,
    text,
  });
}

module.exports = {
  enviarEmail,
};