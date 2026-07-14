const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Boleta = require('../models/Boleta');

async function resumen(_req, res, next) {
  try {
    const [productos, clientes, pedidos, boletas] = await Promise.all([
      Producto.find({ activo: true }),
      Cliente.countDocuments(),
      Pedido.find(),
      Boleta.find()
    ]);
    const totalStock = productos.reduce((total, item) => total + item.stock, 0);
    const stockBajo = productos.filter((item) => item.stock <= 3).length;
    const pedidosPendientes = pedidos.filter((item) => item.estado === 'Pendiente').length;
    const ventas = boletas.reduce((total, item) => total + item.total, 0);
    res.status(200).json({ productos: productos.length, clientes, pedidos: pedidos.length, boletas: boletas.length, totalStock, stockBajo, pedidosPendientes, ventas });
  } catch (error) { next(error); }
}

module.exports = { resumen };
