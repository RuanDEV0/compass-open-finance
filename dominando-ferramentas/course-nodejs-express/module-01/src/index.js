const express = require('express');

const server = express();
const PORT = 3020;

server.get('/product/:parameter', (request, response) => {

    const queryParams = request.query.parameter;
    const pathVariable = request.params.parameter;
    response.end(JSON.stringify({
        QueryParames: queryParams,
        PathVariable: pathVariable
        }));
});

server.listen(3020);
console.log('server running at ', PORT);