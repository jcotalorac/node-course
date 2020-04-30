const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

geocode(process.argv[2], (error, data) => {
    if(error) {
        return console.log(error);
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if(error) {
            return console.log(error);
        }
        console.log(data.location);
        console.log('Data', forecastData);
    });
});
