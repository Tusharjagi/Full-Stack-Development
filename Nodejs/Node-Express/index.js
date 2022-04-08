const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res, next) => {
    console.log(req.header);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is Express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
});