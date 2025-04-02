import { Router } from '../core/router.js';
import { UserHandler } from '../handlers/user.handler.js';

export function configureRoutes(client) {
  const router = new Router();
  const userHandler = new UserHandler(client);

  router.get('/users/:id', (req, res) => userHandler.get(req, res));
  router.post('/users/:id', (req, res) => userHandler.update(req, res));

  return router;
}
