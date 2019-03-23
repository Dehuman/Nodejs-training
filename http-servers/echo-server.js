import http from 'http';

http.createServer()
    .on('request', (request, response) => {
        request.pipe(response);
    })
    .listen(9000);