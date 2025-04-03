import { Router } from 'express';
const routes = new Router();
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authAutorization from './app/middlewares/auth';
import ValidBody from './app/middlewares/ValidBody';

routes.post('/users', ValidBody.checkPost, UserController.store);

routes.post('/sessions', SessionController.store);

routes.put('/users', ValidBody.checkPut, authAutorization, UserController.update);


export default routes;