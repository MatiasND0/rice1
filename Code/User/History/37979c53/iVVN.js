// Importar las librerías necesarias
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql = require('mysql2');  // Puedes usar cualquier librería SQL
const bcrypt = require('bcrypt');

// Configuración del transporte de correo con nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_email@gmail.com',
        pass: 'tu_contraseña'
    }
});

// Configuración de la conexión a la base de datos
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'nombre_base_datos'
// });

// Función para registrar al usuario y enviar correo de verificación
async function registerUser(email, password) {
    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');  // Generar un token de verificación

    // Guardar usuario y token en la base de datos
    // db.query('INSERT INTO usuarios (email, password, token, verificado) VALUES (?, ?, ?, ?)',
    //     [email, hashedPassword, verificationToken, 0],
    //     (error, results) => {
    //         if (error) throw error;
    //         console.log('Usuario registrado correctamente');
            
            // Enviar correo electrónico de verificación
            const verificationLink = `http://localhost:3000/verificar?token=${verificationToken}`;
            const mailOptions = {
                from: 'tu_email@gmail.com',
                to: email,
                subject: 'Verificación de correo',
                text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationLink}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return console.error(error);
                console.log('Correo de verificación enviado: ' + info.response);
            });
        // }
    // );
}

// Endpoint para verificar el correo electrónico
app.get('/verificar', (req, res) => {
    const token = req.query.token;

    // Buscar al usuario en la base de datos usando el token
    // db.query('SELECT * FROM usuarios WHERE token = ?', [token], (error, results) => {
        if (error) throw error;
        
        if (results.length > 0) {
            // Actualizar el estado de verificación del usuario
            db.query('UPDATE usuarios SET verificado = 1 WHERE token = ?', [token], (error, results) => {
                if (error) throw error;
                res.send('Correo verificado correctamente.');
            });
        } else {
            res.send('Token inválido o usuario ya verificado.');
        }
    // });
});

