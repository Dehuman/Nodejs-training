import http from 'http';

http.createServer()
    .on('request', (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World');
    })
    .listen(9000);