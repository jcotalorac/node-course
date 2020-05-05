const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (request, response) => {
    const user = new User(request.body);

    user.save()
    .then(() => {
        response.send(user);
    })
    .catch((error) => {
        response.status(400).send(error);
    });
    console.log(request.body);
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
