const {createServer} = require("node:http");

const host = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hellow word");

});

server.listen((host, port), () => {
    console.log(`Server running at http://${host}:${port}/`);
})