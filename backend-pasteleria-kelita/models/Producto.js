const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  legacyId: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Tortas', 'Regalos', 'Eventos'], required: true },
  price: { type: Number, required: true, min: 1 },
  pricePrefix: { type: String, default: '' },
  image: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0 },
  portions: { type: String, default: 'Por definir' },
  occasions: [{ type: String }],
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
