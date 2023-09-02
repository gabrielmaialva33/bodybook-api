import { Hono } from 'hono';
import { compress, cors, logger, prettyJSON } from 'hono/middleware';
import { UserRepository } from './modules/accounts/repositories/user.repository.ts';

import './lib/database/database.ts';

const app = new Hono();

app.use(cors());
app.use(logger());
app.use(prettyJSON());
app.use(compress());

app.get('/', async (c) => {
  const userRepo = new UserRepository();

  const user = await userRepo.create({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@email.com',
    username: 'johndoe',
    password_hash: '123456',
  });

  console.log(user);

  // const users = await userRepo.list();
  return c.json(user);
});

export default app;
