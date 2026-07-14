const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  rol: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
