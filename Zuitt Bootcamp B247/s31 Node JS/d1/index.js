//Use the "require" derictive to load Node.js modules

// The messages sent by the "client", usually a Web browser are called "request"
// The message sent by the "server" as an answer are called "response"

let http = require("http");

http.createServer(function(request, response) {

    // We will use the writeHead() method:
        // To set a status to code for the response - a 200 ok
        // Set the content-type of the response as a plain text message
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response with text content "Hello World!"
    response.end('Hello World!');
}).listen(4000)

// When server is running, console willl print the message.
console.log('Server running at localhost:4000')


