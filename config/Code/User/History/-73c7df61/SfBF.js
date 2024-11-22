const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = 'TU_CLIENT_ID';
const CLIENT_SECRET = 'TU_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // O tu URI de redirección
const REFRESH_TOKEN = 'TU_REFRESH_TOKEN';

module.exports.verificationEmail = async (req, res) => {
  const { to, subject, text, html } = req.body; // Asegúrate de que el cuerpo de la solicitud contenga estos datos

  try {
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'unlamlabelec@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'unlamlabelec@gmail.com',
      to: to, // El destinatario se obtiene del cuerpo de la solicitud
      subject: subject || 'Verificación de Cuenta', // Asunto por defecto
      text: text || 'Por favor, verifica tu cuenta.', // Texto plano por defecto
      html: html || '<h1>Por favor, verifica tu cuenta</h1>', // HTML por defecto
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', result);
    res.status(200).send('Correo de verificación enviado.');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send('Error al enviar el correo de verificación.');
  }
};
