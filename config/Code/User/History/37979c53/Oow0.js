const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Usa el puerto 587 para conexiones TLS
  secure: false, // false para TLS, true para SSL
  auth: {
    user: "unlamlabelec@gmail.com", // tu usuario de Ethereal
    pass: "urwq ohme lkit gwar", // tu contraseña de aplicación
  },
});

// Función principal asíncrona para enviar un correo
async function main() {
  try {
    const info = await transporter.sendMail({
      from: '"Laboratorio de electronica" <unlamlabelec@gmail.com>',
      to: "matias.nd99@gmail.com",
      subject: "Hello",
      text: "Hello world?"
    });

    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}

// Llama a la función principal
main();