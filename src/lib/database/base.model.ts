import { Client } from 'postgres';
import client from './database.ts';
import Log from '../logger/log.ts';

export abstract class BaseModel {
  public static pg: Client = client;
  public db: Client;

  /**
   * ------------------------------
   * METHODS
   * ------------------------------
   */
  async boot() {
    await client.connect();
  }

  public static $defineProperty(key: string, value: any) {
    Object.defineProperty(this, key, {
      value,
      writable: false,
      enumerable: true,
      configurable: false,
    });
  }

  /**
   * ------------------------------
   * HOOKS
   * ------------------------------
   */
  public beforeCreate() {
    Log.info('beforeCreate');
  }
  public afterCreate() {
    Log.info('afterCreate');
  }

  /**
   * ------------------------------
   * QUERIES
   * ------------------------------
   */

  constructor() {
    this.boot();
    this.db = client;
  }
}

export type Model = () => typeof BaseModel;

export type ModelAttributes<T> = { [P in keyof T]?: T[P] };
