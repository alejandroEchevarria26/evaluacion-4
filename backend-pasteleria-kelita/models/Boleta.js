const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
  clienteNombre: { type: String, required: true },
  detalle: [{
    productoNombre: String,
    cantidad: Number,
    precioUnitario: Number,
    subtotal: Number
  }],
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true },
  total: { type: Number, required: true },
  estado: { type: String, enum: ['Emitida', 'Pagada', 'Anulada'], default: 'Emitida' }
}, { timestamps: true });

module.exports = mongoose.model('Boleta', boletaSchema);
