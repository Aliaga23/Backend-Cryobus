const { getAllRegistros, addRegistro } = require('../models/bitacoraModel');
const UserModel = require('../models/userModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  const userId = req.user.ID;
  try {
    await UserModel.createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 3,
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE USUARIO',
      DETALLE: `Usuario creado: ${newUser.id} - ${newUser.nombres} ${newUser.apellidos}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const userId = req.user.ID;
  try {
    await UserModel.updateUser(id, updatedUser);
    res.status(200).json({ message: 'User updated successfully' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 4, // ID de ACTUALIZACION DE USUARIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ACTUALIZACION DE USUARIO',
      DETALLE: `Usuario actualizado: ${id} - ${updatedUser.nombres} ${updatedUser.apellidos}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.ID;
  try {
    await UserModel.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE USUARIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE USUARIO',
      DETALLE: `Usuario eliminado: ${id}`
    };
    const registroId = await addRegistro(registro);
    const io = getIO();
    io.emit('nuevaAccion', { ...registro, NRO: registroId });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
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

const changePassword = async (req, res) => {
  const userId = req.user.ID;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.CONTRA);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña antigua incorrecta' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(userId, hashedPassword);

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar la contraseña', error });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  changePassword
};
