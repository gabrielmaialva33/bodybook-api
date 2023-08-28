import { Config, ConfigSchema } from './config.schema.ts';

const getConfig = (): Config => {
  const parseResult = ConfigSchema.safeParse(Deno.env.toObject());

  if (!parseResult.success) {
    throw new Error(
      `Validation Error: ${JSON.stringify(parseResult.error.issues)}`,
    );
  }

  return parseResult.data;
};

export const Env = getConfig();
