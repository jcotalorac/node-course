const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=37.8267,-122.4233&units=m';

request({ url: url, json: true }, (error, response) => {
    //console.log(response.body.current);
    const temperature = response.body.current.temperature;
    const feelslike = response.body.current.feelslike;
    const weatherDescription = response.body.current.weather_descriptions[0];
    console.log(`${weatherDescription}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`);
});