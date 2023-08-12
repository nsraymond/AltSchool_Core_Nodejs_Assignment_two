// IMPORTING IN_BUILT MODULES
const http = require('http');
const fs = require('fs');
const path = require('path');

// IMPORTING REQUEST HANDLER FUNCTION
const requestHandler = require('./request_handler');

// PORT AND LOCALHOST
const PORT = 8000;
const HOST_NAME = 'localhost';

// CREATING SERVER
const server = http.createServer(requestHandler);

// LISTENING FOR REQUESTS
server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening on http://${HOST_NAME}:${PORT}`)
})