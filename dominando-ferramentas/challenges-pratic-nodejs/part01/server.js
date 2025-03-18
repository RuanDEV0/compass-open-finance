const { timeStamp } = require("node:console");
const {createServer, request} = require("node:http");
const {URL} = require("node:url");

const host = "127.0.0.1";
const port = 3000;

const server = createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");

    try{
        const url = new URL(request.url, `http://${host}:${port}`);

        if(request.method === "GET" && url.pathname == "/health-check"){
            response.statusCode = 200;
            response.end(JSON.stringify({
                success: true,
                timestamp: new Date().toISOString()
            }));
        }

    }catch(error){
        console.log(error);
        response.statusCode = 500;
        response.end(JSON.stringify({error: "Internal Server Error"}));
    }
    
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});