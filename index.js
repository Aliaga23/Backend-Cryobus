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

const bitacoraRoutes = require('./routes/bitacoraRoutes');

const { setIO } = require('./controllers/socketController'); // Nuevo controlador para configurar io

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
