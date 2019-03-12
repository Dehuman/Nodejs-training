import http from 'http';

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        {color: 'blue'},
        {size: 'XL'}
    ]
};

http.createServer()
    .on('request', (request, response) => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(product));
    })
    .listen(9000);