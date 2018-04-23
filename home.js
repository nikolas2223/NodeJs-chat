var http = require('http');

exressWs = require('express-ws');


http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('Hello World\n');
}).listen(3000);