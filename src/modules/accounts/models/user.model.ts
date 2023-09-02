import { BaseModel } from '../../../lib/database/base.model.ts';

export class UserModel extends BaseModel {
  public static tableName = 'users';

  public id?: string | null;
  public first_name!: string;
  public last_name!: string;
  public full_name?: string | null;
  public email!: string;
  public username!: string;
  public password_hash!: string;
  public avatar_url?: string;
  public is_email_verified?: boolean;
  public is_deleted?: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date | null;
}
