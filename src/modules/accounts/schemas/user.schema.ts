import { z } from 'zod';

export const USER_TABLE = 'users';

export const UserSchema = z.object({
  id: z.number(),
  first_name: z.string().min(2).max(80).describe('User first name'),
  last_name: z.string().min(2).max(80).describe('User last name'),
  full_name: z.string().min(2).max(160).describe('User full name'),
  email: z.string().email().min(2).max(255).describe('User email'),
  username: z.string().min(2).max(40).describe('User username'),
  password_hash: z.string().min(2).max(118).describe('User password hash'),
  avatar_url: z.string().min(2).max(255).describe('User avatar url'),
  is_email_verified: z.boolean().default(false).describe(
    'Is user email verified?',
  ),
  is_deleted: z.boolean().default(false).describe('Is user deleted?'),
  created_at: z.date().describe('User creation date'),
  updated_at: z.date().describe('User last update date'),
  deleted_at: z.date().nullable().describe('User deletion date'),
});

export const CREATE_USER_SCHEMA = z.object({
  first_name: z.string().min(2).max(80).describe('User first name'),
  last_name: z.string().min(2).max(80).describe('User last name'),
  email: z.string().email().min(2).max(255).describe('User email'),
  username: z.string().min(2).max(40).describe('User username'),
  password: z.string().min(8).max(40).describe('User password'),
  confirm_password: z.string().min(8).max(40).describe('User confirm password'),
});

export const UPDATE_USER_SCHEMA = z.object({
  first_name: z.string().min(2).max(80)
    .optional()
    .describe('User first name'),
  last_name: z.string().min(2).max(80).optional().describe('User last name'),
  email: z.string().email().min(2).max(255).optional().describe('User email'),
  username: z.string().min(2).max(40).optional().describe('User username'),
  password: z.string().min(8).max(40).optional().describe('User password'),
  confirm_password: z.string().min(8).max(40).optional(),
});

export type UserSchema = z.infer<typeof UserSchema>;

export type NewUserDTO = Omit<
  UserSchema,
  | 'id'
  | 'full_name'
  | 'is_deleted'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'password_hash'
  | 'is_email_verified'
>;

export type EditUserDTO = Omit<
  UserSchema,
  | 'id'
  | 'full_name'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'password_hash'
  | 'is_email_verified'
>;
