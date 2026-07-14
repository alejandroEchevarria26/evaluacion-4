use('pasteleria_kelita');

db.admins.drop();
db.productos.drop();
db.clientes.drop();
db.pedidos.drop();
db.boletas.drop();

// Para el login real del backend se recomienda ejecutar `npm run seed`, porque allí la clave queda encriptada con bcryptjs.
db.admins.insertOne({ usuario: 'admin', nombre: 'Administrador Kelita', rol: 'admin', nota: 'Ejecutar npm run seed para crear passwordHash real con bcryptjs.' });

db.productos.insertMany([
  { legacyId: 1, name: 'Torta rosa clásica', category: 'Tortas', price: 15000, image: '/images/birthday-pink.jpeg', description: 'Bizcocho casero con crema suave y terminación floral en tonos rosados.', stock: 4, portions: '18 a 20 personas', occasions: ['Cumpleaños', 'Aniversario'], activo: true },
  { legacyId: 2, name: 'Torta temática fútbol', category: 'Tortas', price: 25000, image: '/images/futboll.jpeg', description: 'Torta de dos pisos, cubierta en crema y decorada con chocolate.', stock: 2, portions: '20 a 25 personas', occasions: ['Cumpleaños', 'Evento deportivo'], activo: true },
  { legacyId: 3, name: 'Torta celeste elegante', category: 'Tortas', price: 18000, image: '/images/torta10.jpeg', description: 'Decoración celeste y blanca con perlas, lazos y terminación delicada.', stock: 3, portions: '15 a 20 personas', occasions: ['Bautizo', 'Baby shower'], activo: true },
  { legacyId: 4, name: 'Torta dos pisos', category: 'Tortas', price: 28000, image: '/images/torta7.jpeg', description: 'Dos niveles de bizcocho artesanal con crema y detalles en lila.', stock: 2, portions: '25 a 30 personas', occasions: ['Celebración', 'Cumpleaños'], activo: true },
  { legacyId: 5, name: 'Torta coral de cumpleaños', category: 'Tortas', price: 18000, image: '/images/torta8.jpeg', description: 'Torta familiar con crema blanca y decoración coral hecha a mano.', stock: 3, portions: '15 a 20 personas', occasions: ['Cumpleaños', 'Familia'], activo: true },
  { legacyId: 6, name: 'Mini torta floral', category: 'Regalos', price: 12000, image: '/images/torta9.jpeg', description: 'Formato pequeño y elegante, terminado con flores y cacao.', stock: 5, portions: '6 a 8 personas', occasions: ['Regalo', 'Aniversario'], activo: true },
  { legacyId: 7, name: 'Ramo de cupcakes', category: 'Regalos', price: 15000, image: '/images/ramokut.jpeg', description: 'Siete cupcakes decorados como flores y presentados en formato ramo.', stock: 4, portions: '7 unidades', occasions: ['Regalo', 'Cumpleaños'], activo: true },
  { legacyId: 8, name: 'Ramo pastel de cupcakes', category: 'Regalos', price: 15000, image: '/images/torta11.jpeg', description: 'Cupcakes florales en tonos pastel con envoltorio rosado.', stock: 4, portions: '7 unidades', occasions: ['Regalo', 'Día especial'], activo: true },
  { legacyId: 9, name: 'Caja de alfajores', category: 'Regalos', price: 8500, image: '/images/alfacaja.jpeg', description: 'Seis alfajores artesanales cubiertos en chocolate y decorados a mano.', stock: 10, portions: '6 unidades', occasions: ['Regalo', 'Empresa'], activo: true },
  { legacyId: 10, name: 'Alfajor individual', category: 'Regalos', price: 1500, image: '/images/torta4.jpeg', description: 'Alfajor relleno de manjar, cubierto en chocolate y sellado individualmente.', stock: 24, portions: '1 unidad', occasions: ['Detalle', 'Colación'], activo: true },
  { legacyId: 11, name: 'Caja surtida familiar', category: 'Regalos', price: 12000, image: '/images/torta5.jpeg', description: 'Selección de alfajores y cuchuflís con cobertura de chocolate.', stock: 8, portions: '12 unidades', occasions: ['Familia', 'Regalo'], activo: true },
  { legacyId: 12, name: 'Caja clásica de seis', category: 'Regalos', price: 8500, image: '/images/torta6.jpeg', description: 'Seis alfajores caseros con decoración blanca y rosada.', stock: 9, portions: '6 unidades', occasions: ['Regalo', 'Cumpleaños'], activo: true },
  { legacyId: 13, name: 'Mesa dulce para matrimonio', category: 'Eventos', price: 2500, pricePrefix: 'Desde', image: '/images/tortamatrimonio.jpeg', description: 'Verrines y torta central preparados a medida para matrimonios y eventos.', stock: 40, portions: 'Pedido personalizado', occasions: ['Matrimonio', 'Evento'], activo: true },
  { legacyId: 14, name: 'Ramo pequeño de cupcakes', category: 'Regalos', price: 12000, image: '/images/torta12.jpeg', description: 'Presentación compacta de cupcakes florales, lista para regalar.', stock: 6, portions: '5 unidades', occasions: ['Detalle', 'Agradecimiento'], activo: true }
]);

db.clientes.insertOne({ nombre: 'Cliente de prueba', telefono: '+56963732988', email: 'cliente@ejemplo.cl', direccion: 'Villa Alemana', origen: 'seed', createdAt: new Date() });
db.pedidos.insertOne({ nombreCliente: 'Cliente de prueba', telefono: '+56963732988', evento: 'Cumpleaños', productoId: 1, productoNombre: 'Torta rosa clásica', cantidad: 1, fechaDeseada: '2026-07-20', detalles: 'Pedido de prueba para validar el panel.', estado: 'Pendiente', totalEstimado: 15000, origen: 'seed', createdAt: new Date() });
db.boletas.insertOne({ numero: 1001, clienteNombre: 'Cliente de prueba', detalle: [{ productoNombre: 'Torta rosa clásica', cantidad: 1, precioUnitario: 15000, subtotal: 15000 }], subtotal: 15000, iva: 2850, total: 17850, estado: 'Emitida', createdAt: new Date() });

print('BD pasteleria_kelita creada. Para login funcional usa npm run seed en el backend.');
