const nodemailer = require('nodemailer');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor SMTP de Gmail
    port: 587, // Puerto para TLS
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: 'unlamlabelec@gmail.com', // Tu correo
      pass: 'TU_CONTRASEÑA_DE_APLICACION' // La contraseña de aplicación generada
    }
  });

  const mailOptions = {
    from: 'unlamlabelec@gmail.com', // Remitente
    to: 'matias.nd99@gmail.com', // Destinatario
    subject: 'Prueba de envío de correo',
    text: 'Este es un correo de prueba enviado desde Node.js con nodemailer.'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response);
  } catch (error) {
    console.error('Error enviando correo: ', error);
  }
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Cambiado a 465
  secure: true, // Cambiado a true
  auth: {
    user: 'unlamlabelec@gmail.com',
    pass: 'TU_CONTRASEÑA_DE_APLICACION'
  }
});


sendEmail();
