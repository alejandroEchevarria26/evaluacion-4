const router = require('express').Router();
const { login, perfil } = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/login', login);
router.get('/perfil', auth, perfil);

module.exports = router;
