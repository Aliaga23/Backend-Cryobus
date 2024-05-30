const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization
  if (!token) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la autenticación', error });
  }
};

module.exports = { authenticate };
