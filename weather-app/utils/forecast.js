const request = require('request');


const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=${longitude},${latitude}&units=m`;

    request({ url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            const weatherDescription = response.body.current.weather_descriptions[0];
            callback(undefined, { temperature, feelslike, weatherDescription });
        }
    });
};

module.exports = forecast;