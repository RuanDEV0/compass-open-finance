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
        
        }else if(request.method === "GET" && url.pathname === "/stock-insight"){

            switch(url.searchParams.size){
                case 1:
                    userCurrency(url.searchParams.get("currency"));
                    break;
                case 0:
                    responseUsd();
                    break;
                default:
                    errorSearchParams();
                    break;
            }

            function errorSearchParams(){
                response.statusCode = 400;
                response.end(JSON.stringify({message: "search params invalid!"}));
            }
            
            function userCurrency(data){
                data = verificyCurrency(data);
                if(data === "brl"){
                    responseBrl()
                }else{
                    responseUsd();
                }

            }

            async function responseUsd(){
                const bitcoin = await fetchPriceBitcoinByCoin();

                /**
                 * Verifica se o fetchPriceBitcoinByCoin returna null e sair da função.
                 */
                if(!bitcoin){
                    return
                }    
                    
                const price = bitcoin.usd;
                let json = JSON.stringify({
                    btc_price: price,
                    currency: "usd",
                    suggestion: comparePrice([price, 80_000, 60_000])
                })

                response.statusCode = 200;
                response.end(json);
            }

            function comparePrice([price, maxBuy, maxGoodBuy]){
                if(price> maxBuy){
                    return "Bitcoin está caro. Pode ser melhor esperar.";
                }else if(price < maxGoodBuy){
                    return"Bom momento para compra!";
                }else{
                    return "Preço razoável. Avalie antes de comprar. "
                }
            }

            async function responseBrl(){
                const bitcoin = await fetchPriceBitcoinByCoin("brl");



                /**
                 * Maneira encontrada de verificar se o fetchPriceBitcoinByCoin retorna null 
                 * e o return para sair da função.
                 */
                if(!bitcoin){
                    return
                }    

                const price = bitcoin.brl;
                let json = JSON.stringify({
                    btc_price: price,
                    currency: "brl",
                    suggestion: comparePrice([price, 450_000, 300_000])
                })

                response.statusCode = 200;
                response.end(json);
            }

            async function fetchPriceBitcoinByCoin(coin = "usd"){
                try{
                    const api = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${coin}`, {
                        method: "GET",
                        headers: {
                            accept: "application/json"
                        }
                    });
                    
                    const body = await api.json();

                    if (!api.ok) {
                        throw new Error(`Erro na API CoinGecko: ${api.statusText}`);
                    }

                    return body.bitcoin;

                }catch(error){
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: error.message }));
                    /**
                     * Uma forma de evitar que esta função retorne undefined.
                     */
                    return null;
                }

            }

            function verificyCurrency(data){
                if(data !== null && (data === "usd" || data === "brl")){
                    return data;
                }else{
                    errorSearchParams();
                }
            }

        }
        else{
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