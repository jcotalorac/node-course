const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const place = process.argv[2];

if(!place) {
    console.log('Please provide an address');
} else {
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
}
