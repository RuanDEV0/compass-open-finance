const express = require('express');

const server = express();
const PORT = 3020;

server.get('/product', (request, response) => {
    response.end(JSON.stringify({message: 'Hellow Word'}));
});

server.listen(3020);
console.log('server running at ', PORT);