const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const place = process.argv[2];

if(!place) {
    console.log('Please provide an address');
} else {
    geocode(process.argv[2], (error, { latitude, longitude, location }) => {
        if(error) {
            return console.log(error);
        }
        forecast(latitude, longitude, (error, {temperature, feelslike, weatherDescription }) => {
            if(error) {
                return console.log(error);
            }
            console.log(location);
            console.log(`${weatherDescription}. Temperature is ${temperature} and it feels like ${feelslike}`);
        });
    });
}
