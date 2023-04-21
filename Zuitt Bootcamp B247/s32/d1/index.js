let http = require('http');

http.createServer((request, response) => {
    if(request.url === '/items' && request.method === 'GET'){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Data retrieved from the database.')
    }

    if(request.url === '/items' && request.method === 'POST'){
        response.writeHead(200, {'Content-Type': 'text/plain'});

}).listen(4000);

console.log('Server running on port 4000')