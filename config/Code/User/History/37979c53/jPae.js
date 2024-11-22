const nodemailer = require('nodemailer');

async function sendEmail() {
  // Configura el transportador de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'unlamlabelec@gmail.com', // Tu correo
      pass: 'TU_CONTRASEÑA_DE_APLICACION' // La contraseña de aplicación generada
    }
  });

  // Define el contenido del correo
  const mailOptions = {
    from: 'unlamlabelec@gmail.com', // Remitente
    to: 'matias.nd99@gmail.com', // Destinatario
    subject: 'Prueba de envío de correo', // Asunto
    text: 'Este es un correo de prueba enviado desde Node.js con nodemailer.' // Cuerpo del mensaje
  };

  try {
    // Envía el correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response);
  } catch (error) {
    console.error('Error enviando correo: ', error);
  }
}

// Llama a la función para enviar el correo
sendEmail();
