import { Pool } from 'postgres';
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely';

import { Database } from './database.type.ts';
import { Config } from '../config/index.ts';
import { PostgresDriver } from './lib/index.ts';

export class DatabaseService {
  static init(config: Config) {
    console.log('DatabaseService.init');
    console.log(config.db);
    const pool = new Pool(
      config.db.url,
      config.db.poolSize,
      config.db.lazyPool,
    );
    console.log({ pool });

    return new Kysely<Database>({
      dialect: {
        createAdapter() {
          return new PostgresAdapter();
        },
        createDriver() {
          return new PostgresDriver({ pool });
        },
        createIntrospector(db) {
          return new PostgresIntrospector(db);
        },
        createQueryCompiler() {
          return new PostgresQueryCompiler();
        },
      },
    });
  }
}
