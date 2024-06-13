const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/userModel');
const { getPermisosByRolId } = require('../models/permisoRolModel');

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
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expirado, por favor inicie sesión nuevamente.' });
    } else {
      res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
  }
};

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const permisos = await getPermisosByRolId(req.user.IDROL);
      const permisosIds = permisos.map((permiso) => permiso.IDPERMISO);

      const tienePermiso = requiredPermissions.some((permisoRequerido) => permisosIds.includes(permisoRequerido));
      if (!tienePermiso) {
        return res.status(403).json({ message: 'Usuario no autorizado' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar permisos', error: error.message });
    }
  };
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.IDROL !== requiredRole) {
      return res.status(403).json({ message: 'Usuario no autorizado' });
    }
    next();
  };
};

module.exports = { authenticate, authorize, authorizeRole };
