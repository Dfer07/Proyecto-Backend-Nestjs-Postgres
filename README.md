# My Blog API 🚀

Una API robusta y escalable construida con **NestJS**, diseñada para gestionar un sistema de blogs con soporte para usuarios, perfiles, posts y autenticación segura.

## 🛠️ Tecnologías Usadas

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Documentación**: [Swagger/OpenAPI](https://swagger.io/)
- **Seguridad**: JWT (JSON Web Tokens), Bcrypt, Helmet
- **Validación**: Class-validator, Joi
- **Contenedores**: [Docker](https://www.docker.com/)

## ✨ Características Principales

- **Gestión de Usuarios**: Registro, login y perfiles detallados.
- **Sistema de Posts**: CRUD completo de publicaciones.
- **Autenticación**: Protección de rutas mediante JWT.
- **Documentación Interactiva**: API documentada íntegramente con Swagger.
- **Manejo de Variantes de Entornos**: Configuración flexible mediante `.env`.
- **Base de Datos Relacional**: Relaciones entre usuarios y sus publicaciones.

## 🚀 Cómo Empezar

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v22 o superior recomendado)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- npm o yarn

### 1. Clonar el Proyecto

```bash
git clone https://github.com/Dfer07/Proyecto-Backend-Nestjs-Postgres.git
cd my-blog-api
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env-example .env
```

Asegúrate de configurar los valores de la base de datos y el secreto de JWT (`JWT_SECRET`).

### 3. Levantar con Docker (Recomendado)

El proyecto incluye un archivo `docker-compose.yaml` para levantar PostgreSQL y pgAdmin rápidamente:

```bash
docker-compose up -d
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## 📖 Documentación de la API

Una vez que la aplicación esté corriendo, puedes acceder a la interfaz de Swagger para probar los endpoints:

🔗 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## 🗃️ Migraciones

Para manejar los cambios en el esquema de la base de datos:

```bash
# Generar una migración
npm run migrations:generate -- src/database/migrations/NombreDeLaMigracion

# Ejecutar migraciones
npm run migrations:run

# Revertir última migración
npm run migrations:revert
```

## 🧪 Pruebas

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

Desarrollado por [Dfer07](https://github.com/Dfer07)
