import http from 'http';
import {createReadStream, readFileSync} from 'fs';

http.createServer()
    .on('request', (request, response) => {
        const filename = './http-servers/index.html';
        const template = readFileSync(filename, 'utf8');
        const content = template.replace('{message}', 'Hello World');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(content);
        // createReadStream(filename).pipe(response);
    })
    .listen(9000);