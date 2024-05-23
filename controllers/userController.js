// controllers/userController.js
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');


const loginUser = async (req, res) => {
    const { id, pass } = req.body;
    try {
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }
  
      const isPasswordValid = await bcrypt.compare(pass, user.CONTRA);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }
  
      // Aquí puedes agregar lógica adicional, como generar un token o consultar roles
      res.json({ user, roles: ['role1', 'role2'] }); // Ajusta los roles según sea necesario
    } catch (error) {
      console.error('Error en la ruta /login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    await UserModel.createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    await UserModel.updateUser(id, updatedUser);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
