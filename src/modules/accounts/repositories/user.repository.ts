import { KyselyService } from '../../../lib/database/index.ts';
import { NewUserDTO, USER_TABLE } from '../schemas/user.schema.ts';

export class UserRepository {
  private db: KyselyService;

  constructor(db: KyselyService) {
    this.db = db;
  }

  public async list() {
    return await this.db.selectFrom(USER_TABLE)
      .select([
        'id',
        'first_name',
        'last_name',
        'email',
        'username',
        'avatar_url',
        'is_email_verified',
      ])
      .execute();
  }

  public async create(payload: NewUserDTO) {
    return await this.db.insertInto(USER_TABLE)
      .values({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        username: payload.username,
        avatar_url: payload.avatar_url,
        is_email_verified: false,
        password_hash: 'xxxx',
        is_deleted: false,
      })
      .returningAll()
      .execute();
  }

  public async findOrCreate(payload: NewUserDTO) {
    const user = await this.db.selectFrom(USER_TABLE)
      .select([
        'id',
        'first_name',
        'last_name',
        'email',
        'username',
        'avatar_url',
        'is_email_verified',
      ])
      .where('email', '=', payload.email)
      .executeTakeFirstOrThrow();

    if (user) {
      return user;
    }

    return await this.create(payload);
  }
}
