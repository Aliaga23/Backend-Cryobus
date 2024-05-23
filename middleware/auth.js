const { getUserById } = require('../models/userModel');

const authenticate = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    req.user = user;
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
