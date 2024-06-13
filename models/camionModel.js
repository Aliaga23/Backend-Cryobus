const { pool } = require('../db');

const getCamiones = async () => {
  const [rows] = await pool.query('SELECT * FROM CAMION');
  return rows;
};

const getCamionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM CAMION WHERE NRO = ?', [id]);
  return rows[0];
};

const createCamion = async (camion) => {
  const { nro, idTipoCamion } = camion;
  const result = await pool.query('INSERT INTO CAMION (NRO, IDTIPOCAMION) VALUES (?, ?)', [nro, idTipoCamion]);
  return result[0];
};

const updateCamion = async (id, camion) => {
  const { idTipoCamion } = camion;
  const result = await pool.query('UPDATE CAMION SET IDTIPOCAMION = ? WHERE NRO = ?', [idTipoCamion, id]);
  return result[0];
};

const deleteCamion = async (id) => {
  const result = await pool.query('DELETE FROM CAMION WHERE NRO = ?', [id]);
  return result[0];
};

module.exports = {
  getCamiones,
  getCamionById,
  createCamion,
  updateCamion,
  deleteCamion,
};
