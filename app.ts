import { Hono } from 'hono';
import { compress, cors, logger, prettyJSON } from 'hono/middleware';

import config from './nessie.config.ts';

const app = new Hono();

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.use(compress());

app.get('/', (c) => c.json({ config }));

export default app;
