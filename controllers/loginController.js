const { getUserById } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { registrarAccion } = require('./bitacoraController'); // Importar controlador de bitácora

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

    // Registrar la acción de inicio de sesión
    registrarAccion(1, user.ID, 'LOGIN'); // ID de acción para login, ajustar según sea necesario

    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

const logoutUser = async (req, res) => {
  const { id } = req.body;
  try {
    // Registrar la acción de cierre de sesión
    registrarAccion(2, id, 'LOGOUT'); // ID de acción para logout, ajustar según sea necesario

    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar sesión', error });
  }
};

module.exports = { loginUser, logoutUser };
