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
    
    //throw new Error('Something went wrong');
    //return 'JC'
};

doWork();
/* .then((result) => {
    console.log('Result', result);
})
.catch((error) => {
    console.log('Error', error);
}); */
