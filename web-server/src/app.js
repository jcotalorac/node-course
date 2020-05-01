const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello express');
});

app.get('/help', (request, response) => {
    response.send('Help page');
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