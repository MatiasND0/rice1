const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'unlamlabelec@gmail.com', // Tu correo
    pass: 'urwq ohme lkit gwar' // La contraseña de aplicación generada
  }
});

const mailOptions = {
  from: 'unlamlabelec@gmail.com',
  to: 'matias.nd99@gmail.com',
  subject: 'Asunto del Correo',
  text: 'Este es el contenido del correo.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error enviando correo:', error);
  } else {
    console.log('Correo enviado: ' + info.response);
  }
});
