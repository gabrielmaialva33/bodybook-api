import {
  AbstractMigration,
  ClientPostgreSQL,
  Info,
} from 'https://deno.land/x/nessie@2.0.10/mod.ts';

// export const UserSchema = z.object({
//   id: z.number(),
//   first_name: z.string().min(2).max(80).describe('User first name'),
//   last_name: z.string().min(2).max(80).describe('User last name'),
//   full_name: z.string().min(2).max(160).describe('User full name'),
//   email: z.string().email().min(2).max(255).describe('User email'),
//   username: z.string().min(2).max(40).describe('User username'),
//   password_hash: z.string().min(2).max(118).describe('User password hash'),
//   avatar_url: z.string().min(2).max(255).describe('User avatar url'),
//   is_email_verified: z.boolean().default(false).describe(
//     'Is user email verified?',
//   ),
//   is_deleted: z.boolean().default(false).describe('Is user deleted?'),
//   created_at: z.date().describe('User creation date'),
//   updated_at: z.date().describe('User last update date'),
//   deleted_at: z.date().nullable().describe('User deletion date'),
// });

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up({}: Info): Promise<void> {
    await this.client.queryArray(`
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR(80) NOT NULL,
            last_name VARCHAR(80) NOT NULL,
            full_name VARCHAR(160) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(40) NOT NULL UNIQUE,
            password_hash VARCHAR(118) NOT NULL,
            avatar_url VARCHAR(255) DEFAULT NULL,
            is_email_verified BOOLEAN DEFAULT FALSE,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMP NULL DEFAULT NULL
        );
    `);
  }

  /** Runs on rollback */
  async down({}: Info): Promise<void> {
    await this.client.queryArray(`
        DROP TABLE users;
    `);
  }
}
