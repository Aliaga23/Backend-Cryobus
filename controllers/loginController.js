const { getUserById } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const io = require('../index'); // Asegúrate de que esta importación esté correcta
const jwt = require('jsonwebtoken');

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
    const token = jwt.sign(
      { userId: user.ID, role: user.IDROL },
      process.env.JWT_SECRET, // Usa la clave secreta desde el entorno
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
    // Enviar respuesta de éxito antes de ejecutar la lógica adicional
    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz'); // Ajusta según tu zona horaria
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

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

  } catch (error) {
    console.error('Error en loginUser:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  }
};

module.exports = { loginUser };
