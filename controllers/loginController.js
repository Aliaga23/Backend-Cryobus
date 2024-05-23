// controllers/loginController.js
const bcrypt = require('bcrypt');
const LoginModel = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { id, pass } = req.body;
  db.query("SELECT * FROM USUARIO WHERE ID = ?", [id], async (err, results) => {
      if (err) {
          return res.status(500).json({ message: "Error en el servidor", error: err });
      }
      if (results.length === 0) {
          return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(pass, user.CONTRA);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ user: { id: user.ID } }, 'your_jwt_secret', { expiresIn: '1h' }); // Genera un token JWT
      
      // Obtener roles del usuario
      db.query(`
          SELECT R.NOMBRE AS ROL
          FROM USUARIO U
          JOIN ROL R ON U.IDROL = R.ID
          WHERE U.ID = ?
      `, [user.ID], (roleErr, roleResults) => {
          if (roleErr) {
              return res.status(500).json({ message: "Error al obtener roles del usuario", error: roleErr });
          }
          res.json({ token, user, roles: roleResults });
      });
  });
};

module.exports = {
  loginUser,
};
