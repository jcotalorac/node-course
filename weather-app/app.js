const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

geocode('Madelena', (error, data) => {
    if(error) {
        return console.log(error);
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if(error) {
            return console.log(error);
        }
        console.log('Data', forecastData);
    });
});
