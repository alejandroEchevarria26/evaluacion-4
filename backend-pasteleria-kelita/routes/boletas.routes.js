const router = require('express').Router();
const auth = require('../middlewares/auth');
const { listarBoletas, crearBoleta } = require('../controllers/boletas.controller');

router.get('/', auth, listarBoletas);
router.post('/', auth, crearBoleta);

module.exports = router;
