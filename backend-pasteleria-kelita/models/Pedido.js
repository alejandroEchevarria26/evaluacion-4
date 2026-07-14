const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  nombreCliente: { type: String, required: true, trim: true },
  telefono: { type: String, required: true, trim: true },
  evento: { type: String, required: true },
  productoId: { type: Number },
  productoNombre: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 1 },
  fechaDeseada: { type: String, required: true },
  detalles: { type: String, default: '' },
  estado: { type: String, enum: ['Pendiente', 'Confirmado', 'En preparación', 'Entregado', 'Cancelado'], default: 'Pendiente' },
  totalEstimado: { type: Number, default: 0 },
  origen: { type: String, default: 'web' }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
