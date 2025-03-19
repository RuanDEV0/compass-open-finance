const { timeStamp, error } = require("node:console");
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

        }else if(request.method == "GET" && url.pathname.startsWith("/is-prime-number")){

            let array = url.pathname.split("/");
            let param = array.pop();

            if(param >= 1 && !isNaN(param) && array.length == 2){

                let isPrime = function(parameter){
                    let cont = 0;
                    for(let i = 1; i <= parameter; i++){
                        if(parameter % i == 0) cont++;
                    }
                
                    return cont == 2 ? true : false;
                }
                
                response.statusCode = 200;
                response.end(JSON.stringify({isPrime: isPrime(param)}));


            }else{
                
                response.statusCode = 400;
                response.end(JSON.stringify({
                    message: "invalid input",
                }));
            }
            
        }else if(request.method === "POST" && url.pathname === "/count"){

            let body = "";

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                try {

                    const parsed = body ? JSON.parse(body).incrementBy : undefined;

                    if(isNaN(parsed) || parsed <= 0 || !Number.isInteger(parsed)){
                        response.statusCode = 400;
                        response.end(JSON.stringify({
                            error: "Invalid input!"
                        }))
                    }else{

                        response.statusCode = 200;
                        response.end(JSON.stringify({ counter: parsed }));

                    }

                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Invalid JSON body" }));
                }
            });

        }else{
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: "Route not found",
                error: url.pathname
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