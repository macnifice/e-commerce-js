# E-Commerce JS - Proyecto Full Stack

Este proyecto es una aplicación de comercio electrónico desarrollada con React (frontend) y Node.js (backend), ambos utilizando TypeScript. La aplicación está diseñada siguiendo una arquitectura cliente-servidor con una API RESTful.

## Estructura del Proyecto

El repositorio está organizado en dos directorios principales:

### Frontend (e-commerce-js-frontend)

```
src/
├── assets/         # Recursos estáticos como imágenes
├── components/     # Componentes reutilizables
├── hooks/          # Custom hooks de React
├── models/         # Interfaces y tipos TypeScript
├── pages/          # Componentes de página/rutas
├── redux/          # Estado global con Redux
└── App.tsx         # Componente principal
```

**Tecnologías principales**:

- React 19
- TypeScript
- Redux Toolkit
- Material UI
- Formik y Yup
- Vite
- React Router
- Axios

### Backend (e-commerce-js-backend)

```
src/
├── config/         # Configuración de la aplicación
├── controllers/    # Controladores para manejar las solicitudes
├── interfaces/     # Interfaces y tipos TypeScript
├── middlewares/    # Middleware de Express
├── migrations/     # Migraciones de base de datos (Sequelize)
├── models/         # Modelos de datos
├── routes/         # Definición de rutas API
├── seeders/        # Datos de inicialización
├── services/       # Lógica de negocio
└── utils/          # Utilidades y funciones auxiliares
```

**Tecnologías principales**:

- Node.js
- Express
- TypeScript
- Sequelize (ORM)
- PostgreSQL
- JWT para autenticación
- Swagger para documentación API

## Quick Start

### Requisitos previos

- Node.js (v18 o superior)
- PostgreSQL
- Git

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/macnifice/e-commerce-js.git
cd e-commerce-js
```

2. **Configurar el Backend**

```bash
cd e-commerce-js-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de base de datos:

```
PORT=3002
DB_USER=tu_usuario_de_postgres
DB_PASSWORD=tu_password
DB_NAME=ecommerce
DB_HOST=localhost
JWT_SECRET=tu_clave_secreta
```

3. **Inicializar la base de datos**

```bash
# Crea la bd puedes hacerlo de manera manual o ejecutando este comando
npm run create:db

# Ejecutar migraciones
npm run migrate

# Opcionalmente, puedes cargar datos de prueba con
npm run seed

# Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor backend ahora estará corriendo en `http://localhost:{PORT}`

### Usuarios de prueba

Después de ejecutar los seeders (`npm run seed`), tendrás acceso a los siguientes usuarios:

**Administrador:**

- Existe 1 usuario administrador que puede crear tiendas
- email: admin@admin.com | password: 123qwe123qwe
- Los usuarios administradores solo pueden ser creados directamente en la base de datos

**Tiendas:**

- Hay 3 tiendas preconfiguradas que pueden crear y gestionar productos
- email: tienda@tienda.com | password: 123qwe123qwe
- email: mini@mini.com | password: 123qwe123qwe
- email: super@super.com | password: 123qwe123qwe
- Cada tienda es independiente y solo puede administrar sus propios productos

**Clientes:**

- Para acceder como cliente, es necesario registrarse desde la aplicación

4. **Configurar el Frontend**

```bash
cd ../e-commerce-js-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con la URL del backend:

```
VITE_API_URL=http://localhost:{PORT}/api/v1
```

5. **Iniciar el Frontend**

```bash
npm run dev
```

La aplicación frontend ahora estará disponible en `http://localhost:5173`

## Características

- Autenticación de usuarios mediante JWT
- Gestión de productos con imágenes
- Carrito de compras
- Proceso de checkout
- Panel de administración
- Gestión de órdenes y usuarios
- Interfaz responsive

## API Documentation

La documentación de la API está disponible a través de Swagger en la ruta `/api-docs` del backend cuando el servidor esté corriendo.

> **Nota sobre autenticación:** Por razones de seguridad, el token JWT se almacena en una cookie HTTP-only. Debido a esta implementación, Swagger no podrá acceder automáticamente a esta cookie. Para probar endpoints protegidos en Swagger, necesitarás copiar manualmente el token de autenticación y agregarlo en la sección de autorización.

## Comandos útiles

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run build`: Compila el proyecto TypeScript
- `npm start`: Inicia el servidor en producción
- `npm run create:db`: Crea la base de datos en PostgreSQL
- `npm run migrate`: Ejecuta las migraciones de base de datos
- `npm run down`: Revierte la última migración
- `npm run down:all`: Revierte todas las migraciones
- `npm run seed`: Carga los datos de prueba en la base de datos

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo Vite
- `npm run build`: Compila el proyecto para producción
- `npm run lint`: Ejecuta el linter en el código
- `npm run preview`: Vista previa del build de producción

## Notas Técnicas

- El backend sigue un patrón de arquitectura MVC (Modelo-Vista-Controlador)
- Se utilizan servicios para encapsular la lógica de negocio
- La autenticación se realiza mediante JSON Web Tokens (JWT)
- El frontend implementa Redux para la gestión de estado global
- Se utilizan hooks personalizados para lógica reutilizable
- Material UI proporciona componentes visuales consistentes
