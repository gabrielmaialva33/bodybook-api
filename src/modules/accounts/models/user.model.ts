import { BaseModel } from '../../../lib/database/index.ts';

export class UserModel extends BaseModel {
  static tableName = 'users';

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password_hash: string;
  avatar_url: string;
  is_email_verified: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
