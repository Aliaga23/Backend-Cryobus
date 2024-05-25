const { getAllRegistros, addRegistro } = require('../models/bitacoraModel');
const io = require('../index'); // Asegúrate de que el servidor de Socket.io esté exportado en el index.js

const getRegistros = async (req, res) => {
  try {
    const registros = await getAllRegistros();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros', error });
  }
};

const createRegistro = async (req, res) => {
  try {
    const { IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO } = req.body;
    const nuevoRegistro = {
      IDACCION,
      IDUSUARIO,
      IP,
      FECHA,
      HORAACCION,
      ELEMENTOMODIFICADO
    };
    const insertId = await addRegistro(nuevoRegistro);
    nuevoRegistro.NRO = insertId;

    // Emitir el nuevo registro a través de Socket.io
    io.emit('nuevaAccion', nuevoRegistro);

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro', error });
  }
};

module.exports = {
  getRegistros,
  createRegistro,
};
