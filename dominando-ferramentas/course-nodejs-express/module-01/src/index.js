const express = require('express');

const server = express();
const PORT = 3020;

server.use(express.json());

const products = ['NodeJS', 'JAVA', 'Python', 'C++', 'C'];

/*** FIND ALL*/
server.get('/product', (request, response) =>{
    return response.json(products);
})

/**FIND BY ID */
server.get('/product/:id', (request, response) => {

    const {id} = request.params;

    return response.json(products[id]);
});

/**SAVE */
server.post('/product', (request, response) => {
    const {name} = request.body;
    products.push(name);

    return response.end();

})

/** REPLACE */
server.put('/product/:index', (request, response) => {
    const {index} = request.params;
    const{name}  = request.body;

    products[index] = name;

    return response.end();
})

server.listen(3020);
console.log('server running at ', PORT);