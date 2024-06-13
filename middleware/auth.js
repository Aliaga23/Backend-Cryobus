const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    req.user = user; // Asegúrate de que req.user contenga toda la información necesaria
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la autenticación', error });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.IDROL !== role) {
      return res.status(403).json({ message: 'Usuario no autorizado' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
