const http = require('http');
const PORT = 3000;
const handler = (request, response) => {

}

http.createServer(http).listen(PORT, () => console.log('server running at', PORT));