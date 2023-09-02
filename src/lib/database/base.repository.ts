import { Model, ModelAttributes } from './base.model.ts';
import { BaseModel, IBaseRepository } from './index.ts';

export abstract class BaseRepository<T extends BaseModel>
  implements IBaseRepository<T> {
  private model: Model;

  constructor(m: Model) {
    this.model = m;
  }

  public async create(payload: ModelAttributes<T>): Promise<T> {
    console.log('model', this.model);
    console.log('payload', payload);
    console.log('table', this.model);
    console.log(
      `INSERT INTO ${this.model.table} (${
        Object.keys(payload).join(', ')
      }) VALUES (${
        Object.keys(payload).map((_, index) => '$' + (index + 1)).join(', ')
      }) RETURNING *`,
    );

    const result = await this.model.db.queryObject(
      `INSERT INTO ${this.model.table} (${
        Object.keys(payload).join(', ')
      }) VALUES (${
        Object.keys(payload).map((_, index) => '$' + (index + 1)).join(', ')
      }) RETURNING *`,
      Object.values(payload),
    );

    return result.rows[0] as T;
  }
}
