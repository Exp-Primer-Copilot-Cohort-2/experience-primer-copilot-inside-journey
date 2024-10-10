// Create web server
// Create a web server that listens on port 3000 and serves the comments.html page. Use the comments.html page that you created in the previous task. The server should also serve the comments.json file, which contains the comments data. The server should serve the comments.json file only if the request has an Accept header with a value of application/json.
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'comments.json');
  const extname = path.extname(filePath);
  const contentType = 'application/json';

  if (req.url === '/comments.html') {
    fs.readFile(path.join(__dirname, 'comments.html'), (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/comments.json' && req.headers.accept === contentType) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});