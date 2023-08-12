const fs = require('fs');
const path = require('path');

// handling requests
const handleRequest = (req, res) => { 
    // handling the index.html route
    if (req.url === '/index.html') {
        const indexPath = path.join(__dirname, 'index.html');
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // handling random.html files
    else if (req.url.endsWith('.html')) {
        const notFoundPath = path.join(__dirname, '404.html');
        fs.readFile(notFoundPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // handling other urls
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h3>404: page not found. Please go to index.html url');
    }
}

module.exports = {
    handleRequest,
}