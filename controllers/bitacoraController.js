const { pool } = require('../db');

const getBitacora = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        r.NRO,
        a.NOMBRE as ACCION,
        r.IDUSUARIO,
        u.NOMBRES as NOMBRE_USUARIO,
        u.APELLIDOS as APELLIDO_USUARIO,
        r.IP,
        r.FECHA,
        r.HORAACCION,
        r.ELEMENTOMODIFICADO
      FROM 
        REGISTROACCION r
      JOIN 
        ACCION a ON r.IDACCION = a.ID
      JOIN 
        USUARIO u ON r.IDUSUARIO = u.ID
      ORDER BY 
        r.FECHA DESC, r.HORAACCION DESC
    `);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener la bitácora:', error);
    res.status(500).json({ error: 'Error al obtener la bitácora' });
  }
};

module.exports = {
  getBitacora
};
