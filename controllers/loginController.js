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
          IDACCION: 1, // ID de INICIAR SESION
          IDUSUARIO: user.ID,
          IP: ipAddress,
          FECHA: fecha,
          HORAACCION: hora,
          ELEMENTOMODIFICADO: 'LOGIN'
        });
    
        // Emitir evento de nueva acción
        io.emit('nuevaAccion', {
          IDACCION: 1,
          IDUSUARIO: user.ID,
          IP: ipAddress,
          FECHA: fecha,
          HORAACCION: hora,
          ELEMENTOMODIFICADO: 'LOGIN'
        });
    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { loginUser };
