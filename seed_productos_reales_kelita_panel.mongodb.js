// seed_productos_reales_kelita_panel.mongodb.js
// Carga productos reales de la web Tortas Kelita en MongoDB para que aparezcan en el panel administrador.
// Uso PowerShell:
// mongosh --file .\seed_productos_reales_kelita_panel.mongodb.js
// Si mongosh no está en PATH:
// & "C:\Program Files\MongoDB\mongosh\bin\mongosh.exe" --file ".\seed_productos_reales_kelita_panel.mongodb.js"

use('pasteleria_kelita');

const ahora = new Date();

// Deja true si quieres que el panel muestre exactamente los 14 productos reales.
// Si lo pones false, el script solo actualiza/agrega estos productos sin borrar otros.
const RESETEAR_PRODUCTOS = true;

const productosKelita = [
  {
    legacyId: 1,
    id: 1,
    sku: 'KEL-TOR-001',
    name: 'Torta rosa clásica',
    nombre: 'Torta rosa clásica',
    category: 'Tortas',
    categoria: 'Tortas',
    price: 15000,
    precio: 15000,
    pricePrefix: '',
    image: '/images/birthday-pink.jpeg',
    imagen: '/images/birthday-pink.jpeg',
    description: 'Bizcocho casero con crema suave y terminación floral en tonos rosados.',
    descripcion: 'Bizcocho casero con crema suave y terminación floral en tonos rosados.',
    stock: 4,
    portions: '18 a 20 personas',
    porciones: '18 a 20 personas',
    occasions: ['Cumpleaños', 'Aniversario'],
    ocasiones: ['Cumpleaños', 'Aniversario'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 2,
    id: 2,
    sku: 'KEL-TOR-002',
    name: 'Torta temática fútbol',
    nombre: 'Torta temática fútbol',
    category: 'Tortas',
    categoria: 'Tortas',
    price: 25000,
    precio: 25000,
    pricePrefix: '',
    image: '/images/futboll.jpeg',
    imagen: '/images/futboll.jpeg',
    description: 'Torta de dos pisos, cubierta en crema y decorada con chocolate.',
    descripcion: 'Torta de dos pisos, cubierta en crema y decorada con chocolate.',
    stock: 2,
    portions: '20 a 25 personas',
    porciones: '20 a 25 personas',
    occasions: ['Cumpleaños', 'Evento deportivo'],
    ocasiones: ['Cumpleaños', 'Evento deportivo'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 3,
    id: 3,
    sku: 'KEL-TOR-003',
    name: 'Torta celeste elegante',
    nombre: 'Torta celeste elegante',
    category: 'Tortas',
    categoria: 'Tortas',
    price: 18000,
    precio: 18000,
    pricePrefix: '',
    image: '/images/torta10.jpeg',
    imagen: '/images/torta10.jpeg',
    description: 'Decoración celeste y blanca con perlas, lazos y terminación delicada.',
    descripcion: 'Decoración celeste y blanca con perlas, lazos y terminación delicada.',
    stock: 3,
    portions: '15 a 20 personas',
    porciones: '15 a 20 personas',
    occasions: ['Bautizo', 'Baby shower'],
    ocasiones: ['Bautizo', 'Baby shower'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 4,
    id: 4,
    sku: 'KEL-TOR-004',
    name: 'Torta dos pisos',
    nombre: 'Torta dos pisos',
    category: 'Tortas',
    categoria: 'Tortas',
    price: 28000,
    precio: 28000,
    pricePrefix: '',
    image: '/images/torta7.jpeg',
    imagen: '/images/torta7.jpeg',
    description: 'Dos niveles de bizcocho artesanal con crema y detalles en lila.',
    descripcion: 'Dos niveles de bizcocho artesanal con crema y detalles en lila.',
    stock: 2,
    portions: '25 a 30 personas',
    porciones: '25 a 30 personas',
    occasions: ['Celebración', 'Cumpleaños'],
    ocasiones: ['Celebración', 'Cumpleaños'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 5,
    id: 5,
    sku: 'KEL-TOR-005',
    name: 'Torta coral de cumpleaños',
    nombre: 'Torta coral de cumpleaños',
    category: 'Tortas',
    categoria: 'Tortas',
    price: 18000,
    precio: 18000,
    pricePrefix: '',
    image: '/images/torta8.jpeg',
    imagen: '/images/torta8.jpeg',
    description: 'Torta familiar con crema blanca y decoración coral hecha a mano.',
    descripcion: 'Torta familiar con crema blanca y decoración coral hecha a mano.',
    stock: 3,
    portions: '15 a 20 personas',
    porciones: '15 a 20 personas',
    occasions: ['Cumpleaños', 'Familia'],
    ocasiones: ['Cumpleaños', 'Familia'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 6,
    id: 6,
    sku: 'KEL-REG-001',
    name: 'Mini torta floral',
    nombre: 'Mini torta floral',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 12000,
    precio: 12000,
    pricePrefix: '',
    image: '/images/torta9.jpeg',
    imagen: '/images/torta9.jpeg',
    description: 'Formato pequeño y elegante, terminado con flores y cacao.',
    descripcion: 'Formato pequeño y elegante, terminado con flores y cacao.',
    stock: 5,
    portions: '6 a 8 personas',
    porciones: '6 a 8 personas',
    occasions: ['Regalo', 'Aniversario'],
    ocasiones: ['Regalo', 'Aniversario'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 7,
    id: 7,
    sku: 'KEL-REG-002',
    name: 'Ramo de cupcakes',
    nombre: 'Ramo de cupcakes',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 15000,
    precio: 15000,
    pricePrefix: '',
    image: '/images/ramokut.jpeg',
    imagen: '/images/ramokut.jpeg',
    description: 'Siete cupcakes decorados como flores y presentados en formato ramo.',
    descripcion: 'Siete cupcakes decorados como flores y presentados en formato ramo.',
    stock: 4,
    portions: '7 unidades',
    porciones: '7 unidades',
    occasions: ['Regalo', 'Cumpleaños'],
    ocasiones: ['Regalo', 'Cumpleaños'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 8,
    id: 8,
    sku: 'KEL-REG-003',
    name: 'Ramo pastel de cupcakes',
    nombre: 'Ramo pastel de cupcakes',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 15000,
    precio: 15000,
    pricePrefix: '',
    image: '/images/torta11.jpeg',
    imagen: '/images/torta11.jpeg',
    description: 'Cupcakes florales en tonos pastel con envoltorio rosado.',
    descripcion: 'Cupcakes florales en tonos pastel con envoltorio rosado.',
    stock: 4,
    portions: '7 unidades',
    porciones: '7 unidades',
    occasions: ['Regalo', 'Día especial'],
    ocasiones: ['Regalo', 'Día especial'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 9,
    id: 9,
    sku: 'KEL-REG-004',
    name: 'Caja de alfajores',
    nombre: 'Caja de alfajores',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 8500,
    precio: 8500,
    pricePrefix: '',
    image: '/images/alfacaja.jpeg',
    imagen: '/images/alfacaja.jpeg',
    description: 'Seis alfajores artesanales cubiertos en chocolate y decorados a mano.',
    descripcion: 'Seis alfajores artesanales cubiertos en chocolate y decorados a mano.',
    stock: 10,
    portions: '6 unidades',
    porciones: '6 unidades',
    occasions: ['Regalo', 'Empresa'],
    ocasiones: ['Regalo', 'Empresa'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 10,
    id: 10,
    sku: 'KEL-REG-005',
    name: 'Alfajor individual',
    nombre: 'Alfajor individual',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 1500,
    precio: 1500,
    pricePrefix: '',
    image: '/images/torta4.jpeg',
    imagen: '/images/torta4.jpeg',
    description: 'Alfajor relleno de manjar, cubierto en chocolate y sellado individualmente.',
    descripcion: 'Alfajor relleno de manjar, cubierto en chocolate y sellado individualmente.',
    stock: 24,
    portions: '1 unidad',
    porciones: '1 unidad',
    occasions: ['Detalle', 'Colación'],
    ocasiones: ['Detalle', 'Colación'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 11,
    id: 11,
    sku: 'KEL-REG-006',
    name: 'Caja surtida familiar',
    nombre: 'Caja surtida familiar',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 12000,
    precio: 12000,
    pricePrefix: '',
    image: '/images/torta5.jpeg',
    imagen: '/images/torta5.jpeg',
    description: 'Selección de alfajores y cuchuflís con cobertura de chocolate.',
    descripcion: 'Selección de alfajores y cuchuflís con cobertura de chocolate.',
    stock: 8,
    portions: '12 unidades',
    porciones: '12 unidades',
    occasions: ['Familia', 'Regalo'],
    ocasiones: ['Familia', 'Regalo'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 12,
    id: 12,
    sku: 'KEL-REG-007',
    name: 'Caja clásica de seis',
    nombre: 'Caja clásica de seis',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 8500,
    precio: 8500,
    pricePrefix: '',
    image: '/images/torta6.jpeg',
    imagen: '/images/torta6.jpeg',
    description: 'Seis alfajores caseros con decoración blanca y rosada.',
    descripcion: 'Seis alfajores caseros con decoración blanca y rosada.',
    stock: 9,
    portions: '6 unidades',
    porciones: '6 unidades',
    occasions: ['Regalo', 'Cumpleaños'],
    ocasiones: ['Regalo', 'Cumpleaños'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 13,
    id: 13,
    sku: 'KEL-EVE-001',
    name: 'Mesa dulce para matrimonio',
    nombre: 'Mesa dulce para matrimonio',
    category: 'Eventos',
    categoria: 'Eventos',
    price: 2500,
    precio: 2500,
    pricePrefix: 'Desde',
    image: '/images/tortamatrimonio.jpeg',
    imagen: '/images/tortamatrimonio.jpeg',
    description: 'Verrines y torta central preparados a medida para matrimonios y eventos.',
    descripcion: 'Verrines y torta central preparados a medida para matrimonios y eventos.',
    stock: 40,
    portions: 'Pedido personalizado',
    porciones: 'Pedido personalizado',
    occasions: ['Matrimonio', 'Evento'],
    ocasiones: ['Matrimonio', 'Evento'],
    activo: true,
    destacado: true,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  },
  {
    legacyId: 14,
    id: 14,
    sku: 'KEL-REG-008',
    name: 'Ramo pequeño de cupcakes',
    nombre: 'Ramo pequeño de cupcakes',
    category: 'Regalos',
    categoria: 'Regalos',
    price: 12000,
    precio: 12000,
    pricePrefix: '',
    image: '/images/torta12.jpeg',
    imagen: '/images/torta12.jpeg',
    description: 'Presentación compacta de cupcakes florales, lista para regalar.',
    descripcion: 'Presentación compacta de cupcakes florales, lista para regalar.',
    stock: 6,
    portions: '5 unidades',
    porciones: '5 unidades',
    occasions: ['Detalle', 'Agradecimiento'],
    ocasiones: ['Detalle', 'Agradecimiento'],
    activo: true,
    destacado: false,
    origen: 'web_original_kelita',
    createdAt: ahora,
    updatedAt: ahora
  }
];

if (RESETEAR_PRODUCTOS) {
  db.productos.deleteMany({});
  db.products.deleteMany({});
}

for (const producto of productosKelita) {
  // Evita conflicto MongoDB: no se puede usar createdAt en $set y $setOnInsert al mismo tiempo.
  const productoActualizable = { ...producto };
  delete productoActualizable.createdAt;

  db.productos.updateOne(
    { legacyId: producto.legacyId },
    { $set: { ...productoActualizable, updatedAt: ahora }, $setOnInsert: { createdAt: ahora } },
    { upsert: true }
  );

  // Colección extra por compatibilidad, por si algún código viejo consulta "products".
  db.products.updateOne(
    { legacyId: producto.legacyId },
    { $set: { ...productoActualizable, updatedAt: ahora }, $setOnInsert: { createdAt: ahora } },
    { upsert: true }
  );
}

// Admin compatible con el login del backend. Clave: admin123
// Hash bcrypt generado para admin123.
db.admins.updateOne(
  { usuario: 'admin' },
  {
    $set: {
      usuario: 'admin',
      nombre: 'Administrador Kelita',
      rol: 'admin',
      activo: true,
      passwordHash: '$2a$10$iIHqc2Ojp4Z.KY3V5ekrnOalmUjtLL2M6ia6g5xYl5eDVUuJIK8Me',
      updatedAt: ahora
    },
    $setOnInsert: { createdAt: ahora }
  },
  { upsert: true }
);

// Datos de prueba para que el panel no aparezca vacío en pedidos, clientes y boletas.
const cliente = {
  nombre: 'Cliente de prueba Kelita',
  telefono: '+56963732988',
  email: 'cliente.kelita@ejemplo.cl',
  direccion: 'Villa Alemana, Región de Valparaíso',
  origen: 'script_productos_reales',
  createdAt: ahora,
  updatedAt: ahora
};

let clienteId;
const clienteExistente = db.clientes.findOne({ telefono: cliente.telefono, origen: 'script_productos_reales' });
if (clienteExistente) {
  clienteId = clienteExistente._id;
  db.clientes.updateOne({ _id: clienteId }, { $set: cliente });
} else {
  clienteId = db.clientes.insertOne(cliente).insertedId;
}

const pedido = {
  cliente: clienteId,
  nombreCliente: cliente.nombre,
  telefono: cliente.telefono,
  evento: 'Cumpleaños',
  productoId: 1,
  productoNombre: 'Torta rosa clásica',
  cantidad: 1,
  fechaDeseada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  detalles: 'Pedido de prueba para validar productos reales en el panel administrador.',
  estado: 'Pendiente',
  totalEstimado: 15000,
  origen: 'script_productos_reales',
  createdAt: ahora,
  updatedAt: ahora
};

let pedidoId;
const pedidoExistente = db.pedidos.findOne({ origen: 'script_productos_reales', productoId: 1 });
if (pedidoExistente) {
  pedidoId = pedidoExistente._id;
  db.pedidos.updateOne({ _id: pedidoId }, { $set: pedido });
} else {
  pedidoId = db.pedidos.insertOne(pedido).insertedId;
}

db.boletas.updateOne(
  { numero: 1001 },
  {
    $set: {
      numero: 1001,
      pedido: pedidoId,
      clienteNombre: cliente.nombre,
      detalle: [
        { productoNombre: 'Torta rosa clásica', cantidad: 1, precioUnitario: 15000, subtotal: 15000 }
      ],
      subtotal: 15000,
      iva: 2850,
      total: 17850,
      estado: 'Emitida',
      origen: 'script_productos_reales',
      updatedAt: ahora
    },
    $setOnInsert: { createdAt: ahora }
  },
  { upsert: true }
);

// Índices útiles.
db.productos.createIndex({ legacyId: 1 }, { unique: true });
db.productos.createIndex({ category: 1 });
db.productos.createIndex({ name: 'text', description: 'text', category: 'text' });
db.products.createIndex({ legacyId: 1 }, { unique: true });

const totalProductos = db.productos.countDocuments({ activo: true });
const stockTotal = db.productos.aggregate([
  { $match: { activo: true } },
  { $group: { _id: null, total: { $sum: '$stock' } } }
]).toArray()[0]?.total || 0;
const stockBajo = db.productos.countDocuments({ activo: true, stock: { $lte: 3 } });
const categorias = db.productos.distinct('category', { activo: true }).length;

print('==============================================');
print('Productos reales cargados para el panel Kelita');
print('BD: pasteleria_kelita');
print('Productos registrados: ' + totalProductos);
print('Stock total: ' + stockTotal);
print('Stock bajo: ' + stockBajo);
print('Categorías: ' + categorias);
print('Admin: admin / admin123');
print('WhatsApp: +56963732988');
print('Instagram: https://www.instagram.com/tortas_kelita');
print('==============================================');
