import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// 1. Cargar variables de entorno manualmente.
// La CLI de TypeORM se ejecuta fuera del contexto de NestJS.
config();

const port = process.env.POSTGRES_PORT;
if (!port) {
  throw new Error('POSTGRES_PORT is required for migrations');
}

/*
  2. Creamos y exportamos una instancia de DataSource (AppDataSource).
  Esta instancia es la que usará la CLI para conectarse y computar las diferencias
  entre tus entidades (código) y la base de datos real.
*/
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(port),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  // 3. synchronize: false es CRÍTICO para migraciones.
  // No queremos que TypeORM toque la BD automáticamente nunca más.
  synchronize: false,

  // 4. Logging nos ayuda a ver en consola qué queries SQL se ejecutan
  logging: true,

  // 5. Definimos dónde están nuestras entidades.
  // Usamos un patrón glob (**) para que busque en todos los módulos.
  entities: ['src/**/*.entity.ts'],

  // 6. Definimos dónde se guardarán los archivos de migración generados.
  migrations: ['src/database/migrations/*.ts'],

  // Opcional: Nombre de la tabla donde se lleva el historial de migraciones
  migrationsTableName: 'migrations_history',
});
