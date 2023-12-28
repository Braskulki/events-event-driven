// implement ORM
import * as path from 'path';
import { DataSource } from 'typeorm';

export const DatabaseProvider = new DataSource({
  type: 'postgres',
  port: 5432,
  maxQueryExecutionTime: 5000,
  uuidExtension: 'uuid-ossp',

  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  migrationsRun: true,
  ssl: true,

  migrationsTransactionMode: 'none',
  synchronize: false,
  migrations: [`${path.join(__dirname, 'migrations/*{.ts,.js}')}`],
  entities: [`${path.join(__dirname, 'entities/*{.ts,.js}')}`]
});
