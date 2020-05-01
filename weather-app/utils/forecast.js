const request = require('request');


const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=${longitude},${latitude}&units=m`;

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const weatherDescription = body.current.weather_descriptions[0];
            callback(undefined, { temperature, feelslike, weatherDescription });
        }
    });
};

module.exports = forecast;