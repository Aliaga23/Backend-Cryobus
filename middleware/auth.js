const { pool } = require('../db.js');

const authenticateUser = async (req, res, next) => {
  const { id, pass } = req.body;
  try {
    const result = await pool.query('SELECT * FROM USUARIO WHERE ID = ? AND CONTRA = ?', [id, pass]);
    if (result.length > 0) {
      const user = result[0];
      const roleResult = await pool.query('SELECT NOMBRE FROM ROL WHERE ID = ?', [user.IDROL]);
      const role = roleResult[0];

      req.user = { id: user.ID, apellidos: user.APELLIDOS, nombres: user.NOMBRES, role: role.NOMBRE };
      next();
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error al intentar autenticar:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { authenticateUser };
