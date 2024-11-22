const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Configuración del transporte de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Usa el puerto 587 para conexiones TLS
  secure: false, // false para TLS, true para SSL
  auth: {
    user: "unlamlabelec@gmail.com", // tu usuario
    pass: "urwq ohme lkit gwar", // tu contraseña de aplicación
  },
});

// Genera un token de verificación
function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Función para enviar el correo de verificación
async function sendVerificationEmail(email) {
  const token = generateVerificationToken();
  const verificationLink = `https://localhost.com/verificar?token=${token}`;

  try {
    const info = await transporter.sendMail({
      from: '"Laboratorio de Electrónica" <unlamlabelec@gmail.com>',
      to: email,
      subject: "Verificación de correo",
      html: `<p>Gracias por registrarte. Por favor, verifica tu correo haciendo clic en el siguiente enlace:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
    });

    console.log("Mensaje de verificación enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error enviando correo de verificación:", error);
  }
}

// Llama a la función para enviar el correo de verificación
sendVerificationEmail("matias.nd99@gmail.com");
