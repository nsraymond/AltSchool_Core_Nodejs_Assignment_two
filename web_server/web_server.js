// importing modules
const http = require('http');
const fs = require('fs');
const { handleRequest } = require('./handle_request');

// creating port and localhost
const PORT = 3000;
const HOST_NAME = 'localhost';

// creating server and handling request
const server = http.createServer(handleRequest);

// server listening for request
server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening on http://${HOST_NAME}:${PORT}`)
})
