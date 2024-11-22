const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

// Ruta del archivo de credenciales
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Autentica y obtiene el cliente OAuth2
async function authorize() {
  const auth = await authenticate({
    keyfilePath: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
  });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(auth.credentials));
  return auth;
}

// Enviar el correo electrónico
async function sendEmail(auth) {
  const gmail = google.gmail({ version: 'v1', auth });

  const email = [
    'From: "Tu Nombre" <tu-email@gmail.com>',
    'To: destinatario@example.com',
    'Subject: Enviando un correo desde Node.js con Gmail API',
    '',
    'Este es un correo de prueba enviado desde una aplicación de Node.js usando la API de Gmail!',
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
}

// Ejecuta la autenticación y envía el correo
authorize()
  .then(sendEmail)
  .catch(console.error);
