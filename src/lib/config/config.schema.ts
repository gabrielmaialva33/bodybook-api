import { z } from 'zod';

const AppConfigSchema = z.object({
  APP_NAME: z.string(),
  APP_HOST: z.string().default('0.0.0.0'),
  APP_PORT: z.coerce.number().default(5000),
});

const DatabaseConfigSchema = z.object({
  PG_URL: z.string().optional(),
  PG_HOST: z.string().default('localhost'),
  PG_PORT: z.coerce.number().default(5432),
  PG_USER: z.string().default('postgres'),
  PG_PASSWORD: z.string().default('postgres'),
  PG_DB: z.string().default('bodybook'),
  PG_POOL_SIZE: z.coerce.number().default(10),
  PG_LAZY_POOL: z.coerce.boolean().default(true),
});

export const ConfigSchema = AppConfigSchema.merge(DatabaseConfigSchema)
  .transform((data: AppConfig & DatabaseConfig) => ({
    app: {
      name: data.APP_NAME,
      host: data.APP_HOST,
      port: data.APP_PORT,
    },
    db: {
      url: data.PG_URL,
      host: data.PG_HOST,
      port: data.PG_PORT,
      user: data.PG_USER,
      password: data.PG_PASSWORD,
      name: data.PG_DB,
      poolSize: data.PG_POOL_SIZE,
      lazyPool: data.PG_LAZY_POOL,
    },
  }));

export type AppConfig = z.infer<typeof AppConfigSchema>;
export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;
