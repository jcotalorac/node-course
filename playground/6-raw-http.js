const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=40,-75&units=m`;

const request = http.request(url, (response) => {

    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();        
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.end();