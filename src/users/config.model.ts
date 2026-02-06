export interface Config {
  PORT: number;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: number;
  DATABASE_URL: string;
  PGADMIN_EMAIL: string;
  PGADMIN_PASSWORD: string;
  PGADMIN_PORT: number;
  JWT_SECRET: string;
  PERPLEXITY_API_KEY: string;
}
