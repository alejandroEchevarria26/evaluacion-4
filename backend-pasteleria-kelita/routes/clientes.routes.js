const router = require('express').Router();
const auth = require('../middlewares/auth');
const { listarClientes, crearCliente, eliminarCliente } = require('../controllers/clientes.controller');

router.get('/', auth, listarClientes);
router.post('/', auth, crearCliente);
router.delete('/:id', auth, eliminarCliente);

module.exports = router;
