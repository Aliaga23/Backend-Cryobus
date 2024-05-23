// index.js
const express = require('express');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const loginRouter = require('./routes/loginRoutes');
const permisoRolRoutes = require('./routes/permisoRolRoutes');
const permisoRoutes = require('./routes/permisoRoutes');
const tipoEnvioRoutes = require('./routes/tipoEnvioRoutes');
const rolConductorRoutes = require('./routes/rolConductorRoutes');

const cors = require('cors');
const { pool } = require('./db');

const app = express();

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

app.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM PERMISO WHERE ID=5');
    res.json(result);
  } catch (error) {
    console.error('Error in /ping route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
