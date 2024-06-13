const UserModel = require('../models/userModel');
const { addRegistro } = require('../models/bitacoraModel');
const moment = require('moment-timezone');
const { getIO } = require('./socketController'); // Importar getIO para obtener io
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

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 3,
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE USUARIO'
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

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 4, // ID de ACTUALIZACION DE USUARIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ACTUALIZACION DE USUARIO'
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

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz');
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE USUARIO
      IDUSUARIO: userId,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE USUARIO'
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
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.ID; // Obtener el ID del usuario desde req.user

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
