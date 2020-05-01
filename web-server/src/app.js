const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('<h1>Weather</h1>');
});

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