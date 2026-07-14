const router = require('express').Router();
const auth = require('../middlewares/auth');
const { listarPedidos, crearPedidoWeb, actualizarEstado, eliminarPedido } = require('../controllers/pedidos.controller');

router.get('/', auth, listarPedidos);
router.post('/web', crearPedidoWeb);
router.patch('/:id/estado', auth, actualizarEstado);
router.delete('/:id', auth, eliminarPedido);

module.exports = router;
