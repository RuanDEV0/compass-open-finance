const http = require('http');
const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

const HeroFactory = require('./factories/heroFactory');
const Hero = require('./entities/Hero');

const heroService = HeroFactory.generateInstance();

const routes = {
    '/heroes:GET': async (request, response) => {
        try {
            const { id } = request.queryString;
            const heroes = await heroService.find(id);

            response.writeHead(200, DEFAULT_HEADER);
            response.end(JSON.stringify({ result: heroes }));
        } catch (error) {
            handleError(response)(error);
        }
    },

    '/heroes:POST': async (request, response) => {
        let body = '';

        for await (const chunk of request) {
            body += chunk;
        }

        try {
            const item = await JSON.parse(body);
            const hero = new Hero(item);

            console.log('hero: ', hero);
            const { error, valid } = hero.isValid();
            if (!valid) {
                response.writeHead(400, DEFAULT_HEADER);
                return response.end(JSON.stringify({ error: error.join(', ') }));
            }

            const id = await heroService.create(hero);
            response.writeHead(201, DEFAULT_HEADER);
            response.end(JSON.stringify({ success: 'User created successfully!', id }));

        } catch (error) {
            handleError(response)(error);
        }
    },

    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER);
        response.end(JSON.stringify({ error: 'Route not found' }));
    }
};

const handleError = response => {
    return error => {
        console.error('Error:', error);

        if (!response.headersSent) {
            response.writeHead(500, DEFAULT_HEADER);
        }

        response.end(JSON.stringify({ error: 'Internal Server Error!' }));
    };
};

const handler = (request, response) => {
    const { url, method } = request;
    const [_, route, id] = url.split('/');

    request.queryString = { id: isNaN(id) ? id : Number(id) };

    const key = `/${route}:${method}`;

    const chosen = routes[key] || routes.default;

    Promise.resolve(chosen(request, response)).catch(handleError(response));
};

http.createServer(handler).listen(PORT, () => console.log('server running at', PORT));
