import { Hono } from 'hono';
import { compress, cors, logger, prettyJSON } from 'hono/middleware';
import { UserRepository } from './modules/accounts/repositories/user.repository.ts';

import { DatabaseService } from './lib/database/index.ts';
import { Env } from './lib/config/index.ts';

const app = new Hono();

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.use(compress());

const db = DatabaseService.init(Env);
app.get('/', async (c) => {
  const userRepo = new UserRepository(db);
  const user = await userRepo.findOrCreate({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@email.com',
    username: 'johndoe',
    avatar_url: 'https://www.google.com',
  });

  console.log(user);

  const users = await userRepo.list();
  return c.json(users);
});

export default app;
