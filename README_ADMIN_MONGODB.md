# Pastelería Kelita - Evaluación 3 con panel administrador y MongoDB

Este proyecto mantiene el diseño original de Pastelería Kelita y agrega:

- Backend independiente con Node.js + Express.
- Base de datos MongoDB: `pasteleria_kelita`.
- Login de administrador con JWT.
- Contraseña encriptada con bcryptjs.
- CRUD de productos conectado a MongoDB.
- Registro de pedidos desde el formulario web.
- Listado de pedidos, clientes y boletas en el panel.
- WhatsApp real de la pastelería: `+56963732988`.
- Instagram real: `https://www.instagram.com/tortas_kelita`.

## Credenciales de prueba

```text
Usuario: admin
Clave: admin123
```

## 1. Iniciar MongoDB

Abre PowerShell como administrador:

```powershell
Start-Service MongoDB
```

Si necesitas verificar:

```powershell
Get-Service *Mongo*
```

## 2. Ejecutar backend

Desde la carpeta principal del proyecto:

```powershell
cd "D:\Pasteleria_Kelita_AdminPanel_MongoDB\backend-pasteleria-kelita"
npm install
Copy-Item .env.example .env
npm run seed
npm run db:verificar
npm run dev
```

El backend queda en:

```text
http://localhost:3000
```

## 3. Ejecutar la página original

Abre otra terminal PowerShell desde la carpeta principal del proyecto:

```powershell
cd "D:\Pasteleria_Kelita_AdminPanel_MongoDB"
npm install
npm run dev
```

La web se abre normalmente. Si el puerto mostrado por la terminal es `5173`, entra a:

```text
http://localhost:5173
```

Si la terminal muestra otro puerto, usa el que indique.

## 4. Entrar al panel administrador

Desde la web pública, presiona el botón:

```text
Panel administrador
```

O entra al panel desde la misma página. El panel está integrado en el mismo diseño original.

## Base de datos

Conexión usada por el backend:

```text
mongodb://127.0.0.1:27017/pasteleria_kelita
```

Colecciones creadas:

```text
admins
productos
clientes
pedidos
boletas
```

## Endpoints principales

```text
POST   /auth/login
GET    /productos
GET    /productos/:id
POST   /productos
PUT    /productos/:id
DELETE /productos/:id
POST   /pedidos/web
GET    /pedidos
GET    /clientes
GET    /boletas
GET    /dashboard/resumen
```

Las rutas administrativas usan token JWT en el header:

```text
Authorization: Bearer TOKEN
```
