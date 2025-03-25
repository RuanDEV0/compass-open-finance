const http = require('http');
const PORT = 3000;
const DEFAULT_HEADER = {'Content-Type': 'application/json'}

const HeroFactory = require('./factories/heroFactory');
const Hero = require('./entities/Hero');
const { resolveNs } = require('dns');
const heroService = HeroFactory.generateInstance();
const routes = {
    '/heroes:GET': async (request, response) => {
        const {id} = request.queryString;
        const heroes = await heroService.find(id);

        response.write(JSON.stringify({result: heroes}));
        return response.end();
    },
    '/heroes:POST': async(request, response) => {
        for await (const data of request){
            try{
                const item = JSON.parse(data);
                const hero = new Hero(item);
    
                const {error, valid} = hero.isValid();
                if(!valid){
                    response.writeHead(400, DEFAULT_HEADER);
                    response.write(JSON.stringify({error: error.join(", ")}));
                    return response.end();
                }
    
                const id = heroService.create(hero);
                response.writeHead(201, DEFAULT_HEADER);
                response.write(JSON.stringify({sucess: 'user created sucess!! ', id}));
    
                /**
                 * Só jogamos o return aqui, pois sabemos que é um objeto body por requisição.
                 * Se fosse um arquivo, que sobe sob demanda ele poderia entrar mais vezes em um
                 * mesmo evento, ai removeriamos o return
                 */
                return response.end();

            }catch(error){
                console.log(error);
                return handleError(response) (error);
            }    
        }
    },
    default: (request, response) => {
        response.write('Route default');
        response.end();
    }
}

const handleError = response => {
    return error => {
        console.log('Error ', error);

        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({error: 'Internal Server Error!'}));

        return response.end();
    }
}
const handler = (request, response) => {
    const {url, method } = request;
    const [first, route, id] = url.split('/');

    request.queryString = {id: isNaN(id) ? id : Number(id)};

    const key = `/${route}:${method}`;

    response.writeHead(200, DEFAULT_HEADER);

    const chosen = routes[key] || routes.default;

    return chosen(request, response).catch(handleError(response));
}

http.createServer(handler).listen(PORT, () => console.log('server running at', PORT));