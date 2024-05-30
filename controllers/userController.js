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
      IDACCION: 3, // ID de INICIAR SESION
      IDUSUARIO: 2801,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'CREACION DE USUARIO'
    };
    const registroId = await addRegistro(registro);
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
       IDACCION: 5, // ID de INICIAR SESION
       IDUSUARIO: 2801,
       IP: ipAddress,
       FECHA: fecha,
       HORAACCION: hora,
       ELEMENTOMODIFICADO: 'MODIFICACION DE USUARIO'
       
     };
     const registroId = await addRegistro(registro);
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
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Obtener fecha y hora en la zona horaria deseada
    const now = moment().tz('America/La_Paz'); // Ajusta según tu zona horaria
    const fecha = now.format('YYYY-MM-DD');
    const hora = now.format('HH:mm:ss');

    // Registrar la acción en la bitácora
    const registro = {
      IDACCION: 4, // ID de INICIAR SESION
      IDUSUARIO: 2801,
      IP: ipAddress,
      FECHA: fecha,
      HORAACCION: hora,
      ELEMENTOMODIFICADO: 'ELIMINACION DE USUARIO'
    };
    const registroId = await addRegistro(registro);
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
