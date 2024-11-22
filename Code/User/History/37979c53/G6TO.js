const nodemailer = require('nodemailer');

async function sendEmail() {
  // Crea el transportador usando SMTP de Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor SMTP de Gmail
    port: 587, // Puerto para TLS
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: 'unlamlabelec@gmail.com', // Tu correo
      pass: 'urwq ohme lkit gwar' // La contraseña de aplicación generada
    }
  });

  // Opciones del correo
  const mailOptions = {
    from: 'unlamlabelec@gmail.com', // Remitente
    to: 'matias.nd99@gmail.com', // Destinatario
    subject: 'Prueba de envío de correo', // Asunto del correo
    text: 'Este es un correo de prueba enviado desde Node.js con nodemailer.' // Cuerpo del correo
  };

  try {
    // Envía el correo y espera la respuesta
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response); // Muestra la respuesta del servidor
  } catch (error) {
    console.error('Error enviando correo: ', error); // Manejo de errores
  }
}

// Llama a la función para enviar el correo
sendEmail();
