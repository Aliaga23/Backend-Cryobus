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
    const permisos = await getPermisosByRolId(user.IDROL);
    req.user = { ...user, permisos: permisos.map(p => p.IDPERMISO) };
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la autenticación', error });
  }
};

module.exports = { authenticate };
