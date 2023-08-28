import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.json({ message: 'Hello World' }));

Deno.serve({ port: 3000 }, app.fetch);
