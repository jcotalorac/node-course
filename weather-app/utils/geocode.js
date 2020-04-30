const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamNvdGFsb3JhYyIsImEiOiJjazlsbm8zbXEyN3l5M2ZvMTR4d2pxcGtuIn0.XqG60Bw_1muPAGX4YWwy5A`;

    request({ url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to geo service', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find resulst for query', undefined);
        } else {
            const [latitude, longitude] = response.body.features[0].center;
            callback(undefined, { latitude, longitude });
        }
    });
};

module.exports = geocode;