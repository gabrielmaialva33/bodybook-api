import { Client } from 'postgres';
import { Env } from '../config/env.ts';
import Log from '../logger/log.ts';

const client = new Client({
  hostname: Env.db.host,
  port: Env.db.port,
  database: Env.db.name,
  user: Env.db.user,
  password: Env.db.password,
});

await client.connect().finally(() => Log.info('Database connected'));

export default client;
