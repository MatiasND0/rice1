const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URI'
);
oAuth2Client.setCredentials({ refresh_token: 'REFRESH_TOKEN' });

async function sendMail() {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'tu-email@gmail.com',
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      refreshToken: 'REFRESH_TOKEN',
      accessToken: accessToken.token,
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: 'tu-email@gmail.com',
    to: 'destinatario@gmail.com',
    subject: 'Asunto del correo',
    text: 'Contenido en texto plano.',
  };

  // Enviar el correo
  const result = await transporter.sendMail(mailOptions);
  return result;
}
