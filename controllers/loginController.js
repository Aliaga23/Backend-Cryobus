const { getUserById } = require('../models/loginModel');

const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  const ip = req.ip;
  try {
    const user = await getUserById(id);
    if (!user) {
      await logAction(1, id, ip, 'Intento de login fallido: Usuario no encontrado'); // Log de intento fallido
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(pass, user.CONTRA);
    if (!isMatch) {
      await logAction(1, id, ip, 'Intento de login fallido: Contraseña incorrecta'); // Log de intento fallido
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
   
    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES }, role: user.IDROL });
  } catch (error) {
  
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { loginUser };
