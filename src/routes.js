import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import checkAuthorization from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', checkAuthorization, UserController.update);
routes.post('/sessions', SessionController.store);

export default routes;
