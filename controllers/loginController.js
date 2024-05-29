const { getUserById } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { addRegistro } = require('../models/bitacoraModel');
const io = require('../index');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(pass, user.CONTRA);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    if (user && isMatch) {
      res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
      
      // Obtener IP del cliente desde el request
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // Obtener fecha y hora en la zona horaria de Bolivia (UTC-4)
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
      const boliviaTime = new Date(now.getTime() - utcOffset + (3600000 * -4)); // UTC-4

      const year = boliviaTime.getFullYear();
      const month = String(boliviaTime.getMonth() + 1).padStart(2, '0');
      const day = String(boliviaTime.getDate()).padStart(2, '0');
      const fecha = `${year}-${month}-${day}`;

      const hours = String(boliviaTime.getHours()).padStart(2, '0');
      const minutes = String(boliviaTime.getMinutes()).padStart(2, '0');
      const seconds = String(boliviaTime.getSeconds()).padStart(2, '0');
      const hora = `${hours}:${minutes}:${seconds}`;

      // Registrar la acción en la bitácora
      const registro = {
        IDACCION: 1, // ID de INICIAR SESION
        IDUSUARIO: user.ID,
        IP: ipAddress,
        FECHA: fecha,
        HORAACCION: hora,
        ELEMENTOMODIFICADO: 'LOGIN'
      };
      const registroId = await addRegistro(registro);

      // Emitir evento de nueva acción
      io.emit('nuevaAccion', { ...registro, NRO: registroId });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { loginUser };
