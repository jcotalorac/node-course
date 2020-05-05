const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

app.post('/users', (request, response) => {
    response.send('testing!');
});