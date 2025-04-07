const express = require('express');

const server = express();
const PORT = 3020;

server.use(express.json());

const products = ['NodeJS', 'JAVA', 'Python', 'C++', 'C'];

server.use((request, response, next) => {
    console.log(`URL CHAMADA ${request.url}`);
    return next();
})

function checkProduct(request, response, next){
    if(!request.body.name)
        return response.status(400).json({error: 'Input format invalid!'});

    return next();
}

function checkIdProduct(request, response, next){
    const product = products[request.params.id];
    if(!product) return response.status(400).json({error: 'index product invalid!'});

    request.product = product;
    return next();
}

/*** FIND ALL*/
server.get('/product', (request, response) =>{
    return response.json(products);
})

/**FIND BY ID */
server.get('/product/:id', checkIdProduct, (request, response) => {
    return response.json(request.product);
});

/**SAVE */
server.post('/product', checkProduct, (request, response) => {
    const {name} = request.body;
    products.push(name);

    return response.end();

})

/** REPLACE */
server.put('/product/:id', checkProduct, checkIdProduct, (request, response) => {
    const {id} = request.params;
    const{name}  = request.body;

    products[id] = name;

    return response.end();
})

server.listen(3020);
console.log('server running at ', PORT);