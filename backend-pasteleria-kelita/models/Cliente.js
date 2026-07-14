const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  telefono: { type: String, required: true, trim: true, index: true },
  email: { type: String, default: '' },
  direccion: { type: String, default: '' },
  origen: { type: String, default: 'web' }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
