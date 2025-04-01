import { Router } from 'express';
import User from './app/model/User'
const routes = new Router();

routes.get('/test', async (request, response) => {
    const user = await User.create({
        name: 'RuanDEV',
        email: 'email@gmail.com',
        password_hash: 'bkr7sebd@14273659'
    });

    return response.json(user);
});

export default routes;