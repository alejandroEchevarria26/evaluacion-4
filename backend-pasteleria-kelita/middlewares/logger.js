module.exports = function logger(req, _res, next) {
  const fecha = new Date().toLocaleString('es-CL', { hour12: false });
  console.log(`${req.method} ${req.originalUrl} - ${fecha}`);
  next();
};
