const UserModel = require('../models/userModel');
const { addRegistro } = require('../models/bitacoraModel');
const io = require('../index'); // Asegúrate de importar desde el archivo correcto
const moment = require('moment-timezone');

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
  const userAuth = req.user; // Suponiendo que tienes un middleware de autenticación que añade el usuario autenticado al request
  try {
    await UserModel.createUser(newUser);
    res.status(201).json({ message: 'User created successfully' });

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz'); // Ajusta según tu zona horaria
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 3, // ID de CREACION DE ELEMENTO
      IDUSUARIO: userAuth.ID, // ID del usuario autenticado que crea el nuevo usuario
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE USUARIO'
    };
    const registroId = await addRegistro(registro);

    // Emitir evento de nueva acción
    io.emit('nuevaAccion', { ...registro, NRO: registroId });

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

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz'); // Ajusta según tu zona horaria
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 4, // ID de MODIFICACION DE ELEMENTO
      IDUSUARIO: userAuth.ID, // ID del usuario autenticado que actualiza el usuario
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ACTUALIZACION DE USUARIO'
    };
    const registroId = await addRegistro(registro);

    // Emitir evento de nueva acción
    io.emit('nuevaAccion', { ...registro, NRO: registroId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });

    // Obtener IP del cliente desde el request
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz'); // Ajusta según tu zona horaria
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 5, // ID de ELIMINACION DE ELEMENTO
      IDUSUARIO: userAuth.ID, // ID del usuario autenticado que elimina el usuario
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE USUARIO'
    };
    const registroId = await addRegistro(registro);

    // Emitir evento de nueva acción
    io.emit('nuevaAccion', { ...registro, NRO: registroId });

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

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
