const connection = require('../models/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'unlam';

module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlUser = 'SELECT * FROM usuarios WHERE username = ?';

    try {
        connection.query(sqlUser, [username], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el servidor', error: err });
            }
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

                // Consulta para obtener las materias del usuario
                const sqlMaterias = `
                    SELECT m.cod_materia, m.materia 
                    FROM laboratorioTesting.usuarios u
                    JOIN laboratorioTesting.usuario_materia um ON u.id_usuario = um.usuarios_id_usuario
                    JOIN laboratorioTesting.materias m ON um.materias_cod_materia = m.cod_materia
                    WHERE u.id_usuario = ?`;

                connection.query(sqlMaterias, [user.id_usuario], (err, materiasResults) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al obtener materias', error: err });
                    }
                    const token = jwt.sign(
                        { 
                            id_usuario: user.id_usuario,     
                            username: user.username, 
                            role: user.rol,            
                            phoneNumber: user.nro_telefono, 
                            nombre: user.nombre,      
                            apellido: user.apellido,   
                            dni: user.dni,
                            materias: materiasResults // Añade las materias al token
                        }, 
                        JWT_SECRET,
                        { expiresIn: '1m' }
                    );
                    console.log(token);
                    console.log('a');
                    return res.status(200).json({ message: 'Autenticación exitosa', token, materias: materiasResults });
                });
            });
        });
    } catch (e) {
        return res.status(500).json({ message: 'Error en el servidor', error: e });
    }
};

module.exports.register = (req, res) => {
    const { username, password, rol, nro_telefono, nombre, apellido, cod_materias, dni } = req.body;

    // Validaciones simples
    if (!username || !password || !rol || !nro_telefono || !nombre || !apellido || !cod_materias || !dni ) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error al encriptar la contraseña', error: err });
        }
        const sqlInsertUser = 'INSERT INTO usuarios (password, username, nro_telefono, nombre, apellido, rol, dni) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(sqlInsertUser, [hashedPassword, username, nro_telefono, nombre, apellido, rol, dni], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el servidor', error: err });
            }

            // Obtener el ID del usuario recién creado
            const userId = results.insertId;

            // Preparar la inserción en la tabla usuario_materia
            const sqlInsertUserMateria = 'INSERT INTO usuario_materia (usuarios_id_usuario, materias_cod_materia) VALUES (?, ?)';
            const userMateriaPromises = cod_materias.map(cod_materia => {
                return new Promise((resolve, reject) => {
                    connection.query(sqlInsertUserMateria, [userId, cod_materia], (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            // Ejecutar todas las inserciones en usuario_materia
            Promise.all(userMateriaPromises)
                .then(() => {
                    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
                })
                .catch(err => {
                    return res.status(500).json({ message: 'Error al asociar materias al usuario', error: err });
                });
        });
    });
};

module.exports.checkAuth = (req, res) => {
    res.status(200).json({ message: `Usuario autenticado: ${req.session.user.username}` });
};

module.exports.deleteUser = (req, res) => {
    const userId = req.params.id; // Suponiendo que el ID se pasa como parámetro en la URL

    if (!userId) {
        return res.status(400).json({ message: 'ID de usuario es obligatorio' });
    }

    const sql = 'DELETE FROM usuarios WHERE id = ?';

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
};

module.exports.logout = (req, res) => {
    // Aquí puedes eliminar la sesión del usuario o el token
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
};


// hhouse@debian:~/workspace/web_unlam$ curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{
//     "username": "admin",
//     "password": "xxx",
//     "rol": 1,
//     "nro_telefono": "1234567890",
//     "nombre": "Admin",
//     "apellido": "User",
//     "dni": 12345678,
//     "cod_materias": [3730]
// }'