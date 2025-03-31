import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/uṕload';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';

const routes = new Router();

const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.filter);
routes.delete('/houses/:id', HouseController.destroy);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);

routes.get('/dashboard', DashboardController.show);
export default routes;