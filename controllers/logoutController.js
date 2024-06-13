const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');

const logoutUser = async (req, res) => {
  try {
    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Obtener el ID del usuario desde el token (asumiendo que has verificado el token antes de llegar aquí)
    const userId = req.user.userId; // Asegúrate de tener este valor disponible

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 2, // ID de acción para logout (asume que 2 es para logout)
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'LOGOUT'
    };
    const registroId = await addRegistro(registro);

    // Emitir evento de nueva acción
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });

    // Responder con éxito
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error en logoutUser:', error);
    res.status(500).json({ message: 'Error al cerrar sesión', error });
  }
};

module.exports = { logoutUser };
