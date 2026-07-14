const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

function mapPedido(pedido) {
  return {
    id: pedido._id,
    nombreCliente: pedido.nombreCliente,
    telefono: pedido.telefono,
    evento: pedido.evento,
    productoId: pedido.productoId,
    productoNombre: pedido.productoNombre,
    cantidad: pedido.cantidad,
    fechaDeseada: pedido.fechaDeseada,
    detalles: pedido.detalles,
    estado: pedido.estado,
    totalEstimado: pedido.totalEstimado,
    origen: pedido.origen,
    createdAt: pedido.createdAt,
    updatedAt: pedido.updatedAt
  };
}

async function listarPedidos(_req, res, next) {
  try {
    const pedidos = await Pedido.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json(pedidos.map(mapPedido));
  } catch (error) { next(error); }
}

async function crearPedidoWeb(req, res, next) {
  try {
    const nombreCliente = String(req.body.name || req.body.nombreCliente || '').trim();
    const telefono = String(req.body.phone || req.body.telefono || '').trim();
    const evento = String(req.body.event || req.body.evento || '').trim();
    const productoNombre = String(req.body.product || req.body.productoNombre || '').trim();
    const cantidad = Number(req.body.quantity || req.body.cantidad);
    const fechaDeseada = String(req.body.date || req.body.fechaDeseada || '').trim();
    const detalles = String(req.body.details || req.body.detalles || '').trim();

    const errores = [];
    if (!nombreCliente) errores.push('El nombre del cliente es obligatorio.');
    if (!telefono) errores.push('El teléfono es obligatorio.');
    if (!evento) errores.push('El evento es obligatorio.');
    if (!productoNombre) errores.push('El producto es obligatorio.');
    if (!Number.isFinite(cantidad) || cantidad <= 0) errores.push('La cantidad debe ser mayor que 0.');
    if (!fechaDeseada) errores.push('La fecha deseada es obligatoria.');
    if (errores.length) return res.status(400).json({ mensaje: 'Datos inválidos.', errores });

    let cliente = await Cliente.findOne({ telefono });
    if (!cliente) cliente = await Cliente.create({ nombre: nombreCliente, telefono, origen: 'web' });

    const producto = await Producto.findOne({ name: productoNombre, activo: true });
    const totalEstimado = producto ? producto.price * cantidad : 0;

    const pedido = await Pedido.create({
      cliente: cliente._id,
      nombreCliente,
      telefono,
      evento,
      productoId: producto?.legacyId,
      productoNombre,
      cantidad,
      fechaDeseada,
      detalles,
      totalEstimado,
      origen: 'web'
    });

    res.status(201).json({ mensaje: 'Pedido registrado correctamente.', pedido: mapPedido(pedido) });
  } catch (error) { next(error); }
}

async function actualizarEstado(req, res, next) {
  try {
    const { estado } = req.body;
    const estados = ['Pendiente', 'Confirmado', 'En preparación', 'Entregado', 'Cancelado'];
    if (!estados.includes(estado)) return res.status(400).json({ mensaje: 'Estado inválido.' });
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
    res.status(200).json(mapPedido(pedido));
  } catch (error) { next(error); }
}

async function eliminarPedido(req, res, next) {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
    res.status(200).json({ mensaje: 'Pedido eliminado correctamente.' });
  } catch (error) { next(error); }
}

module.exports = { listarPedidos, crearPedidoWeb, actualizarEstado, eliminarPedido, mapPedido };
