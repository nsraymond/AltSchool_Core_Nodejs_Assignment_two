// IMPORTING IN_BUILTS
const http = require('http');
const fs = require('fs');
const path = require('path');

// HANDLING REQUESTS
function requestHandler(req, res){
    // getting all items
    if (req.url === '/items' && req.method === 'GET') {
        fs.readFile(path.join(__dirname,'database', 'database.json'), 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
          }
        });
      } 
    // getting a single item
      else if (req.url.startsWith('/items/') && req.method === 'GET') {
        const itemId = req.url.split('/')[2];
        fs.readFile(path.join(__dirname, 'database', 'database.json'), 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
            const items = JSON.parse(data);
            const item = items.find((item) => item.id === itemId);
            if (item) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(item));
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Item not found' }));
            }
          }
        });
      } 
      // creating an item
      else if (req.url === '/items' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
    
        req.on('end', () => {
          const newItem = JSON.parse(body);
          fs.readFile(path.join(__dirname, 'database','database.json'), 'utf8', (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
              const items = JSON.parse(data);
              items.push(newItem);
              fs.writeFile(path.join(__dirname, 'database', 'database.json'), JSON.stringify(items), (err) => {
                if (err) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                  res.writeHead(201, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(newItem));
                }
              });
            }
          });
        });
      } 
      // updating an item
      else if (req.url.startsWith('/items/') && req.method === 'PUT') {
        const itemId = req.url.split('/')[2];
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
    
        req.on('end', () => {
          const updatedItem = JSON.parse(body);
          fs.readFile(path.join(__dirname, 'database', 'database.json'), 'utf8', (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
              const items = JSON.parse(data);
              const index = items.findIndex((item) => item.id === itemId);
              if (index !== -1) {
                items[index] = { ...items[index], ...updatedItem, id: itemId };
                fs.writeFile(path.join(__dirname, 'database', 'database.json'), JSON.stringify(items), (err) => {
                  if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                  } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(items[index]));
                  }
                });
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Item not found' }));
              }
            }
          });
        });
      } 
    //   // deleting an item
    else if (req.url.startsWith('/items/') && req.method === 'DELETE') {
        const itemId = req.url.split('/')[2];
        fs.readFile(path.join(__dirname, 'database', 'database.json'), 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
            let items = JSON.parse(data);
            const index = items.findIndex((item) => item.id === itemId);
            if (index !== -1) {
              items = items.filter((item) => item.id !== itemId);
              fs.writeFile(path.join(__dirname, 'database', 'database.json'), JSON.stringify(items), (err) => {
                if (err) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Item deleted successfully' }));
                }
              });
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Item not found' }));
            }
          }
        });
      }
      
}

module.exports = requestHandler;