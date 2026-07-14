require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { conectarDB } = require('../data/db');
const productosSeed = require('../data/productos.seed');
const Admin = require('../models/Admin');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Boleta = require('../models/Boleta');

async function seed() {
  await conectarDB();

  await Promise.all([
    Admin.deleteMany({}),
    Producto.deleteMany({}),
    Cliente.deleteMany({}),
    Pedido.deleteMany({}),
    Boleta.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('admin123', 10);
  await Admin.create({ usuario: 'admin', nombre: 'Administrador Kelita', passwordHash, rol: 'admin' });
  await Producto.insertMany(productosSeed.map((p) => ({ ...p, activo: true })));

  const cliente = await Cliente.create({ nombre: 'Cliente de prueba', telefono: '+56963732988', email: 'cliente@ejemplo.cl', direccion: 'Villa Alemana', origen: 'seed' });
  const pedido = await Pedido.create({
    cliente: cliente._id,
    nombreCliente: cliente.nombre,
    telefono: cliente.telefono,
    evento: 'Cumpleaños',
    productoId: 1,
    productoNombre: 'Torta rosa clásica',
    cantidad: 1,
    fechaDeseada: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
    detalles: 'Pedido de prueba para validar el panel administrador.',
    estado: 'Pendiente',
    totalEstimado: 15000,
    origen: 'seed'
  });

  await Boleta.create({
    numero: 1001,
    pedido: pedido._id,
    clienteNombre: cliente.nombre,
    detalle: [{ productoNombre: 'Torta rosa clásica', cantidad: 1, precioUnitario: 15000, subtotal: 15000 }],
    subtotal: 15000,
    iva: 2850,
    total: 17850,
    estado: 'Emitida'
  });

  console.log('Base de datos pasteleria_kelita cargada correctamente.');
  console.log('Admin: usuario admin / clave admin123');
  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
