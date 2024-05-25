const { pool } = require('../db');
const io = require('../index'); // Importar el servidor socket.io

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

const logAction = async (accionId, usuarioId, ip, elementoModificado) => {
  try {
    const [result] = await pool.query(`
      INSERT INTO REGISTROACCION (IDACCION, IDUSUARIO, IP, FECHA, HORAACCION, ELEMENTOMODIFICADO)
      VALUES (?, ?, ?, CURDATE(), CURTIME(), ?)`, [accionId, usuarioId, ip, elementoModificado]);

    const [newEntry] = await pool.query(`
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
      WHERE 
        r.NRO = ?`, [result.insertId]);

    io.emit('newLog', newEntry[0]); // Emitir la nueva entrada a través de WebSockets
  } catch (error) {
    console.error('Error al registrar la acción en la bitácora:', error);
  }
};

module.exports = {
  getBitacora,
  logAction,
};
