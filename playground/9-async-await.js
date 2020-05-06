const doWork = async () => {
    throw new Error('Something went wrong');
    //return 'JC'
};

doWork()
.then((result) => {
    console.log('Result', result);
})
.catch((error) => {
    console.log('Error', error);
});
