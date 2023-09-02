import {
  AbstractMigration,
  ClientPostgreSQL,
  Info,
} from 'https://deno.land/x/nessie@2.0.10/mod.ts';

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
