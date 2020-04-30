setTimeout(() => {
    console.log('Two seconds are up');
}, 2000);

const geocode = (address, callback) => {
    const data = {
        latitude: 0,
        longitude: 0
    };
    return data;
}

const data = geocode('Philadelphia');
console.log(data);