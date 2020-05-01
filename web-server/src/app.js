const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello express');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});