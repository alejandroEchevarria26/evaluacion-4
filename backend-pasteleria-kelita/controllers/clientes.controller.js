const Cliente = require('../models/Cliente');

function mapCliente(cliente) {
  return { id: cliente._id, nombre: cliente.nombre, telefono: cliente.telefono, email: cliente.email, direccion: cliente.direccion, origen: cliente.origen, createdAt: cliente.createdAt };
}

async function listarClientes(_req, res, next) {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json(clientes.map(mapCliente));
  } catch (error) { next(error); }
}

async function crearCliente(req, res, next) {
  try {
    if (!req.body.nombre || !req.body.telefono) return res.status(400).json({ mensaje: 'Nombre y teléfono son obligatorios.' });
    const cliente = await Cliente.create({ nombre: req.body.nombre, telefono: req.body.telefono, email: req.body.email || '', direccion: req.body.direccion || '', origen: 'admin' });
    res.status(201).json(mapCliente(cliente));
  } catch (error) { next(error); }
}

async function eliminarCliente(req, res, next) {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
    res.status(200).json({ mensaje: 'Cliente eliminado correctamente.' });
  } catch (error) { next(error); }
}

module.exports = { listarClientes, crearCliente, eliminarCliente, mapCliente };
