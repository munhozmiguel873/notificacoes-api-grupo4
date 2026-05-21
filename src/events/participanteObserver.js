const participanteEvents = require("../events/participanteEvents");
const MailService = require("../services/MailService");

// 👂 ouvindo evento
participanteEvents.on("participante:criado", async (participante) => {
  try {
    await MailService.enviarEmail({
      to: participante.email,
      subject: "Bem-vindo!",
      text: `Bem-vindo à Plataforma de Eventos, ${participante.nome}!`,
    });

    console.log("📩 E-mail de boas-vindas enviado!");
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err.message);
  }
});