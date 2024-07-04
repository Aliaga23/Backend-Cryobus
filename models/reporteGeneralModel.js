const { pool } = require('../db');

const getAllNotasEntrega = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ne.NRO AS NotaEntregaNumero,
        ne.FECHARECEPCION,
        ne.HORARECEPCION,
        ne.FECHAENTREGA,
        ne.HORAENTREGA,
        ne.PRECIOESTIMADO,
        clienteEnv.CODIGO AS CodigoClienteEnvia,
        clienteEnv.APELLIDOS AS ClienteEnviaApellidos,
        clienteEnv.NOMBRES AS ClienteEnviaNombres,
        clienteRec.CODIGO AS CodigoClienteRecibe,
        clienteRec.APELLIDOS AS ClienteRecibeApellidos,
        clienteRec.NOMBRES AS ClienteRecibeNombres,
        usuEnv.ID AS UsuarioEnviaID,
        usuEnv.APELLIDOS AS UsuarioEnviaApellidos,
        usuEnv.NOMBRES AS UsuarioEnviaNombres,
        usuRec.ID AS UsuarioRecibeID,
        usuRec.APELLIDOS AS UsuarioRecibeApellidos,
        usuRec.NOMBRES AS UsuarioRecibeNombres,
        te.NOMBRE AS EstadoEntrega,
        re.MOTIVO AS ReembolsoMotivo,
        pa.CODIGO AS PaqueteCodigo,
        dp.NOMBRE AS Departamento,
        lc.NOMBRE AS Localidad,
        dir.DESCRIPCION AS DireccionDescripcion,
        pR.FECHASALIDAESPERADA,
        pR.HORASALIDAESPERADA,
        pR.FECHALLEGADAESPERADA,
        pR.HORALLEGADAESPERADA,
        cond.CODIGO AS ConductorCodigo,
        cond.APELLIDOS AS ConductorApellidos,
        cond.NOMBRES AS ConductorNombres,
        rc.ROL AS RolConductor,
        cam.NRO AS CamionNumero,
        tc.NOMBRE AS TipoCamion,
        nt.FECHALLEGADA AS NotaTrasladoFechaLlegada,
        nt.HORALLEGADA AS NotaTrasladoHoraLlegada,
        nt.FECHASALIDA AS NotaTrasladoFechaSalida,
        nt.HORASALIDA AS NotaTrasladoHoraSalida,
        nt.FECHALLEGADAPAQUETE,
        nt.HORALLEGADAPAQUETE,
        nt.FECHASALIDAPAQUETE,
        nt.HORASALIDAPAQUETE
      FROM 
        NOTAENTREGA ne
      LEFT JOIN 
        CLIENTE clienteEnv ON ne.CODIGOCLIENTEENVIA = clienteEnv.CODIGO
      LEFT JOIN 
        CLIENTE clienteRec ON ne.CODIGOCLIENTERECIBE = clienteRec.CODIGO
      LEFT JOIN 
        USUARIO usuEnv ON ne.IDUSUARIOENVIA = usuEnv.ID
      LEFT JOIN 
        USUARIO usuRec ON ne.IDUSUARIORECIBE = usuRec.ID
      LEFT JOIN 
        ESTADOENTREGA te ON ne.IDESTADOENTREGA = te.ID
      LEFT JOIN 
        REEMBOLSO re ON ne.NROREEMBOLSO = re.NRO
      LEFT JOIN 
        PAQUETE pa ON ne.CODIGOPAQUETE = pa.CODIGO
      LEFT JOIN 
        PLANRUTA pR ON ne.IDPLANDERUTA = pR.ID
      LEFT JOIN 
        DIRECCION dir ON dir.ID = pa.CODIGO
      LEFT JOIN 
        LOCALIDAD lc ON dir.NOMBRELOCALIDAD = lc.NOMBRE AND dir.NOMBREDEPARTAMENTO = lc.NOMBREDEPARTAMENTO
      LEFT JOIN 
        DEPARTAMENTO dp ON lc.NOMBREDEPARTAMENTO = dp.NOMBRE
      LEFT JOIN 
        NOTATRASLADO nt ON ne.NRONOTATRASLADO = nt.NRO
      LEFT JOIN 
        CONDUCTOR cond ON nt.CONDUCTOR = cond.CODIGO
      LEFT JOIN 
        ROLCONDUCTOR rc ON nt.ROLCONDUCTOR = rc.ID
      LEFT JOIN 
        CAMION cam ON nt.CAMION = cam.NRO
      LEFT JOIN 
        TIPOCAMION tc ON cam.IDTIPOCAMION = tc.ID;
    `);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllNotasEntrega,
};
