const { getAllRegistros, addRegistro } = require('../models/bitacoraModel');

const fetchAllRegistros = async (req, res) => {
  try {
    const registros = await getAllRegistros();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la bitácora', error });
  }
};

const createRegistro = async (req, res) => {
  const registro = req.body;
  try {
    const id = await addRegistro(registro);
    res.status(201).json({ message: 'Registro añadido', id });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el registro', error });
  }
};

module.exports = {
  fetchAllRegistros,
  createRegistro,
};
