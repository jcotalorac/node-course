const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(1, 2);
    console.log(sum);
    const sum2 = await add(sum, 5);
    console.log(sum2);
    return sum2;
    //throw new Error('Something went wrong');
    //return 'JC'
};

doWork()
.then((result) => {
    console.log('Result', result);
})
.catch((error) => {
    console.log('Error', error);
});
