const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña'
    }
});

// Función para enviar correo de verificación
const sendVerificationEmail = async (userEmail, verificationLink) => {
    try {
        const mailOptions = {
            from: '"Nombre de tu App" <tu-email@gmail.com>',
            to: userEmail,
            subject: 'Verificación de Correo Electrónico',
            html: `
                <h2>¡Gracias por registrarte!</h2>
                <p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p>
                <a href="${verificationLink}">Verificar mi cuenta</a>
                <br/>
                <p>Si no has solicitado este registro, puedes ignorar este mensaje.</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado a:', userEmail);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo de verificación');
    }
};

// Método POST para manejar la solicitud de verificación de correo
module.exports.verificationEmail = async (req, res) => {
    const { email } = req.body;

    // Verifica si el email está presente en la solicitud
    if (!email) {
        return res.status(400).json({ message: 'El correo electrónico es requerido' });
    }

    try {
        // Generar un token de verificación (puedes usar cualquier librería como jsonwebtoken o un uuid)
        const token = 'aquí-generar-tu-token'; // Reemplaza con un generador de token
        const verificationLink = `https://tuapp.com/verificar?token=${token}`; // Reemplaza con la URL de tu app

        // Envía el correo de verificación
        await sendVerificationEmail(email, verificationLink);

        // Respuesta exitosa
        return res.status(200).json({ message: 'Correo de verificación enviado' });
    } catch (error) {
        // En caso de error
        return res.status(500).json({ message: 'Error al enviar el correo de verificación' });
    }
};
