import { BaseRepository } from '../../../lib/database/base.repository.ts';
import { UserModel } from '../models/user.model.ts';

export class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super(UserModel);
  }
}
