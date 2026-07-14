require('dotenv').config();
const mongoose = require('mongoose');
const { conectarDB } = require('../data/db');
const Admin = require('../models/Admin');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Boleta = require('../models/Boleta');

async function verificar() {
  await conectarDB();
  console.log('admins:', await Admin.countDocuments());
  console.log('productos:', await Producto.countDocuments());
  console.log('clientes:', await Cliente.countDocuments());
  console.log('pedidos:', await Pedido.countDocuments());
  console.log('boletas:', await Boleta.countDocuments());
  await mongoose.connection.close();
}

verificar().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
