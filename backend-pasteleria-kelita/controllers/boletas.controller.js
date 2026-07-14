const Boleta = require('../models/Boleta');
const Pedido = require('../models/Pedido');

function mapBoleta(boleta) {
  return { id: boleta._id, numero: boleta.numero, clienteNombre: boleta.clienteNombre, detalle: boleta.detalle, subtotal: boleta.subtotal, iva: boleta.iva, total: boleta.total, estado: boleta.estado, createdAt: boleta.createdAt };
}

async function listarBoletas(_req, res, next) {
  try {
    const boletas = await Boleta.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json(boletas.map(mapBoleta));
  } catch (error) { next(error); }
}

async function crearBoleta(req, res, next) {
  try {
    const pedido = req.body.pedidoId ? await Pedido.findById(req.body.pedidoId) : null;
    const ultimo = await Boleta.findOne().sort({ numero: -1 });
    const numero = ultimo ? ultimo.numero + 1 : 1001;
    const detalle = req.body.detalle || [{ productoNombre: pedido?.productoNombre || 'Pedido personalizado', cantidad: pedido?.cantidad || 1, precioUnitario: pedido?.totalEstimado || 0, subtotal: pedido?.totalEstimado || 0 }];
    const subtotal = detalle.reduce((total, item) => total + Number(item.subtotal || 0), 0);
    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;
    const boleta = await Boleta.create({ numero, pedido: pedido?._id, clienteNombre: req.body.clienteNombre || pedido?.nombreCliente || 'Cliente', detalle, subtotal, iva, total });
    res.status(201).json(mapBoleta(boleta));
  } catch (error) { next(error); }
}

module.exports = { listarBoletas, crearBoleta, mapBoleta };
