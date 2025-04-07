import { Router } from "express";
const routes = new Router();

routes.get('/health-check', (request, response) => {
    response.json({
        success: true,
        timestamp: new Date().toISOString()
    });
})

routes.get('/is-prime-number/:number', (request, response) => {
    const { number } = request.body;
    let cont = 0;
    for(let i = 1; i <= number; i++){
        if(number % i === 0){
            cont++;
        }
    }

    const result =  cont == 2 ? true: false;
    return response.json({isPrime: result})
})
export default routes;