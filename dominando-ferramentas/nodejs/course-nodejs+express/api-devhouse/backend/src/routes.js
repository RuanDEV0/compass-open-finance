import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/uṕload';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();

const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.filter);
routes.delete('/houses/:id', HouseController.destroy);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.get('/reserves/:id', ReserveController.show);
routes.delete('/reserves/:id', ReserveController.destroy);

export default routes;