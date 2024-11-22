const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const connection = require('../models/db'); // Comentado para omitir la base de datos

const JWT_SECRET = 'unlam';

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'unlamlabelec@gmail.com', // Configura tu correo aquí
        pass: 'Laboratorio2022'       // Configura tu contraseña aquí
    }
});

module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlUser = 'SELECT * FROM usuarios WHERE username = ?';

    try {
        // connection.query(sqlUser, [username], (err, results) => { // Comentado para omitir la base de datos
        const results = []; // Mock de resultados para prueba sin BD
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error al comparar las contraseñas', error: err });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Lógica de autenticación del usuario
            const token = jwt.sign(
                { 
                    id_usuario: user.id_usuario,
                    username: user.username,
                    role: user.rol,
                }, 
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ message: 'Autenticación exitosa', token });
        });
        // }); // Comentado para omitir la base de datos
    } catch (e) {
        return res.status(500).json({ message: 'Error en el servidor', error: e });
    }
};

module.exports.register = (req, res) => {
    const { username, password, rol, nro_telefono, nombre, apellido, dni } = req.body;

    if (!username || !password || !rol || !nro_telefono || !nombre || !apellido || !dni) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Encriptar la contraseña y generar token de verificación
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error al encriptar la contraseña', error: err });
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        // connection.query('INSERT INTO usuarios (password, username, token, verificado) VALUES (?, ?, ?, ?)', [hashedPassword, username, verificationToken, 0], (err, results) => {
        //     if (err) {
        //         return res.status(500).json({ message: 'Error en el servidor', error: err });
        //     }

        const verificationLink = `http://localhost:3000/verificar?token=${verificationToken}`;
        const mailOptions = {
            from: 'tu_email@gmail.com',
            to: username,
            subject: 'Verificación de correo',
            text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationLink}`
        };

        // Enviar correo de verificación
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ message: 'Error al enviar el correo', error });
            res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta.' });
        });
        // });
    });
};

module.exports.verificar = (req, res) => {
    const token = req.query.token;

    // Verificación del token (simulación, normalmente se haría con la base de datos)
    if (token) {
        // connection.query('SELECT * FROM usuarios WHERE token = ?', [token], (err, results) => {
        //     if (err) return res.status(500).json({ message: 'Error en el servidor', error: err });
        //     if (results.length > 0) {
        //         connection.query('UPDATE usuarios SET verificado = 1 WHERE token = ?', [token], (err, results) => {
        //             if (err) return res.status(500).json({ message: 'Error en el servidor', error: err });
        //             return res.status(200).json({ message: 'Correo verificado correctamente.' });
        //         });
        //     } else {
        //         return res.status(400).json({ message: 'Token inválido o usuario ya verificado.' });
        //     }
        // });
        return res.status(200).json({ message: 'Simulación: correo verificado correctamente.' });
    } else {
        return res.status(400).json({ message: 'Token inválido o usuario ya verificado.' });
    }
};

