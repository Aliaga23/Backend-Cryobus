require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const { Server } = require('socket.io');

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
const bitacoraRoutes = require('./routes/bitacoraRoute'); // Nueva ruta

const cors = require('cors');
const { pool } = require('./db');

const app = express();
const http = require('http');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://proyecto-production-ccb8.up.railway.app'],
    methods: ['GET', 'POST'],
  },
});

const allowedOrigins = [
  'http://localhost:3000', // Permitir solicitudes desde localhost
  'https://proyecto-production-ccb8.up.railway.app' // Permitir solicitudes desde el frontend desplegado en Railway
];

app.use(cors({
  origin: allowedOrigins, // Permitir solicitudes desde estos orígenes
}));

app.use(express.json());

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
app.use('/api/bitacora', bitacoraRoutes); // Nueva ruta

app.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM PERMISO WHERE ID=5');
    res.json(result);
  } catch (error) {
    console.error('Error in /ping route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(PORT, () => { // Cambiado de app.listen a server.listen
  console.log(`Server running on port ${PORT}`);
});

module.exports = io;
