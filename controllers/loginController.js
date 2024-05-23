// controllers/loginController.js
const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE ID = ?', [id]);

    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await bcrypt.compare(pass, user.CONTRA);

      if (validPassword) {
        const rolesQuery = await pool.query('SELECT ROL.NOMBRE FROM ROL INNER JOIN USUARIO ON ROL.ID = USUARIO.IDROL WHERE USUARIO.ID = ?', [user.ID]);
        const roles = rolesQuery[0];

        res.json({
          message: 'Login exitoso',
          user: {
            id: user.ID,
            apellidos: user.APELLIDOS,
            nombres: user.NOMBRES
          },
          roles
        });
      } else {
        res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
    } else {
      res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    res.status(500).json({ message: 'Error  del servidor' });
}
};

module.exports = {
  loginUser,
};
