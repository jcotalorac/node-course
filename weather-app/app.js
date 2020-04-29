const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=37.8267,-122.4233&units=m';

request({ url: url, json: true }, (error, response) => {
    
    if(error) {
        console.log('Unable to connect to weather service!');
    } else if(response.body.error) {
        console.log('Unable to find location');
    } else {
        const temperature = response.body.current.temperature;
        const feelslike = response.body.current.feelslike;
        const weatherDescription = response.body.current.weather_descriptions[0];
        console.log(`${weatherDescription}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`);

    }
});

/*const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamNvdGFsb3JhYyIsImEiOiJjazlsbm8zbXEyN3l5M2ZvMTR4d2pxcGtuIn0.XqG60Bw_1muPAGX4YWwy5A';

request({ url: geoCodeUrl, json: true}, (error, response) => {
    const [latitude, longitude] = response.body.features[0].center;
    console.log(`Lat: ${latitude}, Long: ${longitude}`);
});*/