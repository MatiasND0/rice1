const connection = require('../models/db')

module.exports.avaliableProy = (req, res) => {
    const { fecha, turno } = req.body; // Asegúrate de recibir la fecha y el turno del cliente

    const sql = `
        SELECT p.nro_inv, p.cod_rec, p.estado, p.ubicacion, p.modelo, p.marca
        FROM proyectores AS p
        LEFT JOIN reservas AS r
        ON p.nro_inv = r.proyectores_nro_inv
        AND DATE(r.fecha) = ?
        AND r.turno = ?
        WHERE r.id_reserva IS NULL
        AND p.estado = 'Fun_D';
    `;

    try {
        connection.query(sql, [fecha, turno], (err, results) => {
            if (err) {
                console.error('Error ejecutando la consulta: ', err);
                res.status(500).send('Error ejecutando la consulta');
                return;
            }
            res.json(results); // Devuelve los proyectores disponibles
        });
    } catch (error) {
        console.error('Error al procesar la solicitud: ', error);
        res.status(500).send('Error al procesar la solicitud');
    }
};

module.exports.bookProy = (req, res) => {
    const { fecha, turno, nro_inv, username, cod_materia, aula } = req.body;

    // Validar que se recibieron los datos necesarios
    if (!fecha || !turno || !nro_inv || !username || !cod_materia || !aula) {
        return res.status(400).json({ error: 'Faltan datos necesarios para realizar la reserva' });
    }

    // Consulta para obtener el ID del usuario y verificar que esté asociado con la materia
    const getUserIdSql = `
        SELECT u.id_usuario 
        FROM laboratorioTesting.usuarios AS u
        JOIN laboratorioTesting.usuario_materia AS um ON u.id_usuario = um.usuarios_id_usuario
        JOIN laboratorioTesting.materias AS m ON um.materias_cod_materia = m.cod_materia
        WHERE u.username = ? AND m.cod_materia = ?;
    `;

    connection.query(getUserIdSql, [username, cod_materia], (err, userResults) => {
        if (err || userResults.length === 0) {
            console.error('Error al verificar usuario o materia:', err);
            return res.status(500).json({ error: 'Error al verificar usuario o materia' });
        }

        const usuarioId = userResults[0].id_usuario;

        // Consulta SQL para insertar una nueva reserva
        const sql = `
            INSERT INTO laboratorioTesting.reservas (proyectores_nro_inv, fecha, turno, usuario_materia_usuarios_id_usuario, usuario_materia_materias_cod_materia, aula) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Ejecutar la consulta de reserva
        connection.query(sql, [nro_inv, fecha, turno, usuarioId, cod_materia, aula], (err, results) => {
            if (err) {
                console.error('Error al realizar la reserva:', err);
                return res.status(500).json({ error: 'Error al realizar la reserva' });
            }
            res.status(201).json({ message: 'Reserva realizada exitosamente', id: results.insertId });

        });
    });
};

module.exports.bookedProy = (req, res) => {
    const { username, role, fecha } = req.body;

    // Validar que se recibieron los datos necesarios
    if (!username) {
        return res.status(400).json({ error: 'Error: Se requiere un username.' });
    }

    // Declarar sql 
    let sql = `
        SELECT r.*, u.*
        FROM reservas r
        JOIN usuario_materia um ON r.usuario_materia_usuarios_id_usuario = um.usuarios_id_usuario
        JOIN usuarios u ON um.usuarios_id_usuario = u.id_usuario
        WHERE u.username = ? AND r.fecha >= CURDATE();
    `;

    // Si el rol es 1, modificamos la consulta
    if (role === 1) {
        sql = `SELECT 
                r.id_reserva, 
                r.fecha, 
                r.turno, 
                r.aula,          -- Nuevo campo aula
                u.id_usuario, 
                u.username, 
                u.nombre, 
                u.apellido, 
                u.nro_telefono, 
                GROUP_CONCAT(DISTINCT m.materia SEPARATOR ', ') AS materias, 
                p.cod_rec
            FROM reservas r
            JOIN usuario_materia um 
                ON r.usuario_materia_usuarios_id_usuario = um.usuarios_id_usuario 
                AND r.usuario_materia_materias_cod_materia = um.materias_cod_materia
            JOIN usuarios u 
                ON um.usuarios_id_usuario = u.id_usuario
            JOIN materias m 
                ON um.materias_cod_materia = m.cod_materia
            JOIN proyectores p 
                ON r.proyectores_nro_inv = p.nro_inv
            WHERE r.fecha >= CURDATE()  -- Filtrar fechas de hoy en adelante
            GROUP BY r.id_reserva, r.aula, u.id_usuario, u.username, u.nombre, u.apellido, u.nro_telefono, p.cod_rec;
        `;
    }

    // Ejecutar la consulta
    connection.query(sql, role === 1 ? [] : [username], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            return res.status(500).json({ error: 'Error al realizar la consulta' });
        }
        res.status(200).json(results);
    });
};

module.exports.deleteBooking = (req, res) => {
    const reservaId = req.params.id;
    const sql = 'DELETE FROM reservas WHERE id_reserva = ?';
    connection.query(sql, [reservaId], (error, results) => {
        if (error) {
            console.error('Error al eliminar la reserva:', error);
            return res.status(500).json({ error: 'Error al eliminar la reserva' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.status(200).json({ message: 'Reserva eliminada exitosamente' });
    });
};

module.exports.withdrawals = (req, res) => {
    console.log(req.body);
};