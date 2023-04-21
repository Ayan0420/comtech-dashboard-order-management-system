const http = require('http');

const port = 4004;

const server = http.createServer((request, response) => {
    if (request.url == '/greetings') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello Again World!');
        console.log('Success!');
    } else if(request.url == '/homepage') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('This is the homepage');
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page is not available');
    }
});

server.listen(port);

console.log(`Server now accessable at localhost:${port}.`);