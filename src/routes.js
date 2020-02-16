import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import checkAuthorization from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', checkAuthorization, UserController.update);
routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
