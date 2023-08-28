import app from './app.ts';

Deno.serve({ port: 3000 }, app.fetch);
