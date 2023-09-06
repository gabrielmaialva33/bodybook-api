import { type Client, type Transaction, TransactionError } from 'postgres';
import { QueryArguments } from 'https://deno.land/x/postgres@v0.17.0/query/query.ts';

import client from './database.ts';
import Log from '../logger/log.ts';
import { Model } from './index.ts';

export abstract class BaseRepository<T extends Model> {
  protected db: Client;
  protected tableName: string;
  protected transaction: Transaction;

  constructor(
    protected model: T,
  ) {
    this.db = client;
    this.tableName = this.model.tableName;
    this.transaction = this.db.createTransaction(`transaction-${Date.now()}`);
  }

  async query(query: string, args?: QueryArguments | undefined) {
    Log.info(this.prettyQuery(query, args));

    await this.transaction.begin();
    try {
      const result = await this.transaction.queryObject<T>(query, args);
      await this.transaction.commit();
      return result.rows;
    } catch (error) {
      if (error instanceof TransactionError) {
        Log.error(error.cause);
      } else {
        throw error;
      }
    }
  }

  private prettyQuery(query: string, args?: QueryArguments | undefined) {
    const formattedQuery = query.replace(/\s+/g, ' ').trim();
    const formattedArgs = args ? JSON.stringify(args) : '';
    return `${formattedQuery} ${formattedArgs}`;
  }
}
