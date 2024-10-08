require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { pool } = require('./db');
const { PORT } = require('./config');

// Importar rutas y controladores
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const loginRouter = require('./routes/loginRouter');
const permisoRolRoutes = require('./routes/permisoRolRoutes');
const permisoRoutes = require('./routes/permisoRoutes');
const tipoEnvioRoutes = require('./routes/tipoEnvioRoutes');
const rolConductorRoutes = require('./routes/rolConductorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const itemRoutes = require('./routes/itemRoutes');
const paqueteRoutes = require('./routes/paqueteRoutes');
const notaEntregaRoutes = require('./routes/notaEntregaRoutes');
const recepcionRoutes = require('./routes/recepcionRouter');
const estadoEntregaRoutes = require('./routes/estadoEntregaRoutes');
const camionRoutes = require('./routes/camionRoutes');
const tipoCamionRoutes = require('./routes/tipoCamionRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');
const localidadRoutes = require('./routes/localidadRoutes');
const notaTrasladoRoutes = require('./routes/notaTrasladoRoutes');
const planRutaRoutes = require('./routes/planRutaRoutes');
const tipoPaqueteRoutes = require('./routes/tipoPaqueteRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const direccionRoutes = require('./routes/direccionRouter');
const conductorRoutes = require('./routes/conductorRoutes');
const detalleConductorRoutes = require('./routes/detalleConductorRoutes');
const { setIO } = require('./controllers/socketController'); // Nuevo controlador para configurar io
const reembolsoRoutes = require('./routes/reembolsoRoutes');
const celularClienteRoutes =require('./routes/celularClienteRoutes');
const entregaRoutes  =require('./routes/entregaRoutes');
const reporteEntregaRoutes = require('./routes/reporteEntregaRoutes');
const reporteTrasladoRoutes =require('./routes/reporteTrasladoRoutes');
const registrarSalidaRoutes =require('./routes/registrarSalidaRoutes')
const registrarLlegadaRoutes =require('./routes/registrarLlegadaRoutes')
const reporteGeneralRoutes = require('./routes/reporteGeneralRoutes');
const app = express();
const server = http.createServer(app);

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://cryobus.up.railway.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Configuración de rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', loginRouter);
app.use('/api/permisoRol', permisoRolRoutes);
app.use('/api/permisos', permisoRoutes);
app.use('/api/tipoEnvio', tipoEnvioRoutes);
app.use('/api/rolConductor', rolConductorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/paquetes', paqueteRoutes);
app.use('/api/notasEntrega', notaEntregaRoutes);
app.use('/api/recepciones', recepcionRoutes);
app.use('/api/estadosEntrega', estadoEntregaRoutes);
app.use('/api/tiposCamion', tipoCamionRoutes);
app.use('/api/camiones', camionRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/bitacora', bitacoraRoutes);
app.use('/api/localidades', localidadRoutes);
app.use('/api/notasTraslado', notaTrasladoRoutes);
app.use('/api/planRuta', planRutaRoutes);
app.use('/api/tipoPaquete', tipoPaqueteRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/direcciones', direccionRoutes); // Ruta nueva
app.use('/api/conductores', conductorRoutes);
app.use('/api/detalleconductor', detalleConductorRoutes);

app.use('/api/reembolsos', reembolsoRoutes);

app.use('/api/celulares', celularClienteRoutes);

app.use('/api/entregas', entregaRoutes);

app.use('/api/notas-entrega', reporteEntregaRoutes);
app.use('/api/notas-traslado', reporteTrasladoRoutes);
app.use('/api/registrarsalida',registrarSalidaRoutes);
app.use('/api/registrarllegada',registrarLlegadaRoutes);
app.use('/api/reporte_general',reporteGeneralRoutes);

// Ruta de prueba
app.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM PERMISO WHERE ID=5');
    res.json(result);
  } catch (error) {
    console.error('Error in /ping route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Configuración de Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// Pasar io a los controladores
setIO(io);

io.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  socket.on('error', (error) => {
    console.error(`Error en el socket ${socket.id}:`, error);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Cliente desconectado: ${socket.id}, razón: ${reason}`);
  });
});

// Iniciando el servidor
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
