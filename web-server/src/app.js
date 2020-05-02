const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather app',
        name: 'Andrew Mead'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        message: 'Help message'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});