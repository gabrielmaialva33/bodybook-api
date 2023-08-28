import 'std/dotenv/load.ts';

import app from './src/app.ts';
import { Env } from './src/lib/config/index.ts';

Deno.serve({ hostname: Env.app.host, port: Env.app.port }, app.fetch);
