const { pool } = require('../db');

const getCamiones = async () => {
  try {
    const [rows] = await pool.query('SELECT C.NRO, C.IDTIPOCAMION, T.NOMBRE AS TIPO_CAMION FROM CAMION C JOIN TIPOCAMION T ON C.IDTIPOCAMION = T.ID');
    return rows;
  } catch (error) {
    console.error('Error al obtener camiones:', error);
    throw error;
  }
};

const getCamionById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT C.NRO, C.IDTIPOCAMION, T.NOMBRE AS TIPO_CAMION FROM CAMION C JOIN TIPOCAMION T ON C.IDTIPOCAMION = T.ID WHERE C.NRO = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error al obtener camión:', error);
    throw error;
  }
};

const createCamion = async (camion) => {
  const { nro, idTipoCamion } = camion;
  try {
    const result = await pool.query('INSERT INTO CAMION (NRO, IDTIPOCAMION) VALUES (?, ?)', [nro, idTipoCamion]);
    return result[0];
  } catch (error) {
    console.error('Error al crear camión:', error);
    throw error;
  }
};

const updateCamion = async (id, camion) => {
  const { idTipoCamion } = camion;
  try {
    const result = await pool.query('UPDATE CAMION SET IDTIPOCAMION = ? WHERE NRO = ?', [idTipoCamion, id]);
    return result[0];
  } catch (error) {
    console.error('Error al actualizar camión:', error);
    throw error;
  }
};

const deleteCamion = async (id) => {
  try {
    const result = await pool.query('DELETE FROM CAMION WHERE NRO = ?', [id]);
    return result[0];
  } catch (error) {
    console.error('Error al eliminar camión:', error);
    throw error;
  }
};

const getTiposCamion = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM TIPOCAMION');
    return rows;
  } catch (error) {
    console.error('Error al obtener tipos de camión:', error);
    throw error;
  }
};

module.exports = {
  getCamiones,
  getCamionById,
  createCamion,
  updateCamion,
  deleteCamion,
  getTiposCamion,
};
