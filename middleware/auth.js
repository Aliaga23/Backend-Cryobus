const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');
const { getPermisosByUserId } = require('../models/permisoModel');

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
    req.user = user;

    // Obtener permisos del usuario
    const permisos = await getPermisosByUserId(user.ID);
    req.user.permisos = permisos.map(permiso => permiso.IDPERMISO);

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la autenticación', error });
  }
};

const authorize = (requiredPermisos) => {
  return (req, res, next) => {
    if (!req.user || !req.user.permisos) {
      return res.status(403).json({ message: 'Usuario no autorizado' });
    }
    const hasPermission = requiredPermisos.some(permiso => req.user.permisos.includes(permiso));
    if (!hasPermission) {
      return res.status(403).json({ message: 'Usuario no autorizado' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
