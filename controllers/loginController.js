// controllers/loginController.js
const bcrypt = require('bcrypt');
const LoginModel = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  try {
    const user = await LoginModel.getUserById(id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.CONTRA);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

  } catch (error) {
    console.error('Error en la ruta /login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  loginUser,
};
