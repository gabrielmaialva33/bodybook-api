// deno-lint-ignore-file require-await
import { Pool, PoolClient } from 'postgres';
import {
  CompiledQuery,
  DatabaseConnection,
  Driver,
  TransactionSettings,
} from 'kysely';
import { PostgresConnection } from './postgres-connection.ts';

export type PostgresDialectConfig = { pool: Pool };
export const PRIVATE_RELEASE_METHOD = Symbol();

export class PostgresDriver implements Driver {
  readonly #config: PostgresDialectConfig;
  readonly #connections = new WeakMap<PoolClient, DatabaseConnection>();
  #pool?: Pool;

  constructor(config: PostgresDialectConfig) {
    console.log('PostgresDriver.init');
    console.log({ config });
    this.#config = config;
  }

  async init(): Promise<void> {
    this.#pool = this.#config.pool;
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    console.log('acquireConnection');
    console.log(this.#pool);
    const client = await this.#pool!.connect();
    let connection = this.#connections.get(client);

    if (!connection) {
      connection = new PostgresConnection(client);
      this.#connections.set(client, connection);
    }

    return connection;
  }

  async beginTransaction(
    connection: DatabaseConnection,
    settings: TransactionSettings,
  ): Promise<void> {
    if (settings.isolationLevel) {
      await connection.executeQuery(
        CompiledQuery.raw(
          `start transaction isolation level ${settings.isolationLevel}`,
        ),
      );
    } else {
      await connection.executeQuery(CompiledQuery.raw('begin'));
    }
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('commit'));
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('rollback'));
  }

  async releaseConnection(connection: PostgresConnection): Promise<void> {
    connection[PRIVATE_RELEASE_METHOD]();
  }

  async destroy(): Promise<void> {
    if (this.#pool) {
      const pool = this.#pool;
      this.#pool = undefined;
      await pool.end();
    }
  }
}
