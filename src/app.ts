import { Hono } from 'hono';
import { compress, cors, logger, prettyJSON } from 'hono/middleware';

const app = new Hono();

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.use(compress());

app.get('/', (c) => c.json({ message: 'Hello World!' }));

export default app;
