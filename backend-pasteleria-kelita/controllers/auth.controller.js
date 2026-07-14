const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

async function login(req, res, next) {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios.' });

    const admin = await Admin.findOne({ usuario: String(usuario).trim() });
    if (!admin) return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });

    const valido = await bcrypt.compare(password, admin.passwordHash);
    if (!valido) return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });

    const token = jwt.sign(
      { id: admin._id, usuario: admin.usuario, rol: admin.rol },
      process.env.JWT_SECRET || 'kelita_admin_secret_2026',
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.status(200).json({ token, admin: { usuario: admin.usuario, nombre: admin.nombre, rol: admin.rol } });
  } catch (error) { next(error); }
}

async function perfil(req, res) {
  res.status(200).json({ admin: req.admin });
}

module.exports = { login, perfil };
