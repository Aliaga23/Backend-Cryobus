const { addRegistro } = require('../models/bitacoraModel');
const io = require('../index');

const logoutUser = async (req, res) => {
  const { id } = req.body;
  try {
    // Obtener IP del cliente
    const ipAPI = "https://api.ipify.org?format=json";
    const response = await fetch(ipAPI);
    const data = await response.json();
    const ipAddress = data.ip;

    // Obtener fecha y hora actuales
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0];

    // Registrar la acción en la bitácora
    await addRegistro({
      IDACCION: 2, // ID de CERRAR SESION
      IDUSUARIO: id,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'LOGOUT'
    });

    // Emitir evento de nueva acción
    io.emit('nuevaAccion', {
      IDACCION: 2,
      IDUSUARIO: id,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'LOGOUT'
    });

    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar sesión', error });
  }
};

module.exports = { logoutUser };
