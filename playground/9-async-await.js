const doWork = async () => {
    return 'JC'
};

doWork()
.then((result) => {
    console.log('Result', result);
})
.catch((error) => {
    console.log('Error', error);
});
