// controllers/loginController.js
const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  try {
    const user = await loginModel.getUserById(id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(pass, user.CONTRA);
    if (!isMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    res.json({ message: 'Login exitoso', user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES, roles: user.IDROL } });
    
  } catch (error) {
    console.error('Error en loginUser:', error.message); // Añadir log del error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  loginUser,
};
