import { BaseRepository } from '../../../lib/database/base.repository.ts';
import { UserModel } from '../models/user.model.ts';

export class UserRepository extends BaseRepository<typeof UserModel> {
  constructor() {
    super(UserModel);
  }

  async create(data: Partial<UserModel>) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const query = `
      INSERT INTO ${this.tableName} (${fields.join(', ')})
      VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')})
      RETURNING *;
    `;

    const result = await this.query(query, values);

    return result;
  }
}
