const { pool } = require('../db');

const getAllPlanRutas = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM PLANRUTA');
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPlanRutaById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM PLANRUTA WHERE ID = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPlanRuta = async (planRuta) => {
  const { id, nombreLocalidad, nombreDepartamento, fechaSalidaEsperada, horaSalidaEsperada, fechaLlegadaEsperada, horaLlegadaEsperada } = planRuta;
  try {
    await pool.query('INSERT INTO PLANRUTA (ID, NOMBRELOCALIDAD, NOMBREDEPARTAMENTO, FECHASALIDAESPERADA, HORASALIDAESPERADA, FECHALLEGADAESPERADA, HORALLEGADAESPERADA) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombreLocalidad, nombreDepartamento, fechaSalidaEsperada, horaSalidaEsperada, fechaLlegadaEsperada, horaLlegadaEsperada]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePlanRuta = async (id, planRuta) => {
  const { nombreLocalidad, nombreDepartamento, fechaSalidaEsperada, horaSalidaEsperada, fechaLlegadaEsperada, horaLlegadaEsperada } = planRuta;
  try {
    await pool.query('UPDATE PLANRUTA SET NOMBRELOCALIDAD = ?, NOMBREDEPARTAMENTO = ?, FECHASALIDAESPERADA = ?, HORASALIDAESPERADA = ?, FECHALLEGADAESPERADA = ?, HORALLEGADAESPERADA = ? WHERE ID = ?', [nombreLocalidad, nombreDepartamento, fechaSalidaEsperada, horaSalidaEsperada, fechaLlegadaEsperada, horaLlegadaEsperada, id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePlanRuta = async (id) => {
  try {
    await pool.query('DELETE FROM PLANRUTA WHERE ID = ?', [id]);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllPlanRutas,
  getPlanRutaById,
  createPlanRuta,
  updatePlanRuta,
  deletePlanRuta,
};
