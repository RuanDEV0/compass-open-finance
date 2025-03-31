import { Router } from 'express';

const routes = new Router();

routes.get('/test', (request, response) => {
    return response.json({active: true});
});

export default routes;