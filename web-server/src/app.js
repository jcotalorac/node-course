const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
        name: 'JC'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'JC'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'JC'
    });
});

app.get('/weather', (request, response) => {
    const address = request.query.address;
    if(!address) {
        response.send({
            message: 'You must provide an address'
        });
        return;
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return response.send({
                message: error
            });
        }
        forecast(latitude, longitude, (error, {temperature, feelslike, weatherDescription }) => {
            if(error) {
                return response.send({
                    message: error
                });
            }
            response.send({
                location,
                weatherDescription,
                temperature,
                feelslike,
                address
            });
            console.log(location);
            console.log(`${weatherDescription}. Temperature is ${temperature} and it feels like ${feelslike}`);
        });
    });
});

app.get('/products', (request, response) => {
    console.log(request.query);
    response.send({
        products: []
    });
    response.send({
        products: []
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'JC'
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: 'Error',
        name: 'JC'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});