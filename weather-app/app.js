const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

geocode('Madelena', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
    forecast(data.latitude, data.longitude, (error, data) => {
        console.log('Error', error);
        console.log('Data', data);
    });
});
