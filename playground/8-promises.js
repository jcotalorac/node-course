const geocodePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };
        resolve(data);
        //reject('Bad message');
    }, 2000);
});

geocodePromise.then((resultOK) => {
    console.log('okResult');
    console.log(resultOK);
}).catch((resultFail) => {
    console.log('error');
    console.log(resultFail);
});