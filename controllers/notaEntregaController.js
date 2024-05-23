// controllers/notasEntregaController.js
const pool = require('../db');

const getAllNotasEntrega = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM NOTAENTREGA');
    res.json(results);
  } catch (error) {
    console.error('Error getting notas de entrega:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNotaEntregaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM NOTAENTREGA WHERE NRO = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Nota de Entrega not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error getting nota de entrega by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNotaEntrega = async (req, res) => {
  const {
    FECHARECEPCION,
    HORARECEPCION,
    FECHAENTREGA,
    HORAENTREGA,
    PRECIOESTIMADO,
    CODIGOCLIENTEENVIA,
    CODIGOCLIENTERECIBE,
    IDUSUARIOENVIA,
    IDUSUARIORECIBE,
    IDTIPOENVIO,
    IDESTADOENTREGA,
    NROREEMBOLSO,
    CODIGOPAQUETE,
    NRONOTATRASLADO,
  } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO NOTAENTREGA (FECHARECEPCION, HORARECEPCION, FECHAENTREGA, HORAENTREGA, PRECIOESTIMADO, CODIGOCLIENTEENVIA, CODIGOCLIENTERECIBE, IDUSUARIOENVIA, IDUSUARIORECIBE, IDTIPOENVIO, IDESTADOENTREGA, NROREEMBOLSO, CODIGOPAQUETE, NRONOTATRASLADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        FECHARECEPCION,
        HORARECEPCION,
        FECHAENTREGA,
        HORAENTREGA,
        PRECIOESTIMADO,
        CODIGOCLIENTEENVIA,
        CODIGOCLIENTERECIBE,
        IDUSUARIOENVIA,
        IDUSUARIORECIBE,
        IDTIPOENVIO,
        IDESTADOENTREGA,
        NROREEMBOLSO,
        CODIGOPAQUETE,
        NRONOTATRASLADO,
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating nota de entrega:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateNotaEntrega = async (req, res) => {
  const { id } = req.params;
  const {
    FECHARECEPCION,
    HORARECEPCION,
    FECHAENTREGA,
    HORAENTREGA,
    PRECIOESTIMADO,
    CODIGOCLIENTEENVIA,
    CODIGOCLIENTERECIBE,
    IDUSUARIOENVIA,
    IDUSUARIORECIBE,
    IDTIPOENVIO,
    IDESTADOENTREGA,
    NROREEMBOLSO,
    CODIGOPAQUETE,
    NRONOTATRASLADO,
  } = req.body;

  try {
    await pool.query(
      'UPDATE NOTAENTREGA SET FECHARECEPCION = ?, HORARECEPCION = ?, FECHAENTREGA = ?, HORAENTREGA = ?, PRECIOESTIMADO = ?, CODIGOCLIENTEENVIA = ?, CODIGOCLIENTERECIBE = ?, IDUSUARIOENVIA = ?, IDUSUARIORECIBE = ?, IDTIPOENVIO = ?, IDESTADOENTREGA = ?, NROREEMBOLSO = ?, CODIGOPAQUETE = ?, NRONOTATRASLADO = ? WHERE NRO = ?',
      [
        FECHARECEPCION,
        HORARECEPCION,
        FECHAENTREGA,
        HORAENTREGA,
        PRECIOESTIMADO,
        CODIGOCLIENTEENVIA,
        CODIGOCLIENTERECIBE,
        IDUSUARIOENVIA,
        IDUSUARIORECIBE,
        IDTIPOENVIO,
        IDESTADOENTREGA,
        NROREEMBOLSO,
        CODIGOPAQUETE,
        NRONOTATRASLADO,
        id,
      ]
    );
    res.status(200).json({ message: 'Nota de Entrega updated successfully' });
  } catch (error) {
    console.error('Error updating nota de entrega:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteNotaEntrega = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM NOTAENTREGA WHERE NRO = ?', [id]);
    res.status(200).json({ message: 'Nota de Entrega deleted successfully' });
  } catch (error) {
    console.error('Error deleting nota de entrega:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotasEntrega,
  getNotaEntregaById,
  createNotaEntrega,
  updateNotaEntrega,
  deleteNotaEntrega,
};
