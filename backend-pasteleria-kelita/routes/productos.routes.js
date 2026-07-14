const router = require('express').Router();
const auth = require('../middlewares/auth');
const { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', auth, crearProducto);
router.put('/:id', auth, actualizarProducto);
router.delete('/:id', auth, eliminarProducto);

module.exports = router;
