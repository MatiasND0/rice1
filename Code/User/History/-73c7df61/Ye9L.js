const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = 'TU_CLIENT_ID';
const CLIENT_SECRET = 'TU_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // O tu URI de redirección
const REFRESH_TOKEN = 'TU_REFRESH_TOKEN';

module.exports.verificationEmail = async (req, res) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'tu-email@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'tu-email@gmail.com',
      to: 'destinatario@gmail.com',
      subject: 'Asunto del correo',
      text: 'Contenido en texto plano.',
      html: '<h1>Contenido en HTML</h1>',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', result);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
}

sendMail();
