const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
    console.log('Running on port ' + port);
});