const Producto = require('../models/Producto');

function mapProducto(producto) {
  return {
    id: producto.legacyId,
    mongoId: producto._id,
    name: producto.name,
    category: producto.category,
    price: producto.price,
    pricePrefix: producto.pricePrefix || undefined,
    image: producto.image,
    description: producto.description,
    stock: producto.stock,
    portions: producto.portions,
    occasions: producto.occasions || [],
    activo: producto.activo,
    createdAt: producto.createdAt,
    updatedAt: producto.updatedAt
  };
}

function validarProducto(body) {
  const errores = [];
  if (!body.name || !String(body.name).trim()) errores.push('El nombre es obligatorio.');
  if (!body.category || !String(body.category).trim()) errores.push('La categoría es obligatoria.');
  if (!['Tortas', 'Regalos', 'Eventos'].includes(body.category)) errores.push('La categoría debe ser Tortas, Regalos o Eventos.');
  if (!Number.isFinite(Number(body.price)) || Number(body.price) <= 0) errores.push('El precio debe ser mayor que 0.');
  if (!Number.isInteger(Number(body.stock)) || Number(body.stock) < 0) errores.push('El stock debe ser un entero mayor o igual a 0.');
  if (!body.description || !String(body.description).trim()) errores.push('La descripción es obligatoria.');
  return errores;
}

async function obtenerProductos(_req, res, next) {
  try {
    const productos = await Producto.find({ activo: true }).sort({ legacyId: 1 });
    res.status(200).json(productos.map(mapProducto));
  } catch (error) { next(error); }
}

async function obtenerProductoPorId(req, res, next) {
  try {
    const filtro = Number.isFinite(Number(req.params.id)) ? { legacyId: Number(req.params.id) } : { _id: req.params.id };
    const producto = await Producto.findOne({ ...filtro, activo: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    res.status(200).json(mapProducto(producto));
  } catch (error) { next(error); }
}

async function crearProducto(req, res, next) {
  try {
    const errores = validarProducto(req.body);
    if (errores.length) return res.status(400).json({ mensaje: 'Datos inválidos.', errores });

    const ultimo = await Producto.findOne().sort({ legacyId: -1 });
    const legacyId = ultimo ? ultimo.legacyId + 1 : 1;
    const producto = await Producto.create({
      legacyId,
      name: String(req.body.name).trim(),
      category: req.body.category,
      price: Number(req.body.price),
      pricePrefix: req.body.pricePrefix || '',
      image: req.body.image || '/images/birthday-pink.jpeg',
      description: String(req.body.description).trim(),
      stock: Number(req.body.stock),
      portions: req.body.portions || 'Por definir',
      occasions: Array.isArray(req.body.occasions) ? req.body.occasions : ['Pedido especial'],
      activo: true
    });
    res.status(201).json(mapProducto(producto));
  } catch (error) { next(error); }
}

async function actualizarProducto(req, res, next) {
  try {
    const errores = validarProducto(req.body);
    if (errores.length) return res.status(400).json({ mensaje: 'Datos inválidos.', errores });

    const filtro = Number.isFinite(Number(req.params.id)) ? { legacyId: Number(req.params.id) } : { _id: req.params.id };
    const producto = await Producto.findOneAndUpdate(
      filtro,
      {
        name: String(req.body.name).trim(),
        category: req.body.category,
        price: Number(req.body.price),
        pricePrefix: req.body.pricePrefix || '',
        image: req.body.image || '/images/birthday-pink.jpeg',
        description: String(req.body.description).trim(),
        stock: Number(req.body.stock),
        portions: req.body.portions || 'Por definir',
        occasions: Array.isArray(req.body.occasions) ? req.body.occasions : ['Pedido especial']
      },
      { new: true, runValidators: true }
    );
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    res.status(200).json(mapProducto(producto));
  } catch (error) { next(error); }
}

async function eliminarProducto(req, res, next) {
  try {
    const filtro = Number.isFinite(Number(req.params.id)) ? { legacyId: Number(req.params.id) } : { _id: req.params.id };
    const producto = await Producto.findOneAndUpdate(filtro, { activo: false }, { new: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' });
    res.status(200).json({ mensaje: 'Producto eliminado correctamente.', producto: mapProducto(producto) });
  } catch (error) { next(error); }
}

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto, mapProducto };
