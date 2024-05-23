// controllers/loginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const { JWT_SECRET } = require('../config');

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

   

    res.json({ token, user: { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES, roles: user.IDROL } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
};
