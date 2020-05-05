const geocodePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };
        //resolve(data);
        reject('Bad message');
    }, 2000);
});

geocodePromise.then((resultOK) => {
    console.log('okResult');
    console.log(resultOK);
}).catch((resultFail) => {
    console.log('error');
    console.log(resultFail);
});

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

add(1, 2)
.then((sum) => {
    console.log(sum);
    add(sum, 5)
    .then((sum2) => {
        console.log(sum2);
    })
    .catch((error) => {
        console.log(error);
    });
})
.catch((error) => {
    console.log(error);
});