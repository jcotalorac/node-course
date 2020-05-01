const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/help', (request, response) => {
    response.send({
        name: 'Andrew',
        age: 27
    });
});

app.get('/about', (request, response) => {
    response.send('<head><title>About</title></head>');
});

app.get('/weather', (request, response) => {
    response.send('<head><title>Weather</title></head>');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});