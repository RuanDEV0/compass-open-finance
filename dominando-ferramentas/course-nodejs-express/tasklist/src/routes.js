import { Router } from 'express';
const routes = new Router();
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authAutorization from './app/middlewares/auth';

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.put('/users', authAutorization, UserController.update);


export default routes;