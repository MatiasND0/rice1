const { Sequelize } = require('sequelize');

// Configura la conexión (ajusta los datos según tu base de datos)
const sequelize = new Sequelize('nombre_base_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql', // Cambia esto a 'postgres', 'sqlite', etc., según tu base de datos
});

// Prueba la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

module.exports = sequelize;
