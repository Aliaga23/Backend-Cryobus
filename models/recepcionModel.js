const { pool } = require('../db');

const getRecepciones = async () => {
  const [rows] = await pool.query('SELECT * FROM NOTAENTREGA');
  return rows;
};

const createRecepcion = async (recepcion) => {
  const { codigoClienteEnvia, codigoClienteRecibe, idTipoEnvio, idPlanRuta, costoPrevisto, usuarioAtendiendo, estadoEntrega, fechaRecepcion, horaRecepcion, codigoPaquete } = recepcion;
  const [result] = await pool.query(
    'INSERT INTO NOTAENTREGA (FECHARECEPCION, HORARECEPCION, PRECIOESTIMADO, CODIGOCLIENTEENVIA, CODIGOCLIENTERECIBE, IDTIPOENVIO, IDESTADOENTREGA, IDUSUARIORECIBE, CODIGOPAQUETE, IDPLANDERUTA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [fechaRecepcion, horaRecepcion, costoPrevisto, codigoClienteEnvia, codigoClienteRecibe, idTipoEnvio, estadoEntrega, usuarioAtendiendo, codigoPaquete, idPlanRuta]
  );
  return result;
};

module.exports = {
  getRecepciones,
  createRecepcion
};
