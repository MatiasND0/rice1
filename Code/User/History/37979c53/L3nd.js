const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CLIENT_ID = '853237228428-jjdk4278sleie802cb8o8gltilrfgsl2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04oKwPclEQbsfCgYIARAAGAQSNwF-L9IrerEJoBjQNWsj6wKioS6BAoF_HG9LkN_nuc4De2V34tT9eaK7krrpbXKf2Ptdw4byJkw';  // Debes obtener el token de refresco una vez

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const email = [
      'From: "Unlam Labelec" <unlamlabelec@gmail.com>',
      'To: matias.nd99@gmail.com',
      'Subject: Prueba de envío de correo con Node.js y Gmail API',
      '',
      '¡Hola! Este es un correo de prueba enviado usando la API de Gmail y Node.js.',
    ].join('\n');

    const encodedMessage = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(`Correo enviado: ${res.data.id}`);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
}

sendEmail();
