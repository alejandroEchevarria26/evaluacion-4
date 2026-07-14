const router = require('express').Router();
const auth = require('../middlewares/auth');
const { resumen } = require('../controllers/dashboard.controller');

router.get('/resumen', auth, resumen);

module.exports = router;
