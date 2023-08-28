import { PoolClient } from 'postgres';
import { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely';

import { PRIVATE_RELEASE_METHOD } from './postgres-driver.ts';

export class PostgresConnection implements DatabaseConnection {
  #client: PoolClient;

  constructor(client: PoolClient) {
    console.log('PostgresConnection');
    console.log({ client });
    this.#client = client;
  }
  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Method not implemented.');
  }

  async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    try {
      const result = await this.#client.queryObject<O>(compiledQuery.sql, [
        ...compiledQuery.parameters,
      ]);

      if (
        (result.command === 'INSERT' ||
          result.command === 'UPDATE' ||
          result.command === 'DELETE') && result.rowCount
      ) {
        const numAffectedRows = BigInt(result.rowCount);

        return {
          numAffectedRows,
          rows: result.rows ?? [],
        };
      }

      return {
        rows: result.rows ?? [],
      };
    } catch (err) {
      throw err;
    }
  }

  [PRIVATE_RELEASE_METHOD](): void {
    this.#client.release();
  }
}
