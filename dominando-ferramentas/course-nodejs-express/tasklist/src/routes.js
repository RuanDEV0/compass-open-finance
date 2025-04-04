import { Router } from 'express';
const routes = new Router();
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authAutorization from './app/middlewares/auth';
import ValidBody from './app/middlewares/ValidBody';
import TaskController from './app/controllers/TaskController';

routes.post('/users', ValidBody.checkPostUser, UserController.store);

routes.post('/sessions', SessionController.store);

routes.put('/users', ValidBody.checkPutUser, authAutorization, UserController.update);

routes.post('/tasks', ValidBody.checkPostTask, authAutorization, TaskController.store);
routes.get('/tasks', authAutorization, TaskController.index);
routes.put('/tasks/:id', authAutorization, TaskController.update);
routes.delete('/tasks/:id', authAutorization, TaskController.destroy);

export default routes;