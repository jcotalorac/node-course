const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=40,-75&units=m`;

http.request(url, (response) => {

    response.on('data', (chunk) => {
        
    });
});