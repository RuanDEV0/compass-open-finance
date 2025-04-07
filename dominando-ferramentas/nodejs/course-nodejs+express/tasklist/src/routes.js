import { Router } from 'express';
const routes = new Router();
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authAutorization from './app/middlewares/auth';
import TaskController from './app/controllers/TaskController';
import TaskValidate from './app/middlewares/TaskValidate';
import UserValidate from './app/middlewares/UserValidate';

routes.post('/users', UserValidate.validateBodyPost, UserController.store);

routes.post('/sessions', SessionController.store);

routes.put('/users', UserValidate.validateBodyPut, authAutorization, UserController.update);

routes.post('/tasks', TaskValidate.validateBodyPost, authAutorization, TaskController.store);
routes.get('/tasks', authAutorization, TaskController.index);
routes.put('/tasks/:id', authAutorization, TaskController.update);
routes.delete('/tasks/:id', authAutorization, TaskController.destroy);

export default routes;