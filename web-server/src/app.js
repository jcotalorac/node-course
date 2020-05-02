const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather app',
        name: 'Andrew Mead'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'Another name'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (request, response) => {
    response.send('<head><title>Weather</title></head>');
});

app.get('/help/*', (request, response) => {
    response.send('Help article not found');
});

app.get('*', (request, response) => {
    response.send('My 404 page');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});