import { ColumnType, Generated } from 'kysely';

import { DatabaseService } from './database.ts';
import { UserTable } from '../../modules/accounts/schemas/user.schema.ts';

export type KyselyService = ReturnType<typeof DatabaseService.init>;

export interface BaseTable {
  id: Generated<string>;
  is_deleted: ColumnType<boolean, boolean, boolean>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, Date | string>;
}

export interface Database {
  users: UserTable;
}
