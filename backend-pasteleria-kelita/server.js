require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./data/db');
const logger = require('./middlewares/logger');

const authRoutes = require('./routes/auth.routes');
const productosRoutes = require('./routes/productos.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const boletasRoutes = require('./routes/boletas.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'], credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(logger);

app.get('/', (_req, res) => {
  res.status(200).json({ mensaje: 'API Pastelería Kelita funcionando', baseDatos: 'pasteleria_kelita' });
});

app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/catalogo', productosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/boletas', boletasRoutes);
app.use('/dashboard', dashboardRoutes);

app.use((_req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor Pastelería Kelita corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo iniciar el servidor:', error.message);
  process.exit(1);
});
