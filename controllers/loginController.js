const { getUserById } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { addRegistro } = require('../models/bitacoraModel');
const io = require('../index');
const fetch = require('node-fetch'); // Asegúrate de que `fetch` esté disponible

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
    if(user && isMatch)
      {
    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
    // Obtener IP del cliente
    const ipAPI = "https://api.ipify.org?format=json";
    const response = await fetch(ipAPI);
    const data = await response.json();
    const ipAddress = data.ip;

    // Registrar la acción en la bitácora
    const fecha = new Date().toISOString().split('T')[0];
    const hora = new Date().toTimeString().split(' ')[0];
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
