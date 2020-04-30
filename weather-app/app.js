const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

geocode('Madelena', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});

forecast(-74.160509, 4.591965, (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});