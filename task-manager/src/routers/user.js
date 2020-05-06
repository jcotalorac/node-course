const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/users', async (request, response) => {
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

module.exports = router;